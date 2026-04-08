import { useCallback, useMemo, useState } from 'react'

export default function useSelectedPlan() {
  const [plans, setPlans] = useState([])
  const [selectedPlanId, setSelectedPlanId] = useState(null)

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.planKey === selectedPlanId) ?? null,
    [plans, selectedPlanId],
  )

  const handlePlansLoaded = useCallback((loadedPlans, defaultSelectedPlanId) => {
    setPlans(loadedPlans)
    setSelectedPlanId((currentSelectedPlanId) => {
      if (
        currentSelectedPlanId &&
        loadedPlans.some((plan) => plan.planKey === currentSelectedPlanId)
      ) {
        return currentSelectedPlanId
      }

      return defaultSelectedPlanId ?? loadedPlans[0]?.planKey ?? null
    })
  }, [])

  return {
    plans,
    selectedPlan,
    selectedPlanId,
    setSelectedPlanId,
    handlePlansLoaded,
  }
}
