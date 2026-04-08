export default function OfferNote({ className = '' }) {
  return (
    <div className={`rounded-[22px] border border-white/8 bg-[#2B3132] px-4 py-3 text-white/80 shadow-[0_10px_24px_rgba(0,0,0,0.12)] md:px-5 md:py-3.5 ${className}`}>
      <div className="flex items-start gap-3">
        <span className="shrink-0 text-[18px] font-semibold leading-none text-[#FDB056] md:text-[20px]">
          !
        </span>

        <p className="max-w-[42rem] text-[13px] leading-5 md:text-[14px] md:leading-6">
          Следуя плану на 3 месяца и более, люди получают в 2 раза лучший
          результат, чем за 1 месяц
        </p>
      </div>
    </div>
  )
}
