import React from 'react'
import FeaturedPlanCard from './FeaturedPlanCard.jsx'
import PlanCard from './PlanCard.jsx'
import useTariffs from '../hooks/useTariffs.js'

export default function PlansGrid({
  selectedPlanId,
  onSelectPlan,
  onPlansLoaded,
}) {
  const {
    featuredPlan,
    regularPlans,
    isLoading,
    error,
  } = useTariffs(onPlansLoaded)

  if (isLoading) {
    return <p className="rounded-[22px] border border-white/8 bg-[#2B3132] px-4 py-4 text-[14px] text-white/70">Загрузка тарифов...</p>
  }

  if (error) {
    return <p className="rounded-[22px] border border-[#FF5A57]/30 bg-[#2B3132] px-4 py-4 text-[14px] text-[#ffb4b2]">{error}</p>
  }

  if (!featuredPlan && regularPlans.length === 0) {
    return <p className="rounded-[22px] border border-white/8 bg-[#2B3132] px-4 py-4 text-[14px] text-white/70">Тарифы недоступны</p>
  }

  return (
    <div className="flex flex-col gap-4">
      {featuredPlan ? (
        <div>
          <FeaturedPlanCard
            {...featuredPlan}
            isSelected={featuredPlan.planKey === selectedPlanId}
            onSelect={() => onSelectPlan?.(featuredPlan.planKey)}
          />
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 min-[970px]:grid-cols-3 min-[970px]:items-stretch">
        {regularPlans.map((plan) => (
          <PlanCard
            key={plan.planKey}
            {...plan}
            isSelected={plan.planKey === selectedPlanId}
            onSelect={() => onSelectPlan?.(plan.planKey)}
          />
        ))}
      </div>
    </div>
  )
}
