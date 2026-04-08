import { useEffect } from 'react'

import {
  REFUND_GUARANTEE_TEXT,
  REFUND_GUARANTEE_TITLE,
} from './refundGuaranteeContent.js'

export default function RefundGuaranteeModal({ open = false, onClose }) {
  useEffect(() => {
    if (!open || typeof document === 'undefined') {
      return undefined
    }

    const { body } = document
    const previousOverflow = body.style.overflow
    body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 px-4 py-4 md:py-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="mx-auto flex min-h-full w-full max-w-[560px] items-end justify-center md:items-center"
      >
        <div
          className="w-full max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[24px] border border-white/10 bg-[#2B3132] p-5 text-white shadow-[0_24px_60px_rgba(0,0,0,0.35)] md:max-h-[calc(100vh-3rem)] md:p-6"
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="refund-guarantee-title"
          aria-describedby="refund-guarantee-description"
        >
          <div className="flex items-start justify-between gap-4">
            <h2
              id="refund-guarantee-title"
              className="text-[22px] font-semibold leading-tight text-white md:text-[26px]"
            >
              {REFUND_GUARANTEE_TITLE}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-[14px] text-white/70 transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#81FE95] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2B3132]"
            >
              Закрыть
            </button>
          </div>

          <p
            id="refund-guarantee-description"
            className="mt-4 text-[14px] leading-6 text-white/80 md:text-[15px] md:leading-7"
          >
            {REFUND_GUARANTEE_TEXT}
          </p>
        </div>
      </div>
    </div>
  )
}
