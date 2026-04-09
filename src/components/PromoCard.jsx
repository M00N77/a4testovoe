import React from 'react'
import { useState } from 'react'

import BuyButton from './BuyButton.jsx'
import ConsentBlock from './ConsentBlock.jsx'
import LegalDisclaimer from './LegalDisclaimer.jsx'
import OfferNote from './OfferNote.jsx'
import PlansGrid from './PlansGrid.jsx'
import PromoImage from './PromoImage.jsx'
import RefundGuaranteeCard from './RefundGuaranteeCard.jsx'
import TimerBar from './TimerBar.jsx'
import usePersistentTimer from '../hooks/usePersistentTimer.js'
import useSelectedPlan from '../hooks/useSelectedPlan.js'

export default function PromoCard() {
  const [isConsentChecked, setIsConsentChecked] = useState(false)
  const [hasConsentError, setHasConsentError] = useState(false)
  const {
    selectedPlan,
    selectedPlanId,
    setSelectedPlanId,
    handlePlansLoaded,
  } = useSelectedPlan()
  const {
    formattedTime,
    timerColor,
    isExpired,
    isExpiringSoon,
  } = usePersistentTimer()

  const handleConsentChange = (nextChecked) => {
    setIsConsentChecked(nextChecked)

    if (nextChecked) {
      setHasConsentError(false)
    }
  }

  const handleBuyClick = () => {
    if (!selectedPlan) {
      return
    }

    if (!isConsentChecked) {
      setHasConsentError(true)
      return
    }

    setHasConsentError(false)
  }

  return (
    <div className="min-h-screen bg-[#232829]">
      <section>
        <TimerBar
          formattedTime={formattedTime}
          timerColor={timerColor}
          isExpiringSoon={isExpiringSoon}
        />
        <div className="mx-auto mt-4 max-w-[1600px] px-4 pb-8 sm:px-5 md:mt-8 md:px-8 md:pb-10 lg:mt-12 lg:px-14 xl:px-[170px]">
          <h1 className="mb-8 text-[32px] leading-[0.95] text-white md:mb-10 md:text-[36px] lg:mb-[50px] lg:text-[40px] lg:whitespace-nowrap">
            Выбери подходящий для себя <span className="text-[#FDB056]">тариф</span>
          </h1>

          <div className="grid grid-cols-1 gap-5 min-[970px]:grid-cols-[minmax(240px,1fr)_minmax(0,2fr)] min-[970px]:items-stretch min-[970px]:gap-x-6 min-[970px]:gap-y-0 xl:gap-x-8">
            <div className="w-full min-[970px]:h-full min-[970px]:self-stretch">
              <PromoImage />
            </div>

            <div className="min-w-0 w-full max-w-none">
              <PlansGrid
                isDiscountActive={!isExpired}
                selectedPlanId={selectedPlanId}
                onSelectPlan={setSelectedPlanId}
                onPlansLoaded={handlePlansLoaded}
              />

              <div className="mt-4 grid grid-cols-1 gap-4 md:mt-5 min-[970px]:grid-cols-3">
                <OfferNote className="min-[970px]:col-span-2" />
              </div>

              <ConsentBlock
                checked={isConsentChecked}
                onChange={handleConsentChange}
              />
              <BuyButton
                disabled={!selectedPlan}
                hasError={hasConsentError}
                onClick={handleBuyClick}
                selectedPlan={selectedPlan}
              />
            </div>

            <div className="min-w-0 min-[970px]:col-start-2">
              <LegalDisclaimer />
            </div>
          </div>

          <RefundGuaranteeCard />
        </div>
      </section>
    </div>
  )
}
