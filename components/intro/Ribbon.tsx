import React from 'react';
import styles from './Ribbon.module.css';

interface RibbonProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  bandRef: React.RefObject<HTMLDivElement | null>;
  knotRef: React.RefObject<HTMLDivElement | null>;
  leftLoopRef: React.RefObject<HTMLDivElement | null>;
  rightLoopRef: React.RefObject<HTMLDivElement | null>;
  leftTailRef: React.RefObject<HTMLDivElement | null>;
  rightTailRef: React.RefObject<HTMLDivElement | null>;
}

export const Ribbon: React.FC<RibbonProps> = ({
  containerRef,
  bandRef,
  knotRef,
  leftLoopRef,
  rightLoopRef,
  leftTailRef,
  rightTailRef,
}) => {
  return (
    <div
      ref={containerRef}
      className={`${styles.container} js-intro-ribbon-container`}
      aria-hidden="true"
    >
      {/* Horizontal Ribbon Wrapping Band */}
      <div ref={bandRef} className={`${styles.band} js-intro-ribbon-band`} />

      {/* Ribbon Left Loop */}
      <div ref={leftLoopRef} className={`${styles.loopLeft} js-intro-ribbon-loop-left`} />

      {/* Ribbon Right Loop */}
      <div ref={rightLoopRef} className={`${styles.loopRight} js-intro-ribbon-loop-right`} />

      {/* Ribbon Left Tail */}
      <div ref={leftTailRef} className={`${styles.tailLeft} js-intro-ribbon-tail-left`} />

      {/* Ribbon Right Tail */}
      <div ref={rightTailRef} className={`${styles.tailRight} js-intro-ribbon-tail-right`} />

      {/* Ribbon Center Knot */}
      <div ref={knotRef} className={`${styles.knot} js-intro-ribbon-knot`} />
    </div>
  );
};

Ribbon.displayName = 'Ribbon';
