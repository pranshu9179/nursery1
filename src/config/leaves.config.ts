export interface LeafSpriteConfig {
  src: string;
  width: number;
  height: number;
}

export interface LeavesConfig {
  enabled: boolean;
  defaultOn: boolean;
  desktopMax: number;
  mobileMax: number;
  speed: {
    min: number;
    max: number;
  };
  size: {
    desktop: { min: number; max: number };
    mobile: { min: number; max: number };
  };
  opacity: {
    min: number;
    max: number;
  };
  wobble: {
    distance: number;
    speed: { min: number; max: number };
  };
  tilt: {
    speed: { min: number; max: number };
  };
  rotate: {
    speed: { min: number; max: number };
  };
  drift: {
    min: number;
    max: number;
  };
  emitter: {
    desktopRate: { quantity: number; delay: { min: number; max: number } };
    mobileRate: { quantity: number; delay: { min: number; max: number } };
  };
  disabledRoutes: string[];
  respectReducedMotion: boolean;
  skipLowHardware: boolean;
  skipSaveData: boolean;
  enableCursorInteraction: boolean;
  enableScrollWind: boolean;
  leafSprites: LeafSpriteConfig[];
}

export const leavesConfig: LeavesConfig = {
  enabled: true,
  defaultOn: true,
  desktopMax: 14,
  mobileMax: 6,
  // Speed roughly 1.2 to 2.5 gives ~8-16s drift across 900px viewport
  speed: {
    min: 1.2,
    max: 2.5,
  },
  size: {
    desktop: { min: 14, max: 30 },
    mobile: { min: 12, max: 20 },
  },
  opacity: {
    min: 0.65,
    max: 0.95,
  },
  wobble: {
    distance: 16,
    speed: { min: 1.5, max: 3.2 },
  },
  tilt: {
    speed: { min: 14, max: 26 },
  },
  rotate: {
    speed: { min: 4, max: 9 },
  },
  drift: {
    min: -0.35,
    max: 0.35,
  },
  emitter: {
    desktopRate: {
      quantity: 1,
      delay: { min: 0.8, max: 1.6 },
    },
    mobileRate: {
      quantity: 1,
      delay: { min: 1.8, max: 3.2 },
    },
  },
  disabledRoutes: ["/checkout", "/cart"],
  respectReducedMotion: true,
  skipLowHardware: true,
  skipSaveData: true,
  enableCursorInteraction: false, // Optional enhancement behind flag
  enableScrollWind: false, // Optional enhancement behind flag
  leafSprites: [
    { src: "/leaves/leaf-ovate.svg", width: 64, height: 64 },
    { src: "/leaves/leaf-lanceolate.svg", width: 64, height: 64 },
    { src: "/leaves/leaf-heart.svg", width: 64, height: 64 },
    { src: "/leaves/leaf-monstera.svg", width: 64, height: 64 },
    { src: "/leaves/leaf-pilea.svg", width: 64, height: 64 },
  ],
};

