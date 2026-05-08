# Payment Gateway

A simple payment gateway simulation built with Next.js, React Hook Form, and Yup.
The app lets users submit card details, simulate payment outcomes (success, failed, timeout), and review transaction history in the same session.

## Features

- Payment form with validation for card holder name, card number, expiry date, CVV, and amount.
- Interactive debit card preview that updates live from form values.
- Simulated payment API with randomized outcomes:
  - success
  - failure
  - timeout
- Request timeout handling on client side using `AbortController`.
- Toast-style status notifications for payment results.
- In-memory transaction history context with latest transactions shown first.

## Routes

- `/` -> redirects to `/payment`
- `/payment` -> payment form and card preview UI
- `/transaction-history` -> list of transaction attempts
- `/api/pay` -> mock payment processing endpoint

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- React Hook Form + Yup
- Redux Toolkit and React Redux (installed dependencies)

## Project Structure

```txt
app/
  api/pay/route.ts
  components/
    CardPreview/
    CustomFilds/
      CardNumber/
      ExpirationDate/
    Header/
    PaymentForm/
    Toaster/
  context/transaction.tsx
  payment/page.tsx
  transaction-history/page.tsx
  validation/schema.ts
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run the development server

```bash
npm run dev
```

### 3) Open in browser

[http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run start` - run production build
- `npm run lint` - run ESLint

## Notes

- Transaction history is stored in React state (`TransactionProvider`) and resets on page reload.
- The mock API intentionally introduces random failures/timeouts for testing UI behavior.
