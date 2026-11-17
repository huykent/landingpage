import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import {
  buildOrderFromInput,
  generateOrderId,
  isValidOrderStatus,
  sanitizeCsvCell,
} from '../lib/catalog.ts'
import { isValidPinValue } from '../lib/admin-auth.ts'
import { escapeTelegramMarkdown } from '../lib/webhook.ts'
import {
  SOCIAL_PROOF_BUYERS,
  pickNextBatchSize,
  shuffleIndices,
} from '../lib/social-proof.ts'

test('generateOrderId produces unique IDs in rapid succession', () => {
  const ids = new Set()
  for (let i = 0; i < 200; i++) {
    ids.add(generateOrderId())
  }
  assert.equal(ids.size, 200)
})

test('buildOrderFromInput computes totals and rejects invalid quantities', () => {
  const ok = buildOrderFromInput({
    customerName: 'Nguyễn Văn A',
    phone: '0987 654 321',
    address: 'Số 10, Phường Dịch Vọng, Quận Cầu Giấy, Thành phố Hà Nội',
    mainProduct: 'laser_pro',
    addOns: [
      { id: 'extra_band', quantity: 2 },
      { id: 'extra_ammo', quantity: 1 },
    ],
  })
  assert.ok('order' in ok)
  assert.equal(ok.order.totalAmount, 510000)
  assert.equal(ok.order.phone, '0987654321')

  // Reject fractional quantity
  const frac = buildOrderFromInput({
    customerName: 'Test',
    phone: '0987654321',
    address: 'Hà Nội Việt Nam',
    mainProduct: 'standard',
    addOns: [{ id: 'extra_band', quantity: 0.5 }],
  })
  assert.ok('error' in frac)

  // Reject huge quantity
  const huge = buildOrderFromInput({
    customerName: 'Test',
    phone: '0987654321',
    address: 'Hà Nội Việt Nam',
    mainProduct: 'standard',
    addOns: [{ id: 'extra_band', quantity: 500 }],
  })
  assert.ok('error' in huge)

  // Normalize unknown mainProduct safely
  const unknown = buildOrderFromInput({
    customerName: 'Test',
    phone: '0987654321',
    address: 'Hà Nội Việt Nam',
    mainProduct: 'hacked_plan',
  })
  assert.ok('order' in unknown)
  assert.equal(unknown.order.mainProduct, 'laser_pro')
  assert.equal(unknown.order.mainPrice, 400000)
})

test('isValidOrderStatus validates allowed statuses only', () => {
  assert.equal(isValidOrderStatus('confirmed'), true)
  assert.equal(isValidOrderStatus('shipping'), true)
  assert.equal(isValidOrderStatus('hacked'), false)
  assert.equal(isValidOrderStatus(null), false)
})

test('sanitizeCsvCell neutralizes Excel formula injection', () => {
  assert.equal(sanitizeCsvCell('=CMD|calc'), `"'=CMD|calc"`)
  assert.equal(sanitizeCsvCell('+1+1'), `"'+1+1"`)
  assert.equal(sanitizeCsvCell('-2+3'), `"'-2+3"`)
  assert.equal(sanitizeCsvCell('@SUM(A1)'), `"'@SUM(A1)"`)
  assert.equal(sanitizeCsvCell('Anh "Nam"'), `"Anh ""Nam"""`)
})

test('isValidPinValue uses constant-time comparison and rejects empty/mismatch', () => {
  assert.equal(isValidPinValue('secret123', 'secret123'), true)
  assert.equal(isValidPinValue('secret124', 'secret123'), false)
  assert.equal(isValidPinValue('short', 'secret123'), false)
  assert.equal(isValidPinValue('', 'secret123'), false)
  assert.equal(isValidPinValue('secret123', undefined), false)
})

test('escapeTelegramMarkdown escapes control characters', () => {
  assert.equal(escapeTelegramMarkdown('Lo_A2 *gap* [test] `x`'), 'Lo\\_A2 \\*gap\\* \\[test] \\`x\\`')
})

test('Vietnam 63-province legacy address dataset is valid', () => {
  const filePath = path.join(process.cwd(), 'public', 'data', 'vn-addresses.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  assert.equal(data.length, 63)
  assert.ok(data.some(p => p[0] === 'Thành phố Hà Nội'))
  assert.ok(data.some(p => p[0] === 'Thành phố Hồ Chí Minh'))
})

test('Social proof has 100 unique Vietnamese buyers and non-repeating shuffle', () => {
  assert.equal(SOCIAL_PROOF_BUYERS.length, 100)
  const uniqueNames = new Set(SOCIAL_PROOF_BUYERS.map(b => b.name))
  assert.equal(uniqueNames.size, 100)

  const shuffled = shuffleIndices(100)
  assert.equal(shuffled.length, 100)
  assert.equal(new Set(shuffled).size, 100)

  assert.equal(pickNextBatchSize(() => 0.1), 1)
  assert.equal(pickNextBatchSize(() => 0.65), 2)
  assert.equal(pickNextBatchSize(() => 0.9), 3)
})
