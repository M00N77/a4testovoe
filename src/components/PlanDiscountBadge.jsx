export default function PlanDiscountBadge({
  discountPercent,
  isVisible = true,
  className = '',
}) {
  if (!Number.isFinite(discountPercent) || discountPercent <= 0) {
    return null
  }

  return (
    <span
      className={`absolute left-4 top-0 inline-flex min-h-[32px] items-center rounded-b-[16px] bg-[#FF5A57] px-3 py-1.5 text-[13px] font-semibold leading-none text-white transition-[opacity,transform] duration-200 md:left-5 md:min-h-[36px] md:px-3.5 md:py-2 md:text-[15px] ${
        isVisible ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-1'
      } ${className}`}
      aria-hidden={!isVisible}
    >
      -{discountPercent}%
    </span>
  )
}
