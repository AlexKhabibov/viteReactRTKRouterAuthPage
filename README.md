Да. Сведу именно этапы разработки этого проекта, от старта до текущего состояния. Не буду расписывать каждую мелкую правку кода, а покажу последовательность, чтобы было понятно, что уже закрыто и что осталось.

Roadmap проекта

1. Базовая настройка проекта

Стек:

* React
* TypeScript
* Vite
* React Router
* Redux Toolkit
* RTK Query
* React Hook Form
* CSS Modules
* FSD-структура

Базовая структура:

src/
├── app/
│   ├── providers/
│   ├── router/
│   ├── store/
│   └── styles/
│
├── pages/
│
├── widgets/
│
├── features/
│
├── entities/
│
└── shared/
    ├── api/
    ├── lib/
    └── ui/

Статус: ✅

⸻

2. Настройка Router

Сделали маршрутизацию через createBrowserRouter.

Основные зоны:

/auth
/dashboard

Auth:

/auth/login
/auth/signup
/auth/forgot-password
/auth/reset-password

Dashboard:

/dashboard
/dashboard/profile
/dashboard/profile/edit

Также сделали защищённый маршрут:

ProtectedRoute
      ↓
DashboardLayout
      ↓
Outlet
      ↓
конкретная страница

Статус: ✅

⸻

3. Авторизация

Реализовали UI:

Login

* email
* password
* RHF
* валидация
* переход на регистрацию
* переход на восстановление пароля
* social auth

Signup

* username/nickname
* email
* password
* confirm password
* соглашения
* social auth

Forgot password

* email
* состояние отправки письма

Reset password

* новый пароль
* подтверждение пароля

Также сделали:

AuthLayout
    ├── AuthPromo
    └── AuthForm

Чтобы общая левая часть Login/Signup не дублировалась.

Статус: ✅

⸻

4. API / RTK Query

Настроили общий:

baseApi

На его основе подключили API-фичи.

Основной принцип:

baseApi
   ↓
injectEndpoints()
   ↓
конкретная feature

Например:

get-profile
get-skills
get-specializations
update-user
update-profile
logout

Разобрались с:

* builder.query
* builder.mutation
* providesTags
* invalidatesTags
* skipToken
* unwrap
* transformResponse
* onQueryStarted

Статус: ✅

⸻

5. Redux entities

Разделили данные пользователя и профессионального профиля.

entities/
├── user/
│   └── model/
│       ├── types.ts
│       └── userSlice.ts
│
└── profile/
    └── model/
        ├── types.ts
        └── profileSlice.ts

user

Сейчас локально хранятся:

email
phone

profile

Локально хранятся:

specialistLevel
socialNetworks

Причина:

если backend сейчас не предоставляет нормальный механизм чтения/изменения этих данных — временно держим их в Redux.

Статус: ✅

⸻

6. Persistence

Сделали:

Redux
  ↓
store.subscribe()
  ↓
localStorage

При старте:

localStorage
    ↓
loadState()
    ↓
preloadedState
    ↓
Redux

Таким образом локальные данные профиля не исчезают после перезагрузки.

Статус: ✅

⸻

7. Dashboard Layout

Создали общую структуру:

DashboardLayout
│
├── Header
│
├── Sidebar
│
├── main
│   └── Outlet
│
└── Footer

И добавили управление состоянием Sidebar:

isCollapsed

То есть Sidebar можно свернуть.

Статус: ✅

⸻

8. Sidebar

Создали навигацию:

Главная
Мой профиль
Обучение
Блог
Менторы
База знаний
Аналитика

Используем:

NavLink

Поэтому активный пункт определяется Router.

Также есть:

Поддержка
Выход

Сделали collapsed-состояние:

обычный:
[ icon ] Главная
[ icon ] Мой профиль
[ icon ] Обучение
collapsed:
[icon]
[icon]
[icon]

Сейчас как раз заменяем временные символы на реальные SVG из:

shared/ui/assets/icons/

Например:

import MainMenuIcon from "@/shared/ui/assets/icons/home.svg";

И:

<img src={item.icon} alt="" />

Статус: 🟡

Функционально готов, сейчас идёт работа с ассетами и адаптивностью.

⸻

9. Header

Header уже умеет:

* отображать логотип;
* переключать Sidebar;
* показывать настройки;
* показывать аватар пользователя;
* получать профиль через RTK Query.

Особенно важно:

PATCH avatar
      ↓
invalidate Profile
      ↓
getProfile
      ↓
Header получает новый avatarUrl

То есть аватар синхронизируется с Header.

Статус: 🟡

Функционально готов. Сейчас приводим UI к реальным ассетам и адаптиву.

⸻

10. Footer

Создали Footer:

Logo
Выбери, каким будет IT завтра...
Описание проекта
-------------------------
© YeaHub
Документы
Социальные сети

Используются реальные assets:

YeahubWhite
SocialIcons

И уже есть desktop/mobile CSS.

Статус: 🟡

Функционально и визуально готов, но адаптивность ещё нужно проверить вместе со всем Dashboard.

⸻

11. Profile View

Создали страницу:

/dashboard/profile

Структура:

ProfileView
│
├── ProfileCompletion
│
├── ViewPersonalInfo
│
├── ViewAbout
│
└── ViewSkills

Отображается:

Информация

* avatar
* username
* статус
* specialization
* specialist level
* location
* phone
* email
* social networks

About

Описание пользователя.

Skills

Выбранные навыки.

Profile completion

Расчёт:

заполненные поля
       /
все поля
       × 100

Статус: ✅

⸻

12. Profile Edit

Создали:

/dashboard/profile/edit

Основной компонент:

ProfileEditor

Внутри:

ProfileTabs
     ↓
┌───────────────────────────┐
│ Личная информация         │
│ Обо мне                   │
│ Навыки                    │
│ Проекты                   │
│ Опыт работы               │
│ Образование               │
└───────────────────────────┘

Рабочие вкладки:

1. Личная информация
2. Обо мне
3. Навыки

Пока неактивны:

4. Проекты
5. Опыт работы
6. Образование

Статус: 🟡

Основная функциональность есть.

⸻

13. Личная информация

Создали:

EditPersonalInfoForm

Работает:

Avatar

* загрузка файла;
* клик;
* drag & drop;
* preview;
* JPG/PNG/JPEG;
* ограничение 5 MB;
* удаление;
* отправка на backend;
* обновление Header.

Данные пользователя

Редактируем:

username
country
city
birthday
address

через:

PATCH /users/{id}

Локальные данные

Пока:

email
phone
specialistLevel
socialNetworks

хранятся в Redux + localStorage.

Social networks

Есть динамические поля:

VK
Instagram
Facebook
LinkedIn
Telegram
GitHub
WhatsApp

Статус: 🟡

Функционально почти закрыто. Сейчас основная задача — визуальная часть и адаптив.

⸻

14. About

Создали:

EditAboutForm

Получаем:

profile.profiles[0].description

Изменяем:

description

Отправляем:

PUT /profiles/{id}

Статус: ✅

⸻

15. Skills

Создали:

EditSkillsForm

Получаем:

GET /skills

Пользователь может:

выбрать навык
      ↓
добавить
      ↓
увидеть chip
      ↓
удалить

На backend отправляется:

profileSkills: string[]

Например:

["1", "2", "13"]

Статус: 🟡

Работает, стилизован.

Но сейчас есть небольшое архитектурное несоответствие:

EditSkillsForm
    └── Сохранить

а по дизайну должно быть:

ProfileEditor
    └── Далее

То есть позже надо объединить сохранение с общим переходом между шагами.

⸻

16. Backend data ownership

Мы отдельно разобрали, какие данные принадлежат каким endpoint’ам.

/users/{id}

username
country
city
birthday
address
avatar

/profiles/{id}

specializationId
markingWeight
description
image_src
profileSkills

Redux/localStorage

Пока:

email
phone
specialistLevel
socialNetwork

Это важный принцип проекта:

Backend умеет хранить → отправляем Backend
Backend пока не умеет → Redux + localStorage

Статус: ✅

⸻

17. Profile tags / cache

Настроили RTK Query invalidation для профиля.

Логика:

updateUser
     ↓
invalidatesTags
     ↓
getProfile
     ↓
новые данные

Это решило проблему, когда после изменения avatar требовалось вручную обновлять страницу.

Статус: ✅

⸻

18. Адаптивность

Это текущий большой этап.

Ты отдельно зафиксировал требование:

адаптив должен быть во всём приложении.

Поэтому не только Footer.

Нужно пройти:

Auth
↓
Dashboard
↓
Header
↓
Sidebar
↓
Profile View
↓
Profile Edit
↓
Forms
↓
Footer

И проверить:

Desktop
Tablet
Mobile

Особенно:

Dashboard

На маленьком экране:

Sidebar → collapsed / mobile
Header → компактный
main → занимает всю ширину

Profile

Карточки:

desktop:
avatar | информация
mobile:
avatar
информация

Forms

Desktop:

название | поля

Mobile:

название
описание
поля

Tabs

На мобильном их нельзя просто оставить в одну длинную строку.

Нужно решить поведение:

horizontal scroll

или другое соответствующее дизайну.

Статус: 🟡 ← текущий этап

⸻

19. UI polish

После адаптива:

цвета
шрифты
отступы
border-radius
тени
иконки
hover
focus
disabled

И главное — убрать временные:

☰
⚙️
👤
?
⌂
◉
▣
...

и использовать реальные assets.

Сейчас как раз этим занимаемся.

Статус: 🟡

⸻

