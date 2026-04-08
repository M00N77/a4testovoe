export default function PlanDiscountBadge({ discountPercent, className = '' }) {
  if (!Number.isFinite(discountPercent) || discountPercent <= 0) {
    return null
  }

  return (
      <span
          className={`absolute left-4 top-0 inline-flex min-h-[32px] items-center rounded-b-[16px] bg-[#FF5A57] px-3 py-1.5 text-[13px] font-semibold leading-none text-white md:left-5 md:min-h-[36px] md:px-3.5 md:py-2 md:text-[15px] ${className}`}
      >
      -{discountPercent}%
    </span>
  )
}