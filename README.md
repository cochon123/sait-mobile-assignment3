# Form Validation Lab — Expo + React Hook Form + Zod

Mobile app demonstrating professional form development with schema-based
validation, built for the **Advanced Form Development and Validation with
React Hook Form & Zod** assignment (Expo).

## Features

- **Employee Information form** — 5 fields (full name, email, phone, postal
  code, department) with format validation (email, Canadian postal code,
  `XXX-XXX-XXXX` phone), required fields, and min/max length checks.
- **Sign-In form** — email + password with secure-text toggle and on-blur
  validation.
- **Sign-Up form** — full name, email, password (with strength meter and
  upper/lower/number rules), and a confirm-password match check.
- **Reusable components** — `FormInput`, `FormPicker`, `PrimaryButton`, and
  `SuccessBanner` with focus styling, error states (border + text + tinted
  background), and disabled/enabled button feedback.
- **Stack navigation** with a Home screen that links to each form, plus
  cross-links between the auth screens.

## Tech stack

- [Expo](https://expo.dev) + React Native (TypeScript)
- [React Hook Form](https://react-hook-form.com) for form state management
- [Zod](https://zod.dev) for schema-based validation
- [`@hookform/resolvers`](https://github.com/react-hook-form/resolvers) to
  bridge Zod with React Hook Form
- [Expo Router](https://docs.expo.dev/router/introduction) for file-based
  Stack navigation

## Project structure

```
src/
  app/                    # Expo Router screens (file-based routing)
    _layout.tsx           # Root Stack navigator + theme provider
    index.tsx             # Home screen with links to each form
    employee.tsx          # Employee Information form
    sign-in.tsx           # Sign-In form
    sign-up.tsx           # Sign-Up form
  components/
    form/                 # Reusable form primitives
      form-input.tsx
      form-picker.tsx
      primary-button.tsx
      success-banner.tsx
    themed-text.tsx       # Theme-aware text
    themed-view.tsx       # Theme-aware view
  schemas/                # Zod schemas (one per form)
    employee-schema.ts
    sign-in-schema.ts
    sign-up-schema.ts
  constants/theme.ts      # Colors, spacing, fonts
  hooks/                  # useTheme, useColorScheme
```

## Getting started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npm start
   ```

3. Open in
   - [Expo Go](https://expo.dev/go) on your device (scan the QR code), or
   - an Android emulator (`a` in the terminal), or
   - the web build (`w` in the terminal).

## Validation UX

All forms use `mode: 'onTouched'` so validation runs after the first blur
and then on every change — giving users quick feedback without nagging on
the very first keystroke. The submit button stays disabled until the form
is valid, with a clearly different style in the disabled state.
