import { useEffect, useState } from 'react'

import FeaturedPlanCard from './FeaturedPlanCard.jsx'
import PlanCard from './PlanCard.jsx'

const TARIFFS_URL = 'https://t-core.fit-hub.pro/Test/GetTariffs'
const MAX_PLANS = 4
const REGULAR_PLAN_ORDER = {
  '3 месяца': 0,
  '1 месяц': 1,
  '1 неделя': 2,
}

function getDiscountPercent(price, fullPrice) {
  if (
    typeof price !== 'number' ||
    typeof fullPrice !== 'number' ||
    fullPrice <= 0
  ) {
    return 0
  }

  const discountPercent = Math.round((1 - price / fullPrice) * 100)

  return Number.isFinite(discountPercent) ? discountPercent : 0
}

function getNumericValue(value) {
  const numericValue = Number(value)

  return Number.isFinite(numericValue) ? numericValue : 0
}

function normalizeTariff(tariff, index) {
  const id = tariff.id ?? `plan-${index}`
  const price = getNumericValue(tariff.price)
  const fullPrice = getNumericValue(tariff.full_price)
  const title = tariff.period || `Тариф ${index + 1}`

  return {
    id: String(id),
    planKey: `${id}-${title}-${index}`,
    title,
    price,
    fullPrice,
    isBest: tariff.is_best === true,
    description: tariff.text || 'Описание тарифа скоро появится',
    discountPercent: getDiscountPercent(price, fullPrice),
  }
}

function getFeaturedPlan(plans) {
  return plans.find((plan) => plan.isBest) ?? plans[0] ?? null
}

function getDefaultSelectedPlanId(plans) {
  return getFeaturedPlan(plans)?.planKey ?? null
}

function sortRegularPlans(plans) {
  return [...plans].sort((firstPlan, secondPlan) => {
    const firstOrder = REGULAR_PLAN_ORDER[firstPlan.title] ?? Number.MAX_SAFE_INTEGER
    const secondOrder = REGULAR_PLAN_ORDER[secondPlan.title] ?? Number.MAX_SAFE_INTEGER

    return firstOrder - secondOrder
  })
}

export default function PlansGrid({
  selectedPlanId,
  onSelectPlan,
  onPlansLoaded,
}) {
  const [plans, setPlans] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadTariffs() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(TARIFFS_URL, { signal: controller.signal })

        if (!response.ok) {
          throw new Error('Не удалось загрузить тарифы')
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          throw new Error('Некорректный формат тарифов')
        }

        const normalizedPlans = data.slice(0, MAX_PLANS).map(normalizeTariff)
        const defaultSelectedPlanId = getDefaultSelectedPlanId(normalizedPlans)

        setPlans(normalizedPlans)

        if (onPlansLoaded) {
          onPlansLoaded(normalizedPlans, defaultSelectedPlanId)
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          return
        }

        setPlans([])
        setError(err.message || 'Не удалось загрузить тарифы')

        if (onPlansLoaded) {
          onPlansLoaded([], null)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadTariffs()

    return () => {
      controller.abort()
    }
  }, [onPlansLoaded])

  if (isLoading) {
    return <p className="rounded-[22px] border border-white/8 bg-[#2B3132] px-4 py-4 text-[14px] text-white/70">Загрузка тарифов...</p>
  }

  if (error) {
    return <p className="rounded-[22px] border border-[#FF5A57]/30 bg-[#2B3132] px-4 py-4 text-[14px] text-[#ffb4b2]">{error}</p>
  }

  if (plans.length === 0) {
    return <p className="rounded-[22px] border border-white/8 bg-[#2B3132] px-4 py-4 text-[14px] text-white/70">Тарифы недоступны</p>
  }

  const featuredPlan = getFeaturedPlan(plans)
  const regularPlans = sortRegularPlans(
    plans.filter((plan) => plan.planKey !== featuredPlan?.planKey),
  )

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
