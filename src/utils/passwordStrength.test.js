import { describe, it, expect } from 'vitest'
import { getPasswordStrength } from './passwordStrength'

describe('getPasswordStrength', () => {
  // ── empty / falsy input ──────────────────────────────────────────────────

  it('returns level "none" for an empty string', () => {
    expect(getPasswordStrength('')).toEqual({ level: 'none', label: '' })
  })

  it('returns level "none" for undefined', () => {
    expect(getPasswordStrength(undefined)).toEqual({ level: 'none', label: '' })
  })

  it('returns level "none" for null', () => {
    expect(getPasswordStrength(null)).toEqual({ level: 'none', label: '' })
  })

  // ── weak (score ≤ 1) ────────────────────────────────────────────────────

  it('rates a very short lowercase-only password as weak', () => {
    // "abc" — passes 0 checks → weak
    expect(getPasswordStrength('abc')).toEqual({ level: 'weak', label: 'Weak' })
  })

  it('rates a password meeting only the length check as weak', () => {
    // "abcdefgh" — only length ≥ 8 passes → score 1 → weak
    expect(getPasswordStrength('abcdefgh')).toEqual({ level: 'weak', label: 'Weak' })
  })

  it('rates a password meeting only the uppercase check as weak', () => {
    // "A" — only uppercase passes → score 1 → weak
    expect(getPasswordStrength('A')).toEqual({ level: 'weak', label: 'Weak' })
  })

  // ── fair (score === 2) ───────────────────────────────────────────────────

  it('rates a password meeting length + uppercase as fair', () => {
    // "Abcdefgh" — length ≥ 8 ✓, uppercase ✓ → score 2
    expect(getPasswordStrength('Abcdefgh')).toEqual({ level: 'fair', label: 'Fair' })
  })

  it('rates a password meeting length + digit as fair', () => {
    // "abcdefg1" — length ≥ 8 ✓, digit ✓ → score 2
    expect(getPasswordStrength('abcdefg1')).toEqual({ level: 'fair', label: 'Fair' })
  })

  it('rates a short password with uppercase + digit as fair', () => {
    // "Ab1" — uppercase ✓, digit ✓ (length fails) → score 2
    expect(getPasswordStrength('Ab1')).toEqual({ level: 'fair', label: 'Fair' })
  })

  // ── good (score === 3) ───────────────────────────────────────────────────

  it('rates a password meeting length + uppercase + digit as good', () => {
    // "Abcdefg1" — length ✓, uppercase ✓, digit ✓ → score 3
    expect(getPasswordStrength('Abcdefg1')).toEqual({ level: 'good', label: 'Good' })
  })

  it('rates a password meeting length + uppercase + special as good', () => {
    // "Abcdefg!" — length ✓, uppercase ✓, special ✓ → score 3
    expect(getPasswordStrength('Abcdefg!')).toEqual({ level: 'good', label: 'Good' })
  })

  // ── strong (score === 4) ─────────────────────────────────────────────────

  it('rates a password meeting all four checks as strong', () => {
    // "Abcdef1!" — length ✓, uppercase ✓, digit ✓, special ✓ → score 4
    expect(getPasswordStrength('Abcdef1!')).toEqual({ level: 'strong', label: 'Strong' })
  })

  it('rates a complex passphrase as strong', () => {
    expect(getPasswordStrength('P@ssw0rd123')).toEqual({ level: 'strong', label: 'Strong' })
  })

  it('is not fooled by a long all-lowercase password — still only 1 check', () => {
    // "averylongpassword" — only length passes → weak
    expect(getPasswordStrength('averylongpassword')).toEqual({ level: 'weak', label: 'Weak' })
  })
})
