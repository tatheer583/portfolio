export type HandNavigationInput = { lookX: number; lookY: number; forward: number }

export type HandPoint = { x: number; y: number }

export const RESTING_HAND_INPUT: HandNavigationInput = { lookX: 0, lookY: 0, forward: 0 }

const clamp = (value: number) => Math.max(-1, Math.min(1, value))
const distance = (a: HandPoint, b: HandPoint) => Math.hypot(a.x - b.x, a.y - b.y)

function axis(value: number) {
  const deadZone = 0.17
  return Math.abs(value) <= deadZone ? 0 : clamp((Math.abs(value) - deadZone) / (1 - deadZone)) * Math.sign(value)
}

/** A mirrored palm steers the view. A thumb/index pinch is a hold-to-walk gesture. */
export function handNavigationInput(points: readonly HandPoint[], previouslyPinched = false): HandNavigationInput {
  if (points.length < 21 || points.some((point) => !Number.isFinite(point.x) || !Number.isFinite(point.y))) {
    return { ...RESTING_HAND_INPUT }
  }

  const palm = [points[0], points[5], points[9], points[13], points[17]]
  const centerX = palm.reduce((sum, point) => sum + point.x, 0) / palm.length
  const centerY = palm.reduce((sum, point) => sum + point.y, 0) / palm.length
  const palmWidth = Math.max(distance(points[5], points[17]), 0.025)
  const pinchRatio = distance(points[4], points[8]) / palmWidth
  // Hysteresis prevents a noisy fingertip estimate from repeatedly starting and stopping movement.
  const pinched = pinchRatio < (previouslyPinched ? 0.44 : 0.29)

  return {
    lookX: axis((0.5 - centerX) * 2.8),
    lookY: axis((0.5 - centerY) * 2.8),
    forward: pinched ? 1 : 0,
  }
}
