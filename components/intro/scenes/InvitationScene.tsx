import React, { useEffect, useRef } from 'react';
import { BrandLogo } from '../../shared/brand-logo';
import styles from './InvitationScene.module.css';
import { IntroTimeline } from '../Timeline';
import { Ribbon } from '../Ribbon';
import { PortalTransition } from '../PortalTransition';

interface InvitationSceneProps {
  timeline: IntroTimeline | null;
}

export const InvitationScene: React.FC<InvitationSceneProps> = ({ timeline }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Ribbon Refs
  const ribbonContainerRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const knotRef = useRef<HTMLDivElement>(null);
  const leftLoopRef = useRef<HTMLDivElement>(null);
  const rightLoopRef = useRef<HTMLDivElement>(null);
  const leftTailRef = useRef<HTMLDivElement>(null);
  const rightTailRef = useRef<HTMLDivElement>(null);

  // Portal Refs
  const portalRef = useRef<HTMLDivElement>(null);
  const portalSurfaceRef = useRef<HTMLDivElement>(null);
  const portalGlowRef = useRef<HTMLDivElement>(null);
  const portalVignetteRef = useRef<HTMLDivElement>(null);
  const portalDepthLayerRef = useRef<HTMLDivElement>(null);
  const portalPlaceholderRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);

  // Easing helpers
  const easeQuadOut = (t: number) => t * (2 - t);
  const easeCubicInOut = (t: number) => 
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  return (
    <article
      ref={containerRef}
      className={`${styles.container} js-intro-container`}
      aria-label="AS Events luxury invitation folder opening sequence with ribbon and portal transition"
    >
      <div className={styles.cardWrapper}>
        {/* Envelope Base */}
        <section className={`${styles.base} js-intro-base`} aria-hidden="true" />

        {/* Interior Card (slides forward) */}
        <section ref={cardRef} className={`${styles.interiorCard} js-intro-interior-card`}>
          <h1 className={styles.title}>You’re Invited</h1>
          <p className={styles.tagline}>Every unforgettable celebration begins with an invitation.</p>

          {/* Cinematic Portal Transition */}
          <PortalTransition
            portalRef={portalRef}
            surfaceRef={portalSurfaceRef}
            glowRef={portalGlowRef}
            vignetteRef={portalVignetteRef}
            depthLayerRef={portalDepthLayerRef}
            placeholderRef={portalPlaceholderRef}
            ring1Ref={ring1Ref}
            ring2Ref={ring2Ref}
          />
        </section>

        {/* Outer Cover Flap (hinges left) */}
        <div ref={coverRef} className={`${styles.cover} js-intro-cover`}>
          {/* Front of Flap (wax seal monogram) */}
          <div className={styles.coverFront}>
            <div className={styles.seal} aria-hidden="true">
              <div className={styles.sealBorder} />
              <BrandLogo
                variant="monogram"
                className="h-10 w-10 object-contain sm:h-12 sm:w-12 z-10 opacity-90 brightness-[1.05] contrast-[1.05]"
              />
            </div>
          </div>
          
          {/* Back of Flap (watermark logo) */}
          <div className={styles.coverBack} aria-hidden="true">
            <div className={styles.watermarkContainer}>
              <span className={styles.watermarkText}>AS Events</span>
            </div>
          </div>
        </div>

        {/* Satin Gold Ribbon wrapped around the invitation */}
        <Ribbon
          containerRef={ribbonContainerRef}
          bandRef={bandRef}
          knotRef={knotRef}
          leftLoopRef={leftLoopRef}
          rightLoopRef={rightLoopRef}
          leftTailRef={leftTailRef}
          rightTailRef={rightTailRef}
        />
      </div>
    </article>
  );
};

InvitationScene.displayName = 'InvitationScene';
