import { act, renderHook } from '@testing-library/react'

import usePersistentTimer from './usePersistentTimer.js'

describe('usePersistentTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
    window.localStorage.clear()
  })

  afterEach(() => {
    vi.useRealTimers()
    window.localStorage.clear()
  })

  it('creates timer state from localStorage and formats initial time', () => {
    window.localStorage.setItem(
      'promo-timer-end-time',
      String(Date.now() + 60 * 1000 + 15 * 1000),
    )

    const { result } = renderHook(() => usePersistentTimer())

    expect(result.current.formattedTime).toBe('01:15')
    expect(result.current.timerColor).toBe('#FACC15')
    expect(result.current.isExpired).toBe(false)
  })

  it('switches to danger color in last 30 seconds and expires without restart', () => {
    window.localStorage.setItem(
      'promo-timer-end-time',
      String(Date.now() + 25 * 1000),
    )

    const { result } = renderHook(() => usePersistentTimer())

    expect(result.current.timerColor).toBe('#EF4444')
    expect(result.current.isExpiringSoon).toBe(true)

    act(() => {
      vi.advanceTimersByTime(26 * 1000)
    })

    expect(result.current.formattedTime).toBe('00:00')
    expect(result.current.timerColor).toBe('#EF4444')
    expect(result.current.isExpired).toBe(true)
    expect(result.current.isExpiringSoon).toBe(false)

    const storedEndTime = Number(window.localStorage.getItem('promo-timer-end-time'))
    expect(storedEndTime).toBeLessThanOrEqual(Date.now())
  })
})
