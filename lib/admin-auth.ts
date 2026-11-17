import { timingSafeEqual } from 'crypto'

export function isValidPinValue(provided: string | null | undefined, expected: string | undefined): boolean {
  if (!provided || !expected) return false
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export function checkAdminRequest(req: { headers: { get(name: string): string | null } }): boolean {
  return isValidPinValue(req.headers.get('x-admin-pin'), process.env.ADMIN_PIN)
}
