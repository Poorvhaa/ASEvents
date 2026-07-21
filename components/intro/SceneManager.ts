import { SceneConfig, SceneState } from './types';

/**
 * Manages the calculation of scene transitions, active scenes,
 * and mapping of master progress to scene-local progress.
 */
export class SceneManager {
  private scenes: SceneConfig[];

  /**
   * Instantiates the SceneManager with a set of scene configurations.
   * @param scenes Array of scene configurations, ordered chronologically.
   */
  constructor(scenes: SceneConfig[]) {
    // Sort and validate scenes to ensure proper progress progression
    this.scenes = [...scenes].sort((a, b) => a.startProgress - b.startProgress);
    this.validateProgressRanges();
  }

  /**
   * Validates that scene progress ranges are continuous and do not overlap invalidly.
   */
  private validateProgressRanges() {
    if (this.scenes.length === 0) return;
    
    // Check boundaries
    if (this.scenes[0].startProgress < 0 || this.scenes[this.scenes.length - 1].endProgress > 1) {
      console.warn('Scene progress boundaries are out of the 0.0 - 1.0 range.');
    }
  }

  /**
   * Exposes the raw list of scenes managed.
   */
  public getScenes(): SceneConfig[] {
    return this.scenes;
  }

  /**
   * Computes the states of all scenes and detects the active scene based on master scroll progress.
   * 
   * @param progress Master timeline scroll progress (normalized between 0.0 and 1.0).
   * @returns Object containing activeScene state, index, and state of all scenes.
   */
  public getSceneState(progress: number): {
    activeScene: SceneState | null;
    activeSceneIndex: number;
    allSceneStates: SceneState[];
  } {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    let activeScene: SceneState | null = null;
    let activeSceneIndex = -1;

    const allSceneStates = this.scenes.map((scene, index) => {
      const { startProgress, endProgress } = scene;

      // Determine active scene:
      // A scene is active if progress is within its start and end bounds.
      // At exact boundary values, we use inclusive/exclusive checks to avoid multiple active scenes.
      let isActive = false;
      
      if (clampedProgress === 1.0 && index === this.scenes.length - 1) {
        // Special case: at the absolute end, the final scene is active
        isActive = true;
      } else {
        isActive = clampedProgress >= startProgress && clampedProgress < endProgress;
      }

      // Calculate local normalized progress within the scene's own scroll span
      let localProgress = 0;
      if (clampedProgress >= endProgress) {
        localProgress = 1.0;
      } else if (clampedProgress <= startProgress) {
        localProgress = 0.0;
      } else {
        const range = endProgress - startProgress;
        localProgress = range > 0 ? (clampedProgress - startProgress) / range : 0.0;
      }

      const state: SceneState = {
        ...scene,
        localProgress,
        isActive,
        visibility: isActive,
      };

      if (isActive) {
        activeScene = state;
        activeSceneIndex = index;
      }

      return state;
    });

    // Fallback: If no scene was matched (e.g. gap in progress definitions), fallback to nearest
    if (!activeScene && this.scenes.length > 0) {
      if (clampedProgress <= 0.0) {
        activeSceneIndex = 0;
        allSceneStates[0].isActive = true;
        allSceneStates[0].visibility = true;
        activeScene = allSceneStates[0];
      } else {
        activeSceneIndex = this.scenes.length - 1;
        const lastIdx = this.scenes.length - 1;
        allSceneStates[lastIdx].isActive = true;
        allSceneStates[lastIdx].visibility = true;
        activeScene = allSceneStates[lastIdx];
      }
    }

    return { activeScene, activeSceneIndex, allSceneStates };
  }
}
