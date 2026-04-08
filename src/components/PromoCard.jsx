import { useCallback, useState } from 'react'

import BuyButton from './BuyButton.jsx'
import ConsentBlock from './ConsentBlock.jsx'
import LegalDisclaimer from './LegalDisclaimer.jsx'
import OfferNote from './OfferNote.jsx'
import PlansGrid from './PlansGrid.jsx'
import PromoImage from './PromoImage.jsx'
import RefundGuaranteeCard from './RefundGuaranteeCard.jsx'
import RefundGuaranteeModal from './RefundGuaranteeModal.jsx'
import TimerBar from './TimerBar.jsx'

export default function PromoCard() {
  const [isConsentChecked, setIsConsentChecked] = useState(false)
  const [plans, setPlans] = useState([])
  const [selectedPlanId, setSelectedPlanId] = useState(null)
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false)

  const selectedPlan = plans.find((plan) => plan.planKey === selectedPlanId) ?? null

  const handlePlansLoaded = useCallback((loadedPlans, defaultSelectedPlanId) => {
    setPlans(loadedPlans)
    setSelectedPlanId((currentSelectedPlanId) => {
      if (currentSelectedPlanId && loadedPlans.some((plan) => plan.planKey === currentSelectedPlanId)) {
        return currentSelectedPlanId
      }

      return defaultSelectedPlanId ?? loadedPlans[0]?.planKey ?? null
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#232829]">
      <section>
        <TimerBar />
        <div className="mx-auto mt-4 max-w-[1600px] px-4 pb-8 sm:px-5 md:mt-8 md:px-8 md:pb-10 lg:mt-12 lg:px-14 xl:px-[170px]">
          <h1 className="mb-8 max-w-[14ch] text-[32px] leading-[0.95] text-white md:mb-10 md:text-[36px] lg:mb-[50px] lg:max-w-none lg:text-[40px] lg:whitespace-nowrap">
            Выбери подходящий для себя <span className="text-[#FDB056]">тариф</span>
          </h1>

          <div className="grid grid-cols-1 gap-5 min-[970px]:grid-cols-[minmax(240px,1fr)_minmax(0,2fr)] min-[970px]:items-stretch min-[970px]:gap-x-6 min-[970px]:gap-y-0 xl:gap-x-8">
            <div className="w-full min-[970px]:h-full min-[970px]:self-stretch">
              <PromoImage />
            </div>

            <div className="min-w-0 w-full max-w-none">
              <PlansGrid
                selectedPlanId={selectedPlanId}
                onSelectPlan={setSelectedPlanId}
                onPlansLoaded={handlePlansLoaded}
              />

              <div className="mt-4 grid grid-cols-1 gap-4 md:mt-5 min-[970px]:grid-cols-3">
                <OfferNote className="min-[970px]:col-span-2" />
              </div>

              <ConsentBlock
                checked={isConsentChecked}
                onChange={setIsConsentChecked}
              />
              <BuyButton
                disabled={!isConsentChecked || !selectedPlan}
                selectedPlan={selectedPlan}
              />
            </div>

            <div className="min-[970px]:col-start-2">
              <LegalDisclaimer />
            </div>
          </div>

          <RefundGuaranteeCard onClick={() => setIsRefundModalOpen(true)} />
        </div>
      </section>

      <RefundGuaranteeModal
        open={isRefundModalOpen}
        onClose={() => setIsRefundModalOpen(false)}
      />
    </div>
  )
}
