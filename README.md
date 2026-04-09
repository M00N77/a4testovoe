# Promo Tariff Landing
[Demo](https://gym-landing-bice.vercel.app/)
Адаптивное frontend-приложение на React + Vite для выбора тарифа с акцентом на promo UI, предсказуемый responsive layout и чистую пользовательскую логику.

## Что умеет проект

- Загружает тарифы с внешнего API и приводит их к UI-friendly формату.
- Показывает featured-тариф и обычные тарифные карточки в фиксированном порядке.
- Поддерживает выбор тарифа с сохранением активного состояния карточки.
- Показывает красный error-state на кнопке покупки, если пользователь пытается купить тариф без согласия.
- Показывает 2-минутный таймер с сохранением времени в `localStorage`.
- На последних 30 сек таймер мигает и подсвечивается красным.
- После окончания таймера скрывает скидки и оставляет только полные цены.
- Встраивает supporting-блоки: offer note, legal disclaimer и refund guarantee.
- Поддерживает mobile и desktop-like layout без хаотичного поведения на промежуточных ширинах.

## Стек

- React 19
- Vite 8
- JavaScript / JSX
- Tailwind CSS v4
- Vitest + Testing Library
- ESLint

## Скрипты

```bash
npm install
npm run dev
npm run test
npm run test:run
npm run lint
npm run build
npm run preview
```

## Архитектура

### Точка входа

- `src/main.jsx` монтирует приложение и подключает глобальные стили.
- `src/App.jsx` остается тонкой оболочкой и рендерит только `PromoCard`.

### Главный экран

- `src/components/PromoCard.jsx` собирает весь основной user flow:
  - `TimerBar`
  - `PromoImage`
  - `PlansGrid`
  - `OfferNote`
  - `ConsentBlock`
  - `BuyButton`
  - `LegalDisclaimer`
  - `RefundGuaranteeCard`

Именно здесь живет orchestration-логика экрана: какой тариф выбран, активна ли кнопка покупки и как компоненты собираются в единый layout.

## Как работает выбор тарифа

### `useSelectedPlan`

Файл: `src/hooks/useSelectedPlan.js`

Хук отвечает за:
- хранение списка загруженных тарифов,
- `selectedPlanId`,
- вычисление `selectedPlan`,
- fallback на featured/default тариф, если текущий выбор исчезает после повторной загрузки.

Это позволяет держать выбор тарифа вне UI-компонентов и не смешивать state-management с layout.

## Как загружаются и подготавливаются тарифы

### `useTariffs`

Файл: `src/hooks/useTariffs.js`

Хук делает следующее:
- запрашивает данные из `https://t-core.fit-hub.pro/Test/GetTariffs`,
- валидирует ответ,
- нормализует поля API,
- считает процент скидки,
- выделяет featured-тариф,
- сортирует обычные карточки в нужном порядке:
  - `3 месяца`
  - `1 месяц`
  - `1 неделя`
- возвращает состояния `isLoading` и `error`.

### `PlansGrid`

Файл: `src/components/PlansGrid.jsx`

Компонент рендерит:
- одну `FeaturedPlanCard` сверху,
- отдельную сетку обычных `PlanCard` снизу.

На mobile карточки идут в одну колонку, а с desktop-like breakpoint обычные тарифы выстраиваются в один ряд по три карточки.

## Тарифные карточки

- `src/components/FeaturedPlanCard.jsx` — выделенная карточка главного предложения.
- `src/components/PlanCard.jsx` — обычные тарифные карточки.
- `src/components/PlanPriceBlock.jsx` — общий блок текущей и старой цены.
- `src/components/PlanDiscountBadge.jsx` — badge со скидкой.

Сильная сторона этой части проекта — разнесение общего price UI и логики выбора без усложнения компонентной структуры.

Дополнительно карточки умеют переключаться между discount-state и regular-price-state в зависимости от состояния таймера.

## Таймер

### `usePersistentTimer`

Файл: `src/hooks/usePersistentTimer.js`

Хук:
- создает 2-минутный countdown,
- хранит время окончания в `localStorage`,
- восстанавливает состояние после перезагрузки страницы,
- в последние 30 секунд переводит таймер в danger-state,
- после окончания фиксируется в expired-state без автоперезапуска,
- возвращает готовое форматированное время, цвет таймера и статусные флаги.

### `TimerBar`

Файл: `src/components/TimerBar.jsx`

Использует `usePersistentTimer` и рендерит промо-таймер с визуальным акцентом и `aria-live` для более корректного обновления состояния.

На последних 30 сек таймер:
- становится красным,
- начинает мигать,
- остается закрепленным в верхней части страницы.

## Consent и покупка

### `ConsentBlock`

Файл: `src/components/ConsentBlock.jsx`

Блок согласия реализован через нормальный checkbox-flow:
- `input` + `label`,
- стабильная работа ссылки на политику конфиденциальности,
- корректное управление checked-state.

### `BuyButton`

Файл: `src/components/BuyButton.jsx`

Кнопка:
- получает выбранный тариф,
- показывает error-state, если пользователь нажимает купить без согласия,
- активна только при наличии выбранного тарифа,
- готова к подключению реального purchase handler.

## Supporting UI-блоки

### `OfferNote`

Файл: `src/components/OfferNote.jsx`

Поддерживающий информационный блок под тарифами. На desktop он встроен в layout так, чтобы визуально занимать ширину двух обычных карточек.

### `LegalDisclaimer`

Файл: `src/components/LegalDisclaimer.jsx`

Статичный юридический текст под кнопкой покупки.

### `RefundGuaranteeCard`

Файл: `src/components/RefundGuaranteeCard.jsx`

Информационный блок про гарантию возврата. После упрощения UI он остался статичным supporting-блоком без modal-сценария.

Контент вынесен в:

- `src/components/refundGuaranteeContent.js`

## Иллюстрация и responsive layout

### `PromoImage`

Файл: `src/components/PromoImage.jsx`

Блок с тренером:
- встроен в левую колонку layout,
- масштабируется от размера media-column,
- имеет плавный fade в цвет фонового контейнера,
- не обрывается резко по нижнему краю.

### Почему layout — сильная сторона проекта

Основной экран построен вокруг предсказуемой responsive-системы:
- promo image и тарифы перестраиваются синхронно,
- featured card и regular cards подчиняются одной общей композиции,
- правая колонка дает достаточно ширины для тарифов и supporting-блоков,
- layout рассчитан на промежуточные ширины, а не только на mobile/desktop крайности.

## Структура проекта

```text
src/
  App.jsx
  main.jsx
  index.css

  components/
    BuyButton.jsx
    ConsentBlock.jsx
    FeaturedPlanCard.jsx
    LegalDisclaimer.jsx
    OfferNote.jsx
    PlanCard.jsx
    PlanDiscountBadge.jsx
    PlanPriceBlock.jsx
    PlansGrid.jsx
    PromoCard.jsx
    PromoImage.jsx
    RefundGuaranteeCard.jsx
    TimerBar.jsx
    refundGuaranteeContent.js

  hooks/
    usePersistentTimer.js
    useSelectedPlan.js
    useTariffs.js

  test/
    setupTests.js
```

## Автотесты

В проекте настроены `Vitest` и `Testing Library`.

Что покрыто:
- `src/hooks/useSelectedPlan.test.jsx`
- `src/hooks/useTariffs.test.jsx`
- `src/hooks/usePersistentTimer.test.jsx`
- `src/components/PlansGrid.test.jsx`
- `src/components/PromoCard.test.jsx`

Тесты проверяют:
- выбор тарифа,
- fallback-логику,
- загрузку и сортировку тарифов,
- error/loading/empty states,
- таймер, его persistence и expired-state,
- базовый promo flow с consent и buy button,
- переключение основных UI-состояний после истечения таймера.

## Сильные стороны проекта

- Небольшая и понятная архитектура без лишнего усложнения.
- Ясное разделение между UI-компонентами и state/data hooks.
- Предсказуемый responsive layout для promo-сценария.
- Чистая логика выбора тарифа и подготовки API-данных.
- Таймер с persistence в `localStorage`, urgency-state и discount-expiration flow.
- Базовое автоматическое тестовое покрытие ключевой логики.
- Проект собирается, линтится и готов к деплою как обычный Vite SPA.

## Проверка проекта

Перед деплоем или сдачей можно прогнать:

```bash
npm run test:run
npm run lint
npm run build
```

## Деплой

Проект подходит для деплоя на Vercel как стандартное Vite-приложение.

Рекомендуемые настройки:
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

Если Vercel auto-detect сработает корректно, отдельный `vercel.json` не нужен.
