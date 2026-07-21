import React from 'react';
import styles from './PortalTransition.module.css';

interface PortalTransitionProps {
  portalRef: React.RefObject<HTMLDivElement | null>;
  surfaceRef: React.RefObject<HTMLDivElement | null>;
  glowRef: React.RefObject<HTMLDivElement | null>;
  vignetteRef: React.RefObject<HTMLDivElement | null>;
  depthLayerRef: React.RefObject<HTMLDivElement | null>;
  placeholderRef: React.RefObject<HTMLDivElement | null>;
  ring1Ref: React.RefObject<HTMLDivElement | null>;
  ring2Ref: React.RefObject<HTMLDivElement | null>;
}

export const PortalTransition: React.FC<PortalTransitionProps> = ({
  portalRef,
  surfaceRef,
  glowRef,
  vignetteRef,
  depthLayerRef,
  placeholderRef,
  ring1Ref,
  ring2Ref,
}) => {
  return (
    <div
      ref={portalRef}
      className={`${styles.portalRoot} js-intro-portal`}
      aria-hidden="true"
    >
      {/* 3D portal surface with background gradient */}
      <div ref={surfaceRef} className={`${styles.portalSurface} js-intro-portal-surface`}>
        {/* Soft border vignette */}
        <div ref={vignetteRef} className={`${styles.portalVignette} js-intro-portal-vignette`} />

        {/* Ambient warm gold/burgundy glow */}
        <div ref={glowRef} className={`${styles.portalInnerGlow} js-intro-portal-glow`} />

        {/* Layered concentric rings to create depth tunnel */}
        <div ref={depthLayerRef} className={`${styles.portalDepthLayer} js-intro-portal-depth-layer`}>
          <div ref={ring1Ref} className={`${styles.depthRing1} js-intro-portal-ring1`} />
          <div ref={ring2Ref} className={`${styles.depthRing2} js-intro-portal-ring2`} />
        </div>
      </div>

      {/* Solid black transition mask that overlays the portal zoom at 0.97 - 1.00 */}
      <div ref={placeholderRef} className={`${styles.nextScenePlaceholder} js-intro-portal-placeholder`} />
    </div>
  );
};

PortalTransition.displayName = 'PortalTransition';
