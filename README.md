# lab_qa

## 1. E2E тестування

**Проєкт:** [practicesoftwaretesting.com](https://practicesoftwaretesting.com/)

**Фреймворк:** [Playwright](https://playwright.dev/)

**Патерн:** Page Object Model

### Схема сторінок (Page Objects)

```
HomePage
ProductPage
LoginPage
ContactPage
CategoryPage
RegisterPage
MyAccountPage
CheckoutPage         (одна сторінка з покроковим інтерфейсом)
 ├─ CartPage
 ├─ PaymentPage
 └─ ConfirmationPage
```

### Тестові дані

- Email: `customer@practicesoftwaretesting.com`
- Пароль: `welcome01`

### Тест-кейси

| Test case       | Опис                                          | Prerequisites                   | Test steps                                                                                               | Expected Result                                                                                                                        |
| --------------- | --------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Тест кейс 1** | Логін з правильними даними                    | Користувач на головній сторінці | 1. Відкрити сторінку Login<br>2. Ввести email<br>3. Ввести пароль<br>4. Натиснути Login                  | Користувач успішно залогінився і відкрилась сторінка акаунту                                                                           |
| **Тест кейс 3** | Перегляд товарів за категорією та сортуванням | Користувач на головній сторінці | 1. Відкрити категорію "Hand Tools"<br>2. Застосувати сортування "Name (Z-A)"<br>3. Перевірити результати | 1) Показані товари належать лише до категорії "Hand Tools"<br>2) Після сортування назви товарів йдуть в зворотному алфавітному порядку |

---

## 2. AI agents tests

browser-use

**модель**: `gemini-flash-lite-latest`

Після того як було додано до Login_Promt: Якщо після завантаження сторінки виявиться, що користувач вже залогінений (видно ім'я користувача в меню замість "Sign in"). спочатку розлогінься (Sign out), а потім виконай кроки логіну заново з нуля.

це викликало такий результат при прогоні login тесту:

```bash
INFO     [Agent] ✅ Task completed successfully

INFO     [Agent]
⚠️  Agent reported success but judge thinks task failed

⚖️  Judge Verdict: ❌ FAIL

   Failure Reason: The agent failed to correctly handle the initial state and engaged in a repetitive, erratic loop of logging in and out instead of following the requested procedure. It did not demonstrate logical decision-making, performing unnecessary manual navigations and multiple redundant login attempts.
   The agent failed to follow the instructions effectively. The task required the agent to check if the user was logged in and, if so, sign out before performing the login steps. Instead, the agent attempted to click 'Sign in' while the user was already logged in (as seen in the first screenshot). Following this, the agent engaged in an erratic and repetitive loop of logging in, navigating to the account page, signing out, and logging in again, rather than performing the task in a single, logical flow. The agent also performed unnecessary manual navigations. While the agent eventually reached the 'My account' page, the execution was highly inefficient, confusing, and failed to demonstrate proper state management or adherence to the provided instructions.
```

тому змінила рядок на: Спочатку одноразово перевір верхнє меню: якщо там видно посилання "Sign in": переходь одразу до кроку 1. Якщо замість цього видно ім'я користувача (наприклад, "Jane Doe") — це означає, що сесія вже залогінена; тоді один раз розлогінься через це меню (Sign out) і після цього продовжуй з кроку 1. Не повертайся до цієї перевірки повторно пізніше в задачі
