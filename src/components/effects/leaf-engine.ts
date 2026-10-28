import type { Engine } from "@tsparticles/engine";

let enginePromise: Promise<void> | null = null;

/**
 * Modular loader that dynamically imports and registers only the needed tsParticles pieces.
 * Guarded with a module-level promise so it runs strictly ONCE across React StrictMode,
 * remounts, and client route navigation.
 */
export async function loadLeafEngine(engine: Engine): Promise<void> {
  if (enginePromise) {
    return enginePromise;
  }

  enginePromise = (async () => {
    const [
      { loadBasic },
      { loadEmittersPlugin },
      { loadEmittersShapeSquare },
      { loadImageShape },
      { loadRotateUpdater },
      { loadTiltUpdater },
      { loadWobbleUpdater },
    ] = await Promise.all([
      import("@tsparticles/basic"),
      import("@tsparticles/plugin-emitters"),
      import("@tsparticles/plugin-emitters-shape-square"),
      import("@tsparticles/shape-image"),
      import("@tsparticles/updater-rotate"),
      import("@tsparticles/updater-tilt"),
      import("@tsparticles/updater-wobble"),
    ]);

    await loadBasic(engine);
    await loadEmittersPlugin(engine);
    await loadEmittersShapeSquare(engine);
    await loadImageShape(engine);
    await loadRotateUpdater(engine);
    await loadTiltUpdater(engine);
    await loadWobbleUpdater(engine);
  })();

  return enginePromise;
}

