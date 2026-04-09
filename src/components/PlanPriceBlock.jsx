function formatPrice(value) {
  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return '0 Р'
  }

  return `${numericValue} Р`
}

export default function PlanPriceBlock({
  price,
  fullPrice,
  isDiscountActive = true,
  priceClassName = '',
  fullPriceClassName = '',
  className = '',
}) {
  const displayPrice = isDiscountActive ? price : fullPrice

  return (
    <div className={`mt-1 flex flex-col items-center ${className}`}>
      <p className={`text-[30px] font-bold leading-none tracking-tight transition-[color,transform,opacity] duration-200 ${priceClassName}`}>
        {formatPrice(displayPrice)}
      </p>

      <p
        className={`mt-1 text-[13px] leading-none line-through transition-[opacity,transform,max-height,margin] duration-200 ${
          isDiscountActive
            ? 'max-h-10 opacity-100 translate-y-0'
            : 'pointer-events-none -translate-y-1 max-h-0 opacity-0'
        } ${fullPriceClassName}`}
        aria-hidden={!isDiscountActive}
      >
        {formatPrice(fullPrice)}
      </p>
    </div>
  )
}
