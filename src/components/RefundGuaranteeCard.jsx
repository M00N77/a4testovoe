import {
  REFUND_GUARANTEE_BADGE,
  REFUND_GUARANTEE_TEXT,
} from './refundGuaranteeContent.js'

export default function RefundGuaranteeCard({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-6 w-full rounded-[24px] border border-white/10 bg-[#2C3233] px-4 py-4 text-left shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition-colors hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#81FE95] focus-visible:ring-offset-2 focus-visible:ring-offset-[#232829] md:mt-8 md:px-5 md:py-5 lg:rounded-[26px]"
    >
      <span className="inline-flex items-center rounded-full border border-[#81FE95]/30 px-3 py-1.5 text-[11px] font-medium leading-none tracking-[0.01em] text-[#81FE95] md:px-3.5 md:text-[13px]">
        {REFUND_GUARANTEE_BADGE}
      </span>

      <p className="mt-3 max-w-[58rem] text-[13px] leading-[1.55] text-white/78 md:mt-4 md:text-[14px] md:leading-6">
        {REFUND_GUARANTEE_TEXT}
      </p>
    </button>
  )
}
