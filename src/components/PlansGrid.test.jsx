import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import PlansGrid from './PlansGrid.jsx'

vi.mock('../hooks/useTariffs.js', () => ({
  default: vi.fn(),
}))

vi.mock('./FeaturedPlanCard.jsx', () => ({
  default: function MockFeaturedPlanCard({ title, isSelected, onSelect }) {
    return (
      <button type="button" data-selected={String(isSelected)} onClick={onSelect}>
        Featured: {title}
      </button>
    )
  },
}))

vi.mock('./PlanCard.jsx', () => ({
  default: function MockPlanCard({ title, isSelected, onSelect }) {
    return (
      <button type="button" data-selected={String(isSelected)} onClick={onSelect}>
        Regular: {title}
      </button>
    )
  },
}))

import useTariffs from '../hooks/useTariffs.js'

describe('PlansGrid', () => {
  it('renders loading, error and empty states', () => {
    useTariffs.mockReturnValueOnce({
      featuredPlan: null,
      regularPlans: [],
      isLoading: true,
      error: '',
    })

    const { rerender } = render(<PlansGrid selectedPlanId={null} />)
    expect(screen.getByText('Загрузка тарифов...')).toBeInTheDocument()

    useTariffs.mockReturnValueOnce({
      featuredPlan: null,
      regularPlans: [],
      isLoading: false,
      error: 'Ошибка',
    })
    rerender(<PlansGrid selectedPlanId={null} />)
    expect(screen.getByText('Ошибка')).toBeInTheDocument()

    useTariffs.mockReturnValueOnce({
      featuredPlan: null,
      regularPlans: [],
      isLoading: false,
      error: '',
    })
    rerender(<PlansGrid selectedPlanId={null} />)
    expect(screen.getByText('Тарифы недоступны')).toBeInTheDocument()
  })

  it('renders featured and regular plans and forwards selection', () => {
    const onSelectPlan = vi.fn()

    useTariffs.mockReturnValue({
      featuredPlan: { planKey: 'forever-0', title: 'Навсегда' },
      regularPlans: [
        { planKey: 'quarter-0', title: '3 месяца' },
        { planKey: 'month-1', title: '1 месяц' },
      ],
      isLoading: false,
      error: '',
    })

    render(
      <PlansGrid
        selectedPlanId="month-1"
        onSelectPlan={onSelectPlan}
        onPlansLoaded={vi.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: 'Featured: Навсегда' })).toHaveAttribute(
      'data-selected',
      'false',
    )
    expect(screen.getByRole('button', { name: 'Regular: 1 месяц' })).toHaveAttribute(
      'data-selected',
      'true',
    )

    fireEvent.click(screen.getByRole('button', { name: 'Featured: Навсегда' }))
    fireEvent.click(screen.getByRole('button', { name: 'Regular: 3 месяца' }))

    expect(onSelectPlan).toHaveBeenNthCalledWith(1, 'forever-0')
    expect(onSelectPlan).toHaveBeenNthCalledWith(2, 'quarter-0')
  })
})
