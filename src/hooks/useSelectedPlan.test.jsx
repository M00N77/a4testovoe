import { act, renderHook } from '@testing-library/react'

import useSelectedPlan from './useSelectedPlan.js'

describe('useSelectedPlan', () => {
  it('keeps the current selection when the selected plan still exists', () => {
    const { result } = renderHook(() => useSelectedPlan())

    const initialPlans = [
      { planKey: 'forever-0', title: 'Навсегда' },
      { planKey: 'month-1', title: '1 месяц' },
    ]

    act(() => {
      result.current.handlePlansLoaded(initialPlans, 'forever-0')
    })

    act(() => {
      result.current.setSelectedPlanId('month-1')
    })

    act(() => {
      result.current.handlePlansLoaded(initialPlans, 'forever-0')
    })

    expect(result.current.selectedPlanId).toBe('month-1')
    expect(result.current.selectedPlan).toEqual(initialPlans[1])
  })

  it('falls back to the provided default plan when current selection disappears', () => {
    const { result } = renderHook(() => useSelectedPlan())

    act(() => {
      result.current.handlePlansLoaded(
        [
          { planKey: 'week-0', title: '1 неделя' },
          { planKey: 'month-1', title: '1 месяц' },
        ],
        'week-0',
      )
    })

    act(() => {
      result.current.setSelectedPlanId('month-1')
    })

    const nextPlans = [{ planKey: 'quarter-0', title: '3 месяца' }]

    act(() => {
      result.current.handlePlansLoaded(nextPlans, 'quarter-0')
    })

    expect(result.current.selectedPlanId).toBe('quarter-0')
    expect(result.current.selectedPlan).toEqual(nextPlans[0])
  })
})
