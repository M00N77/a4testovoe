import promoImageDesktop from '../img/design-desktop.png'
import promoImageMobile375 from '../img/design-mobile-375.png'
import promoImageMobile320 from '../img/design-mobile-320.png'

export default function PromoImage() {
  return (
    <div className="flex w-full justify-center min-[970px]:h-full min-[970px]:justify-start">
      <div className="relative w-full max-w-[210px] shrink-0 min-[970px]:flex min-[970px]:h-full min-[970px]:max-w-[300px] min-[970px]:items-end xl:max-w-[420px]">
        <picture className="block w-full min-[970px]:flex min-[970px]:h-full min-[970px]:items-end">
          <source media="(max-width: 320px)" srcSet={promoImageMobile320} />
          <source media="(max-width: 375px)" srcSet={promoImageMobile375} />
          <img
            className="block h-auto w-full object-contain min-[970px]:h-full min-[970px]:w-auto min-[970px]:max-w-full"
            src={promoImageDesktop}
            alt="Тренер в спортивной форме в промо-карточке тарифов"
          />
        </picture>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-[#23282900] via-[#232829b8] to-[#232829] sm:h-28 min-[970px]:h-32"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-[#232829] blur-xl sm:h-12 min-[970px]:h-14"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
