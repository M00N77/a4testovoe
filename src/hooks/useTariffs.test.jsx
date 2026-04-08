import { renderHook, waitFor } from '@testing-library/react'

import useTariffs from './useTariffs.js'

describe('useTariffs', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('loads tariffs, picks featured plan and sorts regular plans', async () => {
    const onPlansLoaded = vi.fn()

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: 1,
          period: '1 месяц',
          price: '299',
          full_price: '599',
          is_best: false,
          text: 'Месячный план',
        },
        {
          id: 2,
          period: 'Навсегда',
          price: '999',
          full_price: '1999',
          is_best: true,
          text: 'Навсегда',
        },
        {
          id: 3,
          period: '1 неделя',
          price: '99',
          full_price: '199',
          is_best: false,
          text: 'Недельный план',
        },
        {
          id: 4,
          period: '3 месяца',
          price: '499',
          full_price: '999',
          is_best: false,
          text: 'Квартальный план',
        },
      ],
    })

    const { result } = renderHook(() => useTariffs(onPlansLoaded))

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).toBe('')
    expect(result.current.featuredPlan?.title).toBe('Навсегда')
    expect(result.current.regularPlans.map((plan) => plan.title)).toEqual([
      '3 месяца',
      '1 месяц',
      '1 неделя',
    ])
    expect(onPlansLoaded).toHaveBeenCalledWith(
      expect.any(Array),
      expect.stringContaining('Навсегда'),
    )
  })

  it('returns an error when request fails', async () => {
    const onPlansLoaded = vi.fn()

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
    })

    const { result } = renderHook(() => useTariffs(onPlansLoaded))

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).toBe('Не удалось загрузить тарифы')
    expect(result.current.featuredPlan).toBeNull()
    expect(result.current.regularPlans).toEqual([])
    expect(onPlansLoaded).toHaveBeenCalledWith([], null)
  })
})
