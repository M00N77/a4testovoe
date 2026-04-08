export default function BuyButton({
  disabled = false,
  onClick,
  selectedPlan,
  children = 'Купить',
  type = 'button',
}) {
  return (
    <button
      type={type}
      onClick={() => {
        if (disabled) {
          return
        }

        onClick?.(selectedPlan)
      }}
      disabled={disabled}
      aria-label={selectedPlan ? `Купить тариф ${selectedPlan.title}` : children}
      className={`mt-4 w-full rounded-[18px] px-5 py-3 text-center text-[16px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB056] focus-visible:ring-offset-2 focus-visible:ring-offset-[#232829] md:mt-5 md:py-4 md:text-[18px] ${
        disabled
          ? 'cursor-not-allowed bg-[#C78C4A]/45 text-white/70'
          : 'cursor-pointer bg-[#FDB056] text-white hover:bg-[#f7a442]'
      }`}
    >
      {children}
    </button>
  )
}
