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
      String(Date.now() + 4 * 60 * 1000 + 15 * 1000),
    )

    const { result } = renderHook(() => usePersistentTimer())

    expect(result.current.formattedTime).toBe('04:15')
    expect(result.current.timerColor).toBe('#FACC15')
  })

  it('switches to danger color and recreates timer after expiration', () => {
    window.localStorage.setItem(
      'promo-timer-end-time',
      String(Date.now() + 2 * 60 * 1000),
    )

    const { result } = renderHook(() => usePersistentTimer())

    expect(result.current.timerColor).toBe('#EF4444')

    act(() => {
      vi.advanceTimersByTime(2 * 60 * 1000 + 1000)
    })

    expect(result.current.formattedTime).toBe('04:59')
    expect(result.current.timerColor).toBe('#FACC15')

    const storedEndTime = Number(window.localStorage.getItem('promo-timer-end-time'))
    expect(storedEndTime).toBeGreaterThan(Date.now())
  })
})
