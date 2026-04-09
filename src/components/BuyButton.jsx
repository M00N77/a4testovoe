export default function BuyButton({
  disabled = false,
  hasError = false,
  onClick,
  selectedPlan,
  children = 'Купить',
  type = 'button',
}) {
  return (
    <button
      type={type}
      onClick={() => onClick?.(selectedPlan)}
      disabled={disabled}
      aria-disabled={disabled}
      aria-invalid={hasError}
      aria-label={selectedPlan ? `Купить тариф ${selectedPlan.title}` : children}
      className={`mt-4 w-full rounded-[18px] border px-5 py-3 text-center text-[16px] font-semibold transition-[background-color,border-color,box-shadow,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#232829] md:mt-5 md:py-4 md:text-[18px] ${
        disabled
          ? 'cursor-not-allowed border-white/10 bg-[#C78C4A]/45 text-white/70'
          : hasError
            ? 'cursor-pointer border-[#EF4444] bg-[#7f1d1d] text-white shadow-[0_0_0_3px_rgba(239,68,68,0.2)] focus-visible:ring-[#EF4444]'
            : 'cursor-pointer border-transparent bg-[#FDB056] text-white hover:bg-[#f7a442] focus-visible:ring-[#FDB056]'
      }`}
    >
      {children}
    </button>
  )
}
