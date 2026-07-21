'use client';

import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InvitationScene } from './scenes/InvitationScene';
import { EventEntranceScene } from './EventEntranceScene';

// Register ScrollTrigger globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface IntroExperienceProps {
  onComplete?: () => void;
}

export const IntroExperience: React.FC<IntroExperienceProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const [isTimelineReady, setIsTimelineReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // 1. Accessibility: Media query to check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', motionListener);

    // If reduced motion is preferred, immediately complete and exit
    if (mediaQuery.matches) {
      if (onComplete) onComplete();
      return () => {
        mediaQuery.removeEventListener('change', motionListener);
      };
    }

    // Progressive enhancement: Hide homepage content container and header at start
    const homepage = document.getElementById('homepage-content');
    if (homepage) {
      homepage.style.opacity = '0';
      homepage.style.visibility = 'hidden';
      homepage.style.transform = '';
    }

    const siteHeader = document.querySelector('header.fixed.top-0') as HTMLElement;
    if (siteHeader) {
      siteHeader.style.opacity = '0';
      siteHeader.style.visibility = 'hidden';
      siteHeader.style.pointerEvents = 'none';
    }

    // 2. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // Maintain responsive native touch on mobile devices
      wheelMultiplier: 0.85,
      touchMultiplier: 1.1,
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    // Connect Lenis to ScrollTrigger updates
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis RAF loop with the GSAP ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    setIsTimelineReady(true);

    // 3. Setup GSAP master timeline using matchMedia for responsive profiles
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const setupTimeline = (scrollPercent: number, scrubVal: number, isMobile: boolean, isTablet: boolean) => {
        // Initial setup for states to prevent flashes
        gsap.set('.js-entrance-root', { autoAlpha: 0 });
        gsap.set('#homepage-content', { y: '100vh', autoAlpha: 0 });
        gsap.set('header.fixed.top-0', { opacity: 0, autoAlpha: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: pinRef.current,
            start: 'top top',
            end: `+=${scrollPercent}%`,
            scrub: scrubVal,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Trigger onComplete callback when reaching the end of the intro
              if (self.progress >= 0.99) {
                if (onComplete) onComplete();
                // Clear inline styles once scrolling has finalized past intro
                gsap.set('#homepage-content', { clearProps: 'all' });
                gsap.set('#homepage-content section div.absolute.inset-0.z-0', { clearProps: 'all' });
                gsap.set('#homepage-content section .relative.z-20', { clearProps: 'all' });
                gsap.set('header.fixed.top-0', { clearProps: 'all' });
              }
            },
          },
        });

        tl.defaults({ ease: 'none' });

        // ==========================================
        // SCENE 1 & 2: Invitation Establishes & Ribbon Unties (0% to 38%)
        // ==========================================
        tl.fromTo('.js-intro-container', 
          { scale: 0.96 }, 
          { scale: 1.0, duration: 18 }, 
          0
        );

        // Ribbon knot loosening
        tl.to('.js-intro-ribbon-knot', {
          scale: 1.18,
          rotation: 15,
          z: isMobile ? 0 : 8,
          duration: 12,
        }, 18);

        // Loops shrink & tails slide off
        tl.to('.js-intro-ribbon-knot', {
          rotation: 23,
          z: isMobile ? 0 : 13,
          duration: 8,
        }, 30);

        tl.to('.js-intro-ribbon-loop-left', {
          scale: 0,
          rotation: -70,
          duration: 8,
        }, 30);
        tl.to('.js-intro-ribbon-loop-right', {
          scale: 0,
          rotation: 70,
          duration: 8,
        }, 30);

        tl.to('.js-intro-ribbon-tail-left', {
          rotation: 87,
          x: -45,
          y: 25,
          duration: 8,
        }, 30);
        tl.to('.js-intro-ribbon-tail-right', {
          rotation: -87,
          x: 45,
          y: 25,
          duration: 8,
        }, 30);

        // Ribbon wrapper container slides off screen
        tl.to('.js-intro-ribbon-container', {
          x: 480,
          opacity: 0,
          autoAlpha: 0,
          duration: 5,
        }, 33);

        // ==========================================
        // SCENE 3: Invitation Opens (38% to 58%)
        // ==========================================
        // Cover flap folds open
        tl.to('.js-intro-cover', {
          rotationY: -150,
          duration: 8,
        }, 38);

        // Card shifts up on Z axis
        tl.to('.js-intro-interior-card', {
          z: isMobile ? 0 : 30,
          opacity: 1,
          duration: 8,
        }, 38);

        // Portal fades in
        tl.fromTo('.js-intro-portal', {
          opacity: 0,
          autoAlpha: 0,
          scale: 0.88,
        }, {
          opacity: 1,
          autoAlpha: 1,
          scale: 1.0,
          duration: 3,
        }, 48);

        tl.to('.js-intro-portal-glow', {
          opacity: 1,
          duration: 3,
        }, 48);

        // Depth rings animate
        tl.to('.js-intro-portal-ring1', {
          z: isMobile ? 0 : 50,
          y: isMobile ? -10 : 0,
          duration: 7,
        }, 51);
        tl.to('.js-intro-portal-ring2', {
          z: isMobile ? 0 : -50,
          y: isMobile ? -20 : 0,
          duration: 7,
        }, 51);

        // Doorway scale zooms past viewport
        tl.to('.js-intro-interior-card', {
          scale: isMobile ? 2.5 : 4.5,
          z: isMobile ? 0 : 180,
          y: isMobile ? -50 : 0,
          duration: 10,
        }, 48);

        tl.to('.js-intro-base', {
          scale: isMobile ? 2.5 : 5.0,
          x: isMobile ? -80 : -150,
          opacity: 0,
          autoAlpha: 0,
          duration: 10,
        }, 48);

        tl.to('.js-intro-cover', {
          scale: isMobile ? 2.5 : 5.0,
          x: isMobile ? -160 : -300,
          opacity: 0,
          autoAlpha: 0,
          duration: 10,
        }, 48);

        // Screen is masked by the portal placeholder
        tl.to('.js-intro-portal-placeholder', {
          opacity: 1,
          autoAlpha: 1,
          duration: 2,
        }, 56);

        // ==========================================
        // SCENE 4: Event Venue Reveals & Zooms (58% to 82%)
        // ==========================================
        tl.to('.js-entrance-root', {
          autoAlpha: 1,
          duration: 0.1,
        }, 58);

        tl.fromTo('.js-entrance-content-wrapper', {
          opacity: 0,
          filter: (isMobile || isTablet) ? 'none' : 'brightness(0.25)',
        }, {
          opacity: 1,
          filter: 'brightness(1)',
          duration: 3,
        }, 58);

        // Crossfade: invitation dims out
        tl.to('.js-intro-container', {
          opacity: 0,
          autoAlpha: 0,
          duration: 4,
        }, 58);

        // Zoom Camera Parallax
        const amp = isMobile ? 0.5 : (isTablet ? 0.75 : 1.0);

        tl.to('.js-entrance-fg-left', {
          z: isMobile ? 0 : 400 * amp,
          x: -150 * amp,
          y: isMobile ? 50 : 0,
          scale: 3.2,
          opacity: 0,
          duration: 24,
        }, 58);

        tl.to('.js-entrance-fg-right', {
          z: isMobile ? 0 : 400 * amp,
          x: 150 * amp,
          y: isMobile ? 50 : 0,
          scale: 3.2,
          opacity: 0,
          duration: 24,
        }, 58);

        tl.to('.js-entrance-arch-frame', {
          z: isMobile ? 0 : 250 * amp,
          y: isMobile ? 40 : 0,
          scale: 2.5,
          duration: 24,
        }, 58);
        tl.to('.js-entrance-arch-frame', {
          opacity: 0,
          duration: 5,
        }, 77);

        tl.to('.js-entrance-ceiling', {
          y: -120 * amp,
          scale: 1.5,
          duration: 24,
        }, 58);

        tl.to('.js-entrance-ch-central', {
          z: isMobile ? 0 : 150 * amp,
          scale: 2.2,
          y: -60 * amp,
          duration: 24,
        }, 58);
        tl.to('.js-entrance-ch-central', {
          opacity: 0,
          duration: 6,
        }, 76);

        tl.to('.js-entrance-ch-left', {
          z: isMobile ? 0 : 50 * amp,
          scale: 2.0,
          x: -120 * amp,
          y: -40 * amp,
          duration: 24,
        }, 58);
        tl.to('.js-entrance-ch-left', {
          opacity: 0,
          duration: 8,
        }, 74);

        tl.to('.js-entrance-ch-right', {
          z: isMobile ? 0 : 50 * amp,
          scale: 2.0,
          x: 120 * amp,
          y: -40 * amp,
          duration: 24,
        }, 58);
        tl.to('.js-entrance-ch-right', {
          opacity: 0,
          duration: 8,
        }, 74);

        tl.to('.js-entrance-aisle-runner', {
          scaleX: 2.5,
          scaleY: 1.8,
          y: 100 * amp,
          z: isMobile ? 0 : 150 * amp,
          duration: 24,
        }, 58);
        tl.to('.js-entrance-aisle-glow', {
          scaleX: 2.5,
          scaleY: 1.8,
          y: 100 * amp,
          z: isMobile ? 0 : 150 * amp,
          duration: 24,
        }, 58);

        tl.to('.js-entrance-ped-left', {
          x: -120 * amp,
          z: isMobile ? 0 : 120 * amp,
          scale: 2.0,
          duration: 24,
        }, 58);
        tl.to('.js-entrance-ped-left', {
          opacity: 0,
          duration: 7,
        }, 75);

        tl.to('.js-entrance-ped-right', {
          x: 120 * amp,
          z: isMobile ? 0 : 120 * amp,
          scale: 2.0,
          duration: 24,
        }, 58);
        tl.to('.js-entrance-ped-right', {
          opacity: 0,
          duration: 7,
        }, 75);

        tl.to('.js-entrance-bg-stage', {
          scale: 1.4,
          z: isMobile ? 0 : -200 * amp,
          duration: 24,
        }, 58);
        tl.to('.js-entrance-stage-light', {
          opacity: 0.35,
          duration: 24,
        }, 58);

        tl.to('.js-entrance-backdrop', {
          scale: 1.15,
          duration: 24,
        }, 58);

        if (!isMobile && !isTablet) {
          tl.to('.js-entrance-ambient-fog', {
            opacity: 0.08,
            duration: 24,
          }, 58);
        }

        // ==========================================
        // SCENE 5: Camera Enters & Homepage Reveals (82% to 100%)
        // ==========================================
        tl.to('.js-entrance-bg-stage', {
          scale: 2.5,
          duration: 10,
        }, 82);
        tl.to('.js-entrance-stage-light', {
          opacity: 0.95,
          duration: 10,
        }, 82);
        tl.to('.js-entrance-backdrop', {
          scale: 1.5,
          duration: 10,
        }, 82);

        if (!isMobile && !isTablet) {
          tl.to('.js-entrance-ambient-fog', {
            opacity: 0.45,
            duration: 10,
          }, 82);
        }

        // Ambient peak whiteout
        if (!isMobile && !isTablet) {
          tl.to('.js-entrance-ambient-fog', {
            opacity: 1.0,
            duration: 4,
          }, 92);
        }
        tl.to('.js-entrance-bg-stage', {
          scale: 5.0,
          z: 0,
          duration: 4,
        }, 92);

        // Layers fly past screen
        tl.to('.js-entrance-fg-left', { scale: 5.5, z: isMobile ? 0 : 600 * amp, x: -400 * amp, opacity: 0, duration: 4 }, 92);
        tl.to('.js-entrance-fg-right', { scale: 5.5, z: isMobile ? 0 : 600 * amp, x: 400 * amp, opacity: 0, duration: 4 }, 92);
        tl.to('.js-entrance-arch-frame', { scale: 6.0, z: isMobile ? 0 : 600 * amp, opacity: 0, duration: 4 }, 92);
        tl.to('.js-entrance-ceiling', { y: -300 * amp, scale: 2.5, duration: 4 }, 92);
        tl.to('.js-entrance-ch-central', { scale: 6.0, z: isMobile ? 0 : 300 * amp, y: -300 * amp, opacity: 0, duration: 4 }, 92);
        tl.to('.js-entrance-ch-left', { scale: 5.0, z: isMobile ? 0 : 200 * amp, x: -320 * amp, y: -200 * amp, opacity: 0, duration: 4 }, 92);
        tl.to('.js-entrance-ch-right', { scale: 5.0, z: isMobile ? 0 : 200 * amp, x: 320 * amp, y: -200 * amp, opacity: 0, duration: 4 }, 92);
        tl.to('.js-entrance-aisle-runner', { scaleX: 5.0, scaleY: 3.0, y: 250 * amp, z: isMobile ? 0 : 350 * amp, opacity: 0, duration: 4 }, 92);
        tl.to('.js-entrance-aisle-glow', { scaleX: 5.0, scaleY: 3.0, y: 250 * amp, z: isMobile ? 0 : 350 * amp, opacity: 0, duration: 4 }, 92);
        tl.to('.js-entrance-ped-left', { scale: 5.0, z: isMobile ? 0 : 400 * amp, x: -320 * amp, opacity: 0, duration: 4 }, 92);
        tl.to('.js-entrance-ped-right', { scale: 5.0, z: isMobile ? 0 : 400 * amp, x: 320 * amp, opacity: 0, duration: 4 }, 92);

        // Stage dissolves
        tl.to('.js-entrance-bg-stage', { opacity: 0, autoAlpha: 0, duration: 2 }, 96);
        tl.to('.js-entrance-backdrop', { opacity: 0, autoAlpha: 0, duration: 2 }, 96);

        if (!isMobile && !isTablet) {
          tl.to('.js-entrance-ambient-fog', { opacity: 0, autoAlpha: 0, duration: 2 }, 96);
        }

        // Entrance fades out completely
        tl.to('.js-entrance-content-wrapper', { opacity: 0, autoAlpha: 0, duration: 4 }, 96);

        // Homepage emerges and translates up
        tl.fromTo('#homepage-content', {
          y: '100vh',
          autoAlpha: 0,
        }, {
          y: 0,
          autoAlpha: 1,
          duration: 18,
        }, 82);

        // Homepage Hero emerges inside homepage
        tl.fromTo('#homepage-content section div.absolute.inset-0.z-0', {
          opacity: 0,
          scale: 1.03,
          filter: (isMobile || isTablet) ? 'none' : 'blur(10px)',
        }, {
          opacity: 1,
          scale: 1,
          filter: 'none',
          duration: 10,
        }, 82);

        tl.fromTo('#homepage-content section .relative.z-20', {
          opacity: 0,
          y: 25,
        }, {
          opacity: 1,
          y: 0,
          duration: 10,
        }, 85);

        // Navbar fades in at the end
        tl.fromTo('header.fixed.top-0', {
          opacity: 0,
          autoAlpha: 0,
        }, {
          opacity: 1,
          autoAlpha: 1,
          duration: 4,
        }, 96);

        // Intro container dims out
        tl.to('#intro-experience-container', {
          opacity: 0,
          autoAlpha: 0,
          duration: 4,
        }, 96);
      };

      // Desktop layout: 500% scroll path, scrub 1.15
      mm.add('(min-width: 1025px)', () => {
        setupTimeline(500, 1.15, false, false);
      });

      // Tablet layout: 400% scroll path, scrub 0.85
      mm.add('(min-width: 768px) and (max-width: 1024px)', () => {
        setupTimeline(400, 0.85, false, true);
      });

      // Mobile layout: 300% scroll path, scrub 0.55
      mm.add('(max-width: 767px)', () => {
        setupTimeline(300, 0.55, true, false);
      });
    });

    return () => {
      // Clean up Lenis and ticker on unmount
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      gsap.ticker.remove(updateTicker);
      delete (window as any).lenis;

      // Clean up GSAP context and ScrollTrigger instances
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Restore inline styles on cleanup
      const finalHomepage = document.getElementById('homepage-content');
      if (finalHomepage) {
        finalHomepage.style.opacity = '';
        finalHomepage.style.visibility = '';
        finalHomepage.style.transform = '';
      }

      const headerCleanup = document.querySelector('header.fixed.top-0') as HTMLElement;
      if (headerCleanup) {
        headerCleanup.style.opacity = '';
        headerCleanup.style.visibility = '';
        headerCleanup.style.pointerEvents = '';
      }
    };
  }, [onComplete]);

  // Accessibility Skip function (Scrolls the user past the 500% pin container)
  const skipIntro = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      
      // Determine the target scroll height based on breakpoint
      let scrollMultiplier = 5.05;
      if (window.innerWidth <= 767) {
        scrollMultiplier = 3.05;
      } else if (window.innerWidth <= 1024) {
        scrollMultiplier = 4.05;
      }

      const targetScroll = absoluteTop + window.innerHeight * scrollMultiplier;

      // Force immediate ScrollTrigger completion through instant scroll position update
      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetScroll, {
          immediate: true,
          force: true,
        });
      } else {
        window.scrollTo({
          top: targetScroll,
          behavior: 'auto',
        });
      }

      // Restore homepage styles for static page flow
      gsap.set('#homepage-content', { clearProps: 'all' });
      gsap.set('#homepage-content section div.absolute.inset-0.z-0', { clearProps: 'all' });
      gsap.set('#homepage-content section .relative.z-20', { clearProps: 'all' });
      gsap.set('header.fixed.top-0', { clearProps: 'all' });

      // Notify parent on completion
      if (onComplete) {
        onComplete();
      }
    }
  };

  // If user prefers reduced motion, do not render the scroll wrapper
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id="intro-experience-container"
      className="relative w-full bg-gradient-to-b from-[#FAF8F5] to-[#F3EFEA] overflow-x-hidden"
      role="region"
      aria-label="Cinematic Introduction Experience"
    >
      {/* Keyboard Accessible Skip Button */}
      <button
        onClick={skipIntro}
        className="absolute top-6 left-6 z-50 px-5 py-2.5 bg-[var(--background)] text-[var(--foreground)] font-sans font-medium text-xs tracking-widest uppercase rounded border border-[var(--primary)] opacity-0 focus:opacity-100 transition-opacity duration-300 pointer-events-none focus:pointer-events-auto shadow-lg"
        aria-label="Skip cinematic introduction experience"
      >
        Skip Experience
      </button>

      {/* Main Pinned Viewport Wrapper */}
      <div
        ref={pinRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* Subtle radial ambient vignette */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(250,248,245,0)_45%,rgba(243,239,234,0.7)_100%] pointer-events-none z-10" />

        {/* Sunlit luxury bokeh and soft environmental backdrop rays */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-[15%] -left-[15%] w-[70%] h-[70%] rounded-full bg-radial-[circle_at_center,rgba(197,168,128,0.12)_0%,transparent_60%] blur-3xl" />
          <div className="absolute -bottom-[20%] -right-[15%] w-[70%] h-[70%] rounded-full bg-radial-[circle_at_center,rgba(234,219,200,0.16)_0%,transparent_60%] blur-3xl" />
          <div className="absolute top-[35%] left-[25%] w-[45%] h-[45%] rounded-full bg-radial-[circle_at_center,rgba(250,248,245,0.45)_0%,transparent_70%] blur-3xl" />
        </div>

        {/* TOP PANEL: Skip Indicator */}
        <header className="w-full px-8 py-8 sm:px-16 flex justify-end items-center z-20">
          <button
            onClick={skipIntro}
            className="text-[var(--foreground)]/60 hover:text-[var(--primary)] font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] px-2 py-1 cursor-pointer"
          >
            Skip
          </button>
        </header>

        {/* MIDDLE PANEL: Active Scene Render Spot */}
        <main className="flex-1 w-full relative flex items-center justify-center">
          {isTimelineReady && (
            <>
              {/* Keep both scenes mounted continuously to avoid React layout recalculations during scroll */}
              <InvitationScene timeline={null} />
              <EventEntranceScene timeline={null} />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

IntroExperience.displayName = 'IntroExperience';
