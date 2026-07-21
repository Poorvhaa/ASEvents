import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SceneConfig, TimelineState, TimelineCallback } from './types';
import { SceneManager } from './SceneManager';

// Register ScrollTrigger globally if in a browser context
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Manages a master GSAP scroll timeline integrated with ScrollTrigger pinning.
 * Exposes subscriber methods to handle frame updates with high performance.
 */
export class IntroTimeline {
  private timeline: gsap.core.Timeline | null = null;
  private scrollTriggerInstance: ScrollTrigger | null = null;
  private sceneManager: SceneManager;
  private subscribers: Set<TimelineCallback> = new Set();
  private state: TimelineState;
  private triggerElement: HTMLElement;
  private pinElement: HTMLElement;

  /**
   * Creates an IntroTimeline instance.
   * 
   * @param triggerElement The scroll wrapper element.
   * @param pinElement The element to pin during scroll (usually the viewport container).
   * @param scenes Configuration for the storytelling scenes.
   * @param scrollDurationPercent Scroll distance in terms of viewport height percentage (e.g. 500 = 500vh).
   */
  constructor(
    triggerElement: HTMLElement,
    pinElement: HTMLElement,
    scenes: SceneConfig[],
    scrollDurationPercent: number = 500
  ) {
    this.triggerElement = triggerElement;
    this.pinElement = pinElement;
    this.sceneManager = new SceneManager(scenes);

    // Initialize state
    const initialStatus = this.sceneManager.getSceneState(0);
    this.state = {
      progress: 0.0,
      activeScene: initialStatus.activeScene,
      activeSceneIndex: initialStatus.activeSceneIndex,
      direction: 1,
      isPinned: false,
    };

    this.initGSAP(scrollDurationPercent);
  }

  /**
   * Initializes the GSAP Timeline and configures ScrollTrigger.
   */
  private initGSAP(scrollDurationPercent: number) {
    // 1. Create a master timeline with standard duration 100
    this.timeline = gsap.timeline({
      paused: true,
    });

    // 2. Add labels for all scenes to make it pluggable for future developer work
    const scenes = this.sceneManager.getScenes();
    scenes.forEach((scene) => {
      const startTime = scene.startProgress * 100;
      this.timeline?.addLabel(scene.id, startTime);
    });

    // 3. Add a dummy master tween to ensure the timeline has a duration of 100.
    // This allows ScrollTrigger to map the playhead correctly from 0s to 100s.
    this.timeline.to({}, {
      duration: 100,
      ease: 'none',
    });

    // 4. Create the ScrollTrigger instance that controls the timeline playhead
    this.scrollTriggerInstance = ScrollTrigger.create({
      trigger: this.triggerElement,
      pin: this.pinElement,
      start: 'top top',
      end: `+=${scrollDurationPercent}%`,
      scrub: 0.1, // Smooth scrub to prevent stuttering
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const direction = self.direction; // 1 = forward, -1 = backward
        
        // Calculate the scene state
        const { activeScene, activeSceneIndex } = this.sceneManager.getSceneState(progress);

        // Map the scroll progress directly to the GSAP timeline playhead
        if (this.timeline) {
          gsap.to(this.timeline, {
            progress: progress,
            duration: 0.1,
            overwrite: 'auto',
            ease: 'none'
          });
        }

        // Call current scene's animation callback if defined
        if (activeScene && activeScene.animationCallback) {
          activeScene.animationCallback(activeScene.localProgress, direction);
        }

        this.state = {
          progress,
          activeScene,
          activeSceneIndex,
          direction,
          isPinned: self.isActive,
        };

        this.notifySubscribers();
      },
      onToggle: (self) => {
        this.state.isPinned = self.isActive;
        this.notifySubscribers();
      },
    });
  }

  /**
   * Subscribes a callback to receive timeline updates.
   * Immediately invokes the callback with the current state.
   * 
   * @param callback Subscription listener.
   * @returns Unsubscribe function.
   */
  public subscribe(callback: TimelineCallback): () => void {
    this.subscribers.add(callback);
    callback(this.state);
    
    return () => {
      this.subscribers.delete(callback);
    };
  }

  /**
   * Notifies all active subscribers of a state change.
   */
  private notifySubscribers() {
    this.subscribers.forEach((callback) => callback(this.state));
  }

  /**
   * Gets the current timeline state.
   */
  public getState(): TimelineState {
    return this.state;
  }

  /**
   * Returns the underlying GSAP timeline so future phases can plug in animations.
   */
  public getTimeline(): gsap.core.Timeline | null {
    return this.timeline;
  }

  /**
   * Refreshes the ScrollTrigger calculations (useful on window resize).
   */
  public refresh() {
    ScrollTrigger.refresh();
  }

  /**
   * Cleans up the GSAP timeline and kills the ScrollTrigger instance.
   * Essential to avoid memory leaks upon component unmount.
   */
  public destroy() {
    this.subscribers.clear();
    
    if (this.scrollTriggerInstance) {
      this.scrollTriggerInstance.kill();
      this.scrollTriggerInstance = null;
    }

    if (this.timeline) {
      this.timeline.kill();
      this.timeline = null;
    }

    // Secondary deep cleanup to ensure no orphaned scrolltriggers remain
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === this.triggerElement || trigger.pin === this.pinElement) {
        trigger.kill();
      }
    });
  }
}
