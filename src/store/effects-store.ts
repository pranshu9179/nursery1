import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { leavesConfig } from "@/config/leaves.config";

interface EffectsState {
  leavesEnabled: boolean;
  hasHydrated: boolean;
  toggleLeaves: () => void;
  setLeavesEnabled: (enabled: boolean) => void;
  setHasHydrated: (state: boolean) => void;
}

export const useEffectsStore = create<EffectsState>()(
  persist(
    (set) => ({
      leavesEnabled: leavesConfig.defaultOn,
      hasHydrated: false,

      toggleLeaves: () =>
        set((state) => ({ leavesEnabled: !state.leavesEnabled })),

      setLeavesEnabled: (enabled: boolean) =>
        set({ leavesEnabled: enabled }),

      setHasHydrated: (state: boolean) =>
        set({ hasHydrated: state }),
    }),
    {
      name: "botanica-effects-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        leavesEnabled: state.leavesEnabled,
      }),
    }
  )
);

