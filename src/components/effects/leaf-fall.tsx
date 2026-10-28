"use client";

import * as React from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { loadLeafEngine } from "./leaf-engine";
import { leavesConfig } from "@/config/leaves.config";

export function LeafFall() {
  const [init, setInit] = React.useState(false);
  const containerRef = React.useRef<Container | null>(null);

  React.useEffect(() => {
    let mounted = true;

    initParticlesEngine(async (engine) => {
      await loadLeafEngine(engine);
    }).then(() => {
      if (mounted) {
        setInit(true);
      }
    });

    return () => {
      mounted = false;
      if (containerRef.current) {
        containerRef.current.destroy();
        containerRef.current = null;
      }
    };
  }, []);

  const particlesLoaded = React.useCallback(async (container?: Container) => {
    if (container) {
      containerRef.current = container;
    }
  }, []);

  const options: ISourceOptions = React.useMemo(
    () => ({
      autoPlay: true,
      fpsLimit: 60,
      detectRetina: true,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      fullScreen: false,
      particles: {
        number: {
          value: 0,
          limit: {
            mode: "wait",
            value: leavesConfig.desktopMax,
          },
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "image",
          options: {
            image: leavesConfig.leafSprites.map((leaf) => ({
              src: leaf.src,
              width: leaf.width,
              height: leaf.height,
              replaceColor: false,
            })),
          },
        },
        size: {
          value: {
            min: leavesConfig.size.desktop.min,
            max: leavesConfig.size.desktop.max,
          },
        },
        opacity: {
          value: {
            min: leavesConfig.opacity.min,
            max: leavesConfig.opacity.max,
          },
        },
        move: {
          enable: true,
          direction: "bottom",
          speed: {
            min: leavesConfig.speed.min,
            max: leavesConfig.speed.max,
          },
          straight: false,
          drift: {
            min: leavesConfig.drift.min,
            max: leavesConfig.drift.max,
          },
          outModes: {
            default: "destroy",
            bottom: "destroy",
            top: "none",
          },
        },
        rotate: {
          value: { min: 0, max: 360 },
          direction: "random",
          animation: {
            enable: true,
            speed: {
              min: leavesConfig.rotate.speed.min,
              max: leavesConfig.rotate.speed.max,
            },
            sync: false,
          },
        },
        tilt: {
          enable: true,
          direction: "random",
          value: { min: 0, max: 360 },
          animation: {
            enable: true,
            speed: {
              min: leavesConfig.tilt.speed.min,
              max: leavesConfig.tilt.speed.max,
            },
            sync: false,
          },
        },
        wobble: {
          enable: true,
          distance: leavesConfig.wobble.distance,
          speed: {
            min: leavesConfig.wobble.speed.min,
            max: leavesConfig.wobble.speed.max,
          },
        },
      },
      emitters: [
        {
          autoPlay: true,
          fill: true,
          life: {
            wait: false,
          },
          rate: {
            quantity: leavesConfig.emitter.desktopRate.quantity,
            delay: {
              min: leavesConfig.emitter.desktopRate.delay.min,
              max: leavesConfig.emitter.desktopRate.delay.max,
            },
          },
          shape: {
            type: "square",
          },
          size: {
            mode: "percent",
            height: 0,
            width: 100,
          },
          position: {
            x: 50,
            y: 0,
          },
        },
      ],
      responsive: [
        {
          maxWidth: 768,
          options: {
            particles: {
              number: {
                limit: {
                  mode: "wait",
                  value: leavesConfig.mobileMax,
                },
              },
              size: {
                value: {
                  min: leavesConfig.size.mobile.min,
                  max: leavesConfig.size.mobile.max,
                },
              },
            },
            emitters: [
              {
                rate: {
                  quantity: leavesConfig.emitter.mobileRate.quantity,
                  delay: {
                    min: leavesConfig.emitter.mobileRate.delay.min,
                    max: leavesConfig.emitter.mobileRate.delay.max,
                  },
                },
              },
            ],
          },
        },
      ],
    }),
    []
  );

  if (!init) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-[35] overflow-hidden"
      style={{ contain: "strict" }}
      aria-hidden="true"
    >
      <Particles
        id="tsparticles-falling-leaves"
        particlesLoaded={particlesLoaded}
        options={options}
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
}

