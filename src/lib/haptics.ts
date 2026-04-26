/**
 * Haptic feedback utilities for mobile interactions
 * Uses the Web Vibration API where available
 */

export function triggerHaptic(
  type: "light" | "medium" | "heavy" | "success" | "error" | "warning"
) {
  if (typeof navigator === "undefined" || !navigator.vibrate) {
    return;
  }

  const patterns = {
    light: 10,
    medium: 20,
    heavy: 50,
    success: [10, 50, 10],
    error: [50, 30, 50],
    warning: [20, 30, 20],
  };

  navigator.vibrate(patterns[type]);
}

export function triggerHapticOnPress() {
  triggerHaptic("light");
}

export function triggerHapticOnSuccess() {
  triggerHaptic("success");
}

export function triggerHapticOnError() {
  triggerHaptic("error");
}

export function triggerHapticOnWarning() {
  triggerHaptic("warning");
}

export function isHapticSupported(): boolean {
  return typeof navigator !== "undefined" && "vibrate" in navigator;
}
