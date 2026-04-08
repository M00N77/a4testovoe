import { useId } from 'react'

export default function ConsentBlock({
  checked,
  onChange,
  privacyPolicyHref = '#',
}) {
  const consentId = useId()

  const handlePrivacyClick = (event) => {
    if (privacyPolicyHref === '#') {
      event.preventDefault()
    }
  }

  return (
    <div className="mt-4 text-white/80 md:mt-5">
      <div className="flex items-start gap-3 text-left">
        <div className="relative mt-0.5 shrink-0">
          <input
            id={consentId}
            type="checkbox"
            checked={checked}
            onChange={(event) => onChange(event.target.checked)}
            className="peer sr-only"
          />

          <label
            htmlFor={consentId}
            className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-[6px] border border-white/30 bg-transparent transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#FDB056] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#232829] peer-checked:border-[#FDB056] peer-checked:bg-[#FDB056] peer-checked:text-[#232829]"
            aria-label="Согласие с офертой рекуррентных платежей"
          >
            <span className={`text-[12px] font-bold leading-none ${checked ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
              ✓
            </span>
          </label>
        </div>

        <p className="text-[13px] leading-5 md:text-[14px] md:leading-6">
          <label htmlFor={consentId} className="cursor-pointer">
            Я согласен с офертой рекуррентных платежей
          </label>{' '}
          и{' '}
          <a
            href={privacyPolicyHref}
            className="font-medium text-white underline underline-offset-2"
            onClick={handlePrivacyClick}
            target={privacyPolicyHref === '#' ? undefined : '_blank'}
            rel={privacyPolicyHref === '#' ? undefined : 'noreferrer'}
          >
            Политикой конфиденциальности
          </a>
        </p>
      </div>
    </div>
  )
}
