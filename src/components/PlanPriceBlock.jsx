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
  priceClassName = '',
  fullPriceClassName = '',
  className = '',
}) {
  return (
    <div className={`mt-1 flex flex-col items-center ${className}`}>
      <p className={`text-[30px] font-bold leading-none tracking-tight ${priceClassName}`}>
        {formatPrice(price)}
      </p>

      <p className={`mt-1 text-[13px] leading-none line-through ${fullPriceClassName}`}>
        {formatPrice(fullPrice)}
      </p>
    </div>
  )
}
