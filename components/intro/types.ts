/**
 * Configuration for a single storytelling scene.
 */
export interface SceneConfig {
  /** Unique identifier for the scene */
  id: string;
  /** Human-readable display name */
  name: string;
  /** Normalized start progress (0.0 to 1.0) */
  startProgress: number;
  /** Normalized end progress (0.0 to 1.0) */
  endProgress: number;
  /**
   * Future animation callback allowing GSAP/R3F elements to hook into 
   * scroll updates. Receives the scene's local progress (0.0 to 1.0) and scroll direction.
   */
  animationCallback?: (localProgress: number, direction: number) => void;
}

/**
 * The runtime state of a scene, including computed visibility and progress.
 */
export interface SceneState extends SceneConfig {
  /** Scene progress normalized to 0.0 - 1.0 relative to its own duration bounds */
  localProgress: number;
  /** Whether the scene is currently active based on master progress */
  isActive: boolean;
  /** Visibility flag to optimize rendering and prevent background computations */
  visibility: boolean;
}

/**
 * Current state of the master GSAP scroll timeline.
 */
export interface TimelineState {
  /** Master scroll progress (0.0 to 1.0) */
  progress: number;
  /** Currently active scene configuration and state */
  activeScene: SceneState | null;
  /** Index of the active scene in the scene list */
  activeSceneIndex: number;
  /** Scroll direction (1 = forward/down, -1 = backward/up) */
  direction: number;
  /** Whether ScrollTrigger is currently pinning the layout */
  isPinned: boolean;
}

/**
 * Callback function type for subscribing to timeline updates.
 */
export type TimelineCallback = (state: TimelineState) => void;
