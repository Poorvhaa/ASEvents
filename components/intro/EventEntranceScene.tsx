import React, { useEffect, useRef } from 'react';
import styles from './EventEntranceScene.module.css';
import { IntroTimeline } from './Timeline';

interface EventEntranceSceneProps {
  timeline: IntroTimeline | null;
}

export const EventEntranceScene: React.FC<EventEntranceSceneProps> = ({ timeline }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  
  // Modular Refs preserved for Cinematic Camera Parallax Zooms and Reveals
  const backdropRef = useRef<HTMLDivElement>(null);
  const backgroundStageRef = useRef<HTMLDivElement>(null);
  const ceilingRef = useRef<HTMLDivElement>(null);
  const chandeliersRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const aisleRef = useRef<HTMLDivElement>(null);
  const sideDecorRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);

  // Easing function for smooth scroll movement
  const easeQuadOut = (t: number) => t * (2 - t);
  const easeCubicInOut = (t: number) => 
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  return (
    <article
      ref={containerRef}
      className={`${styles.eventEntranceRoot} js-entrance-root`}
      aria-label="Luxury event grand entrance venue"
    >
      {/* Content wrapper to allow seamless black-to-content fade */}
      <div ref={contentWrapperRef} className={`${styles.entranceContent} js-entrance-content-wrapper`}>
        {/* Background radial glow */}
        <div ref={backdropRef} className={`${styles.entranceBackdrop} js-entrance-backdrop`} aria-hidden="true" />
        <div className={`${styles.ambientFog} js-entrance-ambient-fog`} aria-hidden="true" />

        {/* Background Stage / Distant Focal Point */}
        <div ref={backgroundStageRef} className={`${styles.backgroundStage} js-entrance-bg-stage`}>
          <div className={`${styles.stageLight} js-entrance-stage-light`} />
        </div>

        {/* Ceiling Drapery */}
        <div ref={ceilingRef} className={`${styles.ceilingLayer} js-entrance-ceiling`} aria-hidden="true" />

        {/* Upper Chandeliers */}
        <div ref={chandeliersRef} className={`${styles.chandelierGroup} js-entrance-chandelier-group`}>
          {/* Central Chandelier */}
          <div className={`${styles.chandelierCentral} js-entrance-ch-central`}>
            <div className={styles.stem} />
            <div className={styles.bodyCentral}>
              <div className={styles.glow} />
              <div className={styles.crystals}>
                <div className={styles.crystalDrop} />
                <div className={styles.crystalDrop} />
                <div className={styles.crystalDrop} style={{ height: '12px' }} />
                <div className={styles.crystalDrop} />
                <div className={styles.crystalDrop} />
              </div>
            </div>
          </div>

          {/* Left Chandelier */}
          <div className={`${styles.chandelierLeft} js-entrance-ch-left`}>
            <div className={styles.stem} style={{ height: '40px' }} />
            <div className={styles.bodySide}>
              <div className={styles.glow} style={{ width: '40px', height: '40px' }} />
              <div className={styles.crystals}>
                <div className={styles.crystalDrop} />
                <div className={styles.crystalDrop} style={{ height: '10px' }} />
                <div className={styles.crystalDrop} />
              </div>
            </div>
          </div>

          {/* Right Chandelier */}
          <div className={`${styles.chandelierRight} js-entrance-ch-right`}>
            <div className={styles.stem} style={{ height: '40px' }} />
            <div className={styles.bodySide}>
              <div className={styles.glow} style={{ width: '40px', height: '40px' }} />
              <div className={styles.crystals}>
                <div className={styles.crystalDrop} />
                <div className={styles.crystalDrop} style={{ height: '10px' }} />
                <div className={styles.crystalDrop} />
              </div>
            </div>
          </div>
        </div>

        {/* Symmetrical Floral Arch */}
        <div ref={archRef} className={`${styles.floralArch} js-entrance-floral-arch`}>
          <div className={`${styles.archFrame} js-entrance-arch-frame`}>
            {/* Top Arch Floral Cluster */}
            <div className={`${styles.flowerCluster} ${styles.clusterTop}`}>
              <div className={styles.leafGreen} style={{ left: '10%', top: '20%' }} />
              <div className={styles.roseIvory} style={{ left: '20%', top: '10%' }} />
              <div className={styles.roseBurgundy} style={{ left: '35%', top: '15%' }} />
              <div className={styles.roseIvory} style={{ left: '50%', top: '8%' }} />
              <div className={styles.roseBurgundy} style={{ left: '65%', top: '15%' }} />
              <div className={styles.roseIvory} style={{ left: '80%', top: '12%' }} />
              <div className={styles.leafGreen} style={{ left: '90%', top: '20%', transform: 'rotate(-45deg)' }} />
            </div>

            {/* Left Arch Column Floral Cluster */}
            <div className={`${styles.flowerCluster} ${styles.clusterLeft}`}>
              <div className={styles.roseIvory} style={{ top: '10%', left: '15%' }} />
              <div className={styles.leafGreen} style={{ top: '22%', left: '40%' }} />
              <div className={styles.roseBurgundy} style={{ top: '35%', left: '10%' }} />
              <div className={styles.roseIvory} style={{ top: '55%', left: '25%' }} />
              <div className={styles.leafGreen} style={{ top: '70%', left: '15%' }} />
              <div className={styles.roseBurgundy} style={{ top: '82%', left: '20%' }} />
            </div>

            {/* Right Arch Column Floral Cluster */}
            <div className={`${styles.flowerCluster} ${styles.clusterRight}`}>
              <div className={styles.roseIvory} style={{ top: '10%', right: '15%' }} />
              <div className={styles.leafGreen} style={{ top: '22%', right: '40%' }} />
              <div className={styles.roseBurgundy} style={{ top: '35%', right: '10%' }} />
              <div className={styles.roseIvory} style={{ top: '55%', right: '25%' }} />
              <div className={styles.leafGreen} style={{ top: '70%', right: '15%' }} />
              <div className={styles.roseBurgundy} style={{ top: '82%', right: '20%' }} />
            </div>
          </div>
        </div>

        {/* Central Aisle */}
        <div ref={aisleRef} className={`${styles.aisle} js-entrance-aisle`}>
          <div className={`${styles.aisleRunner} js-entrance-aisle-runner`} />
          <div className={`${styles.aisleGlow} js-entrance-aisle-glow`} />
        </div>

        {/* Side Pedestals & Draperies */}
        <div ref={sideDecorRef} className={`${styles.sideDecor} js-entrance-side-decor`}>
          <div className={`${styles.pedestalLeft} js-entrance-ped-left`}>
            <div className={styles.candleGlow} />
          </div>
          <div className={`${styles.pedestalRight} js-entrance-ped-right`}>
            <div className={styles.candleGlow} />
          </div>
        </div>

        {/* Blurred Foreground corner floral silhouettes */}
        <div ref={foregroundRef} className={`${styles.foregroundFlorals} js-entrance-foreground`}>
          <div className={`${styles.fgLeft} js-entrance-fg-left`} />
          <div className={`${styles.fgRight} js-entrance-fg-right`} />
        </div>
      </div>
    </article>
  );
};

EventEntranceScene.displayName = 'EventEntranceScene';
