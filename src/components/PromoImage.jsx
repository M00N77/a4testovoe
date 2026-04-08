import promoImageDesktop from '../img/design-desktop.png'
import promoImageMobile375 from '../img/design-mobile-375.png'
import promoImageMobile320 from '../img/design-mobile-320.png'

export default function PromoImage() {
  return (
    <div className="flex w-full justify-center min-[970px]:h-full min-[970px]:justify-start">
      <picture className="block w-full max-w-[210px] shrink-0 min-[970px]:flex min-[970px]:h-full min-[970px]:max-w-[300px] min-[970px]:items-end xl:max-w-[420px]">
        <source media="(max-width: 320px)" srcSet={promoImageMobile320} />
        <source media="(max-width: 375px)" srcSet={promoImageMobile375} />
        <img
          className="block h-auto w-full object-contain min-[970px]:h-full min-[970px]:w-auto min-[970px]:max-w-full"
          src={promoImageDesktop}
          alt="Тренер в спортивной форме в промо-карточке тарифов"
        />
      </picture>
    </div>
  )
}
