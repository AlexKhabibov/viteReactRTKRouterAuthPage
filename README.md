База проекта

* 1. Анализ требований
* 2. Анализ Figma
* 3. Создание Vite + React + TS
* 4. Настройка alias
* 5. FSD-структура
* 6. React Router

Auth

* 7. Auth Layout
* 8. Login
* 9. Signup
* 10. Forgot Password
* 11. Reset Password
* 12. Social Auth
* 13. Auth API
* 14. Access Token
* 15. Refresh Token
* 16. Protected Routes

Dashboard

* 17. Dashboard Layout
* 18. Header
* 19. Sidebar
* 20. Footer
* 21. Navigation
* 22. Sidebar collapse
* 23. Mobile drawer
* 24. Dashboard responsive

Profile

* 25. Profile View
* 26. Profile completion
* 27. Personal Information
* 28. About
* 29. Skills
* 30. Profile Edit
* 31. Profile Tabs
* 32. Multi-step navigation
* 33. Profile responsive

API / State

* 34. baseApi
* 35. getProfile
* 36. getSkills
* 37. getSpecializations
* 38. updateUser
* 39. updateProfile
* 40. RTK Query tags
* 41. User slice
* 42. Profile slice
* 43. localStorage persistence

Avatar

* 44. Upload
* 45. Preview
* 46. Click to upload
* 47. Drag & Drop
* 48. Delete
* 49. Header synchronization

Profile UX

* 50. Long About text
* 51. Expand / Collapse
* 52. Показывать Expand только если текст реально длинный
* 53. Финальная полировка Profile UX

Admin

* 54. Roles
* 55. Admin Protected Routes
* 56. Admin Layout
* 57. Admin Sidebar
* 58. Admin Header
* 59. Specializations List
* 60. Specialization Details
* 61. Create Specialization
* 62. Edit Specialization
* 63. Delete Specialization
* 64. Search
* 65. Filters
* 66. Pagination
* 67. Skills ↔ Specializations

Forms / UX

* 68. Общая валидация
* 69. Loading states
* 70. Error states
* 71. Empty states
* 72. Success states
* 73. Edge cases
* 74. Общие UI-компоненты

Качество

* 75. API cleanup
* 76. Redux cleanup
* 77. FSD cleanup
* 78. Security review
* 79. Performance review
* 80. Accessibility
* 81. Error Boundary
* 82. Полный responsive pass
* 83. Финальный рефакторинг
* 84. npm run build
* 85. Финальный production checklist


Исправление багов:

[16.09.2026 21:17] Денис: Формы профиля затирают данные друг друга

каждая вкладка выполняет полный PUT /profiles/{id}, но отправляет только знакомую ей часть профиля. Все три запроса содержат:

socialNetwork: []

Сохранение описания или навыков поэтому может удалить социальные ссылки. Аналогично каждая форма повторно отправляет описание, специализацию и навыки из потенциально устаревшего profile.

В персональной форме сначала сохраняется пользователь, затем профиль. Если второй запрос упадёт, сервер останется частично обновлённым.

Лучше перед PUT нужно собирать полный актуальный DTO, явно сохранять существующие поля и после частичного сбоя делать refetch с понятным сообщением пользователю. А по хорошему дифы патчем отправлять, но надо бэк смотреть

Данные предыдущего пользователя переживают logout

logout удаляет только access token. appState и RTK Query cache не очищаются. При быстром входе другим аккаунтом UI может:

- подставить старые email, телефон и соцсети напртмер

UI видит только первые 10 специализаций и навыков

Оба запроса отправляются без пагинации. На момент проверки API возвращает:

- специализации: 10 из 31;
- навыки: 10 из 68.

Лучше параметризовать RTK Query endpoint через page, limit, search; для текущего значения уметь получать сущность по ID. Для выбора большого справочника лучше пагинируемый autocomplete, а не загрузка одной случайной страницы.

Auth lifecycle не доведён до конца

Каждый одновременный 401 запускает собственный refresh. При провале refresh токен удаляется из localStorage, но React об этом не узнаёт: защищённая страница останется открытой до следующей навигации или перезагрузки.

Logout при сетевой ошибке тоже не удаляет локальную сессию, то есть пользователь может не суметь выйти.

[16.09.2026 21:17] Денис: В остальном молодец, хорошо

### **План исправления**

**1. Сначала зафиксировать текущую модель данных**

- Разделить данные `user` и `profile`.
- Определить, какие поля принадлежат `/users/{id}`, а какие `/profiles/{id}`.
- Отдельно определить локальные поля, которые backend пока не возвращает.
- Составить единый актуальный `ProfileDTO` для PUT.

**2. Исправить сохранение профиля**

Главная проблема сейчас — три формы считают себя владельцами всего `profile`.

Сделаем:

- единый источник актуального profile;
- перед `PUT` собираем **полный DTO**;
- форма меняет только свои поля;
- остальные поля берём из актуального profile;
- `socialNetwork` больше не будет случайно превращаться в `[]`;
- после успешного PUT обновляем/инвалидируем profile cache.

**3. Разобраться с частичным сохранением Personal Info**
Сейчас:

```
PATCH /users/{id}
       ↓
PUT /profiles/{id}
```

Если второй запрос падает:

```
user → сохранён
profile → не сохранён
```

Сделаем как минимум:

- понятную обработку ошибки второго запроса;
- refetch актуальных данных;
- сообщение пользователю о частичном сохранении.

А отдельно проверим API: если backend поддерживает PATCH для profile — можно будет перейти на диффы.

**4. Исправить logout**

Logout должен очищать локальную сессию **независимо от результата запроса**:

```
logout request
     ↓
локально очищаем:
- access token
- user/profile state
- appState
- RTK Query cache
     ↓
переводим приложение в unauthenticated state
```

Даже если `/logout` вернул network error, пользователь должен выйти локально.

**5. Исправить состояние после refresh**
Сейчас проблема:

```
401
 ↓
refresh
 ↓
refresh failed
 ↓
removeAccessToken()
 ↓
React ничего не знает
```

Нужно связать потерю авторизации с React/Redux состоянием:

```
refresh failed
      ↓
clear session
      ↓
Redux auth state
      ↓
ProtectedRoute
      ↓
/auth/login
```

**6. Сделать единый refresh при нескольких 401**
Сейчас:

```
request A → 401 → refresh A
request B → 401 → refresh B
request C → 401 → refresh C
```

Нужно:

```
request A ─┐
request B ─┼→ один refresh
request C ─┘
              ↓
        новый access token
              ↓
        повторяем запросы
```

То есть нужен механизм `mutex`/очереди вокруг refresh.

**7. Исправить справочники специализаций и навыков**

Сейчас UI получает только:

```
specializations: 10 / 31
skills:          10 / 68
```

Сделаем RTK Query API с параметрами:

```tsx
page
limit
search
```

И отдельно возможность получить конкретную сущность по `id`.

**8. Переделать выбор специализации/навыков**

Не загружать все 31/68 записей заранее.

Для выбора использовать:

```
input
  ↓
search
  ↓
debounce
  ↓
GET /specializations?page=...&limit=...&title=...
```

То же для skills.

Для уже выбранного `id` — уметь получить конкретную сущность.

**9. Проверить RTK Query cache после auth-событий**
После:

- login;
- logout;
- refresh failure;
- смены пользователя

не должно оставаться данных предыдущего аккаунта.

Особенно проверить:

```
profile
user
specializations
skills
```

**10. Финальный проход**

После исправлений проверить сценарии:

```
User A login
 ↓
profile
 ↓
edit About
 ↓
edit Skills
 ↓
edit Personal Info
 ↓
logout
 ↓
User B login
 ↓
проверка отсутствия данных User A
```

И отдельно:

```
несколько запросов → 401
→ один refresh
→ запросы продолжаются
```

и:

```
refresh failed
→ session cleared
→ redirect login
```


```
1. Модель данных profile/user
        ↓
2. Единый DTO для PUT /profiles/{id}
        ↓
3. Исправление трёх форм
        ↓
4. Частичное сохранение Personal Info
        ↓
5. Logout + очистка state/cache
        ↓
6. Refresh lifecycle
        ↓
7. Mutex для одновременных 401
        ↓
8. Пагинация специализаций
        ↓
9. Пагинация навыков
        ↓
10. Autocomplete
        ↓
11. Финальное тестирование всех сценариев
```