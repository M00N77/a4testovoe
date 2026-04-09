import PlanPriceBlock from './PlanPriceBlock.jsx'
import PlanDiscountBadge from './PlanDiscountBadge.jsx'

export default function PlanCard({
  title,
  price,
  fullPrice,
  description,
  discountPercent,
  isDiscountActive = true,
  isSelected = false,
  onSelect,
}) {
  const baseClasses =
    'relative flex h-full w-full flex-col overflow-hidden rounded-[39px] border bg-[#2F3435] px-5 pb-1 pt-7 text-left text-white shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition-[border-color,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB056] focus-visible:ring-offset-2 focus-visible:ring-offset-[#232829] min-h-[200px] min-[970px]:min-h-[220px] xl:min-h-[300px]'

  const stateClasses = isSelected
    ? 'border-[#F6A74B] bg-[#313738]'
    : 'border-white/10 hover:border-white/20'

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`${baseClasses} ${stateClasses}`}
    >
      <PlanDiscountBadge
        discountPercent={discountPercent}
        isVisible={isDiscountActive}
      />

      <div className="flex h-full flex-1 items-center justify-center text-center">
        <div className="flex max-w-[18rem] flex-col items-center justify-center gap-3 min-[970px]:gap-4">
          <h3 className="text-[18px] font-semibold leading-tight min-[970px]:text-[20px] xl:text-[22px]">
            {title}
          </h3>

          <PlanPriceBlock
            price={price}
            fullPrice={fullPrice}
            isDiscountActive={isDiscountActive}
            className="gap-1"
            priceClassName="text-white text-[30px] min-[970px]:text-[34px] xl:text-[38px]"
            fullPriceClassName="mt-0 text-white/42 text-[14px] min-[970px]:text-[15px]"
          />

          <p className="text-center text-[14px] leading-5 text-white/72 min-[970px]:text-[15px] min-[970px]:leading-6">
            {description}
          </p>
        </div>
      </div>
    </button>
  )
}
