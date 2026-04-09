import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import PromoCard from './PromoCard.jsx'

vi.mock('./TimerBar.jsx', () => ({
  default: () => <div>Timer</div>,
}))

vi.mock('./PromoImage.jsx', () => ({
  default: () => <div>Trainer</div>,
}))

vi.mock('./RefundGuaranteeCard.jsx', () => ({
  default: () => <div>Refund</div>,
}))

vi.mock('./OfferNote.jsx', () => ({
  default: ({ className = '' }) => <div className={className}>Offer</div>,
}))

vi.mock('./LegalDisclaimer.jsx', () => ({
  default: () => <div>Legal</div>,
}))

vi.mock('./ConsentBlock.jsx', () => ({
  default: function MockConsentBlock({ checked, onChange }) {
    return (
      <button
        type="button"
        aria-label="Согласие с офертой рекуррентных платежей"
        onClick={() => onChange(!checked)}
      >
        Consent
      </button>
    )
  },
}))

vi.mock('./BuyButton.jsx', () => ({
  default: function MockBuyButton({ disabled, hasError, onClick, selectedPlan, children = 'Купить' }) {
    return (
      <button
        type="button"
        disabled={disabled}
        aria-invalid={hasError}
        aria-label={selectedPlan ? `Купить тариф ${selectedPlan.title}` : children}
        onClick={() => onClick?.(selectedPlan)}
      >
        {children}
      </button>
    )
  },
}))

vi.mock('./PlansGrid.jsx', () => ({
  default: function MockPlansGrid({ selectedPlanId, onSelectPlan, onPlansLoaded }) {
    React.useEffect(() => {
      onPlansLoaded(
        [
          { planKey: 'forever-0', title: 'Навсегда' },
          { planKey: 'month-1', title: '1 месяц' },
        ],
        'forever-0',
      )
    }, [onPlansLoaded])

    return (
      <div>
        <div data-testid="selected-plan-id">{selectedPlanId ?? 'none'}</div>
        <button type="button" onClick={() => onSelectPlan('month-1')}>
          Выбрать 1 месяц
        </button>
      </div>
    )
  },
}))

describe('PromoCard', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shows an error on buy click without consent and enables valid purchase after consent', async () => {
    render(<PromoCard />)

    const buyButton = await screen.findByRole('button', { name: 'Купить тариф Навсегда' })

    expect(buyButton).toBeEnabled()
    expect(screen.getByTestId('selected-plan-id')).toHaveTextContent('forever-0')

    fireEvent.click(buyButton)

    expect(buyButton).toHaveAttribute('aria-invalid', 'true')

    fireEvent.click(screen.getByRole('button', { name: 'Выбрать 1 месяц' }))

    expect(screen.getByRole('button', { name: 'Купить тариф 1 месяц' })).toHaveAttribute(
      'aria-invalid',
      'true',
    )
    expect(screen.getByTestId('selected-plan-id')).toHaveTextContent('month-1')

    fireEvent.click(screen.getByLabelText('Согласие с офертой рекуррентных платежей'))

    expect(screen.getByRole('button', { name: 'Купить тариф 1 месяц' })).toHaveAttribute(
      'aria-invalid',
      'false',
    )
  })
})
