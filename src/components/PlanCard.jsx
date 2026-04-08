import PlanPriceBlock from './PlanPriceBlock.jsx'
import PlanDiscountBadge from './PlanDiscountBadge.jsx'

export default function PlanCard({
                                   title,
                                   price,
                                   fullPrice,
                                   description,
                                   discountPercent,
                                   isSelected = false,
                                   onSelect,
                                 }) {
  const baseClasses =
      'relative flex h-full w-full flex-col overflow-hidden rounded-[32px] border bg-[#2F3435] px-5 pb-5 pt-7 text-left text-white shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition-[border-color,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB056] focus-visible:ring-offset-2 focus-visible:ring-offset-[#232829] min-h-[200px] min-[970px]:min-h-[220px] xl:min-h-[300px]'

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
        <PlanDiscountBadge discountPercent={discountPercent} />

        <div className="flex h-full flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h3 className="text-[18px] font-semibold leading-tight min-[970px]:text-[20px] xl:text-[22px]">
              {title}
            </h3>

            <PlanPriceBlock
                price={price}
                fullPrice={fullPrice}
                className="mt-3 gap-1.5"
                priceClassName="text-white text-[30px] min-[970px]:text-[34px] xl:text-[38px]"
                fullPriceClassName="mt-0 text-white/42 text-[14px] min-[970px]:text-[15px]"
            />
          </div>

          <div className="mt-4 flex justify-center">
            <p className="max-w-[18rem] text-center text-[14px] leading-5 text-white/72 min-[970px]:text-[15px] min-[970px]:leading-6">
              {description}
            </p>
          </div>
        </div>
      </button>
  )
}