import PlanPriceBlock from './PlanPriceBlock.jsx'
import PlanDiscountBadge from './PlanDiscountBadge.jsx'

export default function FeaturedPlanCard({
  title,
  price,
  fullPrice,
  description,
  discountPercent,
  isSelected = false,
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`relative flex min-h-[184px] w-full flex-col overflow-hidden rounded-[26px] border bg-[#2B2F30] px-4 pb-1 pt-6 text-left text-white shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition-[border-color,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB056] focus-visible:ring-offset-2 focus-visible:ring-offset-[#232829] min-[970px]:min-h-[210px] min-[970px]:px-5 min-[970px]:pt-7 xl:min-h-[224px] xl:rounded-[30px] xl:px-6 xl:pb-5 xl:pt-8 ${
        isSelected ? 'border-[#F6A74B] bg-[#313738]' : 'border-white/10 hover:border-white/20'
      }`}
    >
      <PlanDiscountBadge discountPercent={discountPercent} />

      <span
        className="absolute right-4 top-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#F6A74B] md:right-5 md:top-4 md:text-[14px] xl:right-7 xl:top-5 xl:text-[16px]"
      >
        ХИТ!
      </span>

      <div
        className="flex h-full flex-1 flex-col gap-4 pt-2 min-[970px]:grid min-[970px]:grid-cols-[minmax(220px,260px)_minmax(0,1fr)] min-[970px]:items-center min-[970px]:gap-5 min-[970px]:pt-0 xl:grid-cols-[minmax(260px,300px)_minmax(0,1fr)] xl:gap-6"
      >
        <div className="flex min-w-0 flex-col items-center justify-center text-center min-[970px]:min-h-[112px] min-[970px]:gap-2">
          <h3 className="max-w-[14rem] text-[18px] font-semibold leading-tight min-[970px]:max-w-[16rem] min-[970px]:text-[24px]">
            {title}
          </h3>

          <PlanPriceBlock
            price={price}
            fullPrice={fullPrice}
            className="mt-2 min-[970px]:gap-1.5"
            priceClassName="text-[#FDB056] min-[970px]:text-[40px]"
            fullPriceClassName="text-white/42 min-[970px]:mt-0 min-[970px]:text-[16px] min-[970px]:text-white/45"
          />
        </div>

        <div className="flex min-w-0 items-end min-[970px]:min-h-[112px] min-[970px]:items-center">
          <p className="max-w-[24rem] text-[14px] leading-5 text-white/72 min-[970px]:text-left min-[970px]:text-[15px] min-[970px]:leading-6">
            {description}
          </p>
        </div>
      </div>
    </button>
  )
}
