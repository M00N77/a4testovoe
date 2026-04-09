import { useEffect, useState } from 'react'

const TIMER_DURATION_MS = 2 * 60 * 1000
const STORAGE_KEY = 'promo-timer-end-time'
const TICK_MS = 1000
const EXPIRING_SOON_MS = 30 * 1000

function getTimerColor(timeLeftMs) {
  if (timeLeftMs <= EXPIRING_SOON_MS) {
    return '#EF4444'
  }

  return '#FACC15'
}

function formatTime(timeLeftMs) {
  const totalSeconds = Math.max(0, Math.floor(timeLeftMs / 1000))
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')

  return `${minutes}:${seconds}`
}

function getStoredEndTime() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY)
    const parsedValue = Number(storedValue)

    if (!storedValue || Number.isNaN(parsedValue)) {
      return null
    }

    return parsedValue
  } catch {
    return null
  }
}

function createEndTime(now) {
  return now + TIMER_DURATION_MS
}

function setStoredEndTime(endTime) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, String(endTime))
  } catch {
    return
  }
}

function getOrCreateEndTime(now) {
  const storedEndTime = getStoredEndTime()

  if (storedEndTime) {
    return storedEndTime
  }

  const nextEndTime = createEndTime(now)
  setStoredEndTime(nextEndTime)
  return nextEndTime
}

function getInitialTimeLeft() {
  if (typeof window === 'undefined') {
    return 0
  }

  const now = Date.now()
  const endTime = getOrCreateEndTime(now)

  return Math.max(0, endTime - now)
}

export default function usePersistentTimer() {
  const [timeLeftMs, setTimeLeftMs] = useState(getInitialTimeLeft)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const updateTimer = () => {
      const now = Date.now()
      const endTime = getOrCreateEndTime(now)
      const nextTimeLeftMs = endTime - now

      if (nextTimeLeftMs <= 0) {
        setTimeLeftMs(0)
        return
      }

      setTimeLeftMs(nextTimeLeftMs)
    }

    updateTimer()

    const intervalId = window.setInterval(updateTimer, TICK_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  return {
    formattedTime: formatTime(timeLeftMs),
    timeLeftMs,
    timerColor: getTimerColor(timeLeftMs),
    isExpired: timeLeftMs <= 0,
    isExpiringSoon: timeLeftMs > 0 && timeLeftMs <= EXPIRING_SOON_MS,
  }
}
