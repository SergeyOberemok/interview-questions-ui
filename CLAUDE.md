# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Vue 3 (Composition API, `<script setup>`) single-page app for managing and reviewing interview questions. Uses Vite, Pinia for state, Vue Router, Tailwind CSS 4, Flowbite components, and a Socket.IO client for the live "assessment" (quiz) flow. The backend API/websocket server lives outside this repo; the dev server proxies `/api` to `http://localhost:3000` and the socket client connects to `ws://localhost:5000`.

## Commands

```sh
npm install                # install deps

npm run dev                # start Vite dev server (proxies /api -> localhost:3000)
npm run build               # production build
npm run preview             # preview the production build

npm run test:unit           # run Vitest unit tests
npx vitest run path/to/file.spec.js   # run a single unit test file
npx vitest path/to/file.spec.js       # watch a single unit test file

npx playwright test         # run e2e tests (see e2e/, playwright.config.js); starts its own vite dev server
npx playwright test e2e/vue.spec.js   # run a single e2e test file

npm run lint                 # oxlint --fix then eslint --fix (run-s lint:oxlint lint:eslint)
npm run format                # prettier --write src/

npm run storybook            # Storybook dev server on port 6006
npm run build-storybook      # build static Storybook
```

Env vars are read from `.env` (`VITE_TITLE`, `WS_URL`, and `VITE_ASSESSMENT_QUANTITY` used in `Assessment.vue`); see `.example.env` for the template.

Path alias `@` maps to `src/` (configured in both `vite.config.js` and `jsconfig.json`).

## Architecture

Feature folders under `src/features/<feature>/` generally follow a layered pattern — keep this pattern when adding features:

- `repositories/*.repository.js` — talks to the REST API via the shared `HttpRepository` (`src/common/repositories/http.repository.js`, thin `fetch` wrapper with `get`/`post`/`put`/`delete`), maps raw JSON into a model class.
- `models/*.model.js` — plain classes representing domain entities (e.g. `Question`, `Label`).
- `services/*.service.js` or `<feature>.service.js` — orchestrates repository calls and Pinia store updates; components should call services/stores rather than repositories directly.
- `components/` — split into `edit/` (create/update forms) and `view/` (read-only display) subfolders, e.g. `src/features/questions/components/edit` vs `.../view`.
- Stories: co-located `*.stories.js` files next to the component they document (Storybook, `@storybook/vue3-vite`).

State (`src/stores/*.store.js`) uses Pinia's setup-store syntax (`defineStore('name', () => { ... })`) with `ref`/`shallowRef`/`computed`, exposing plain functions instead of `actions`/`getters` objects. Stores often instantiate a service directly (e.g. `assessment.store.js` creates `new AssessmentService()`) rather than having the component own the service.

The **assessment (quiz) flow** is real-time over Socket.IO rather than REST: `src/socket.js` creates the shared `io()` client, `AssessmentService` (`src/features/assessment/assessment.service.js`) wraps `socket.emit`/`socket.on` calls (`start`, `end`, `question` with a `direction` of `next`/`prev`, `answer`, `goal`) in promises, and `assessment.store.js` binds to the `end` event via `bindEvents()`. The store also caches per-question state in a `history` map keyed by question id (so revisiting a question via `prevQuestion`/`nextQuestion` restores its prior goal/answer instead of re-fetching) and exposes `resultsWithAnswers` (results joined with the recorded answer from `history`). `src/features/sockets/*` handles connection state UI separately.

Each assessment question renders through a small factory/plugin system rather than one hardcoded UI: `Assessment.vue` renders `InqueryWrapper.vue` (`src/features/inqueries/inquiry-wrapper/`), which passes `question.type` into `InqueryFactory.vue`, which looks up the concrete answer-input component via `createInqueryComponent(type)` (`inquery-component.factory.js`) — currently `'calculation'` → `SwipeForImageAnswer` and `'equation'` → `PutMissingInOrder` (both under `src/features/inqueries/`). Add a new question type by adding a case to that factory and a new component. These feature-level inquiry components compose generic, reusable UI primitives from `src/common/components/inqueries/` (`DragOneFromMany`, `EquationWithVariable`, `LeftRightSwipe`, `ProbableAnswer`) — keep that split: feature-specific answer/scoring logic lives under `features/inqueries/`, generic interaction widgets live under `common/components/inqueries/`.

The **questions list flow** is plain REST via `QuestionsRepository` → `QuestionsService` → `questions.store.js`, with separate stores for paging (`questions-paging.store.js`) and search (`questions-searching.store.js`) that `QuestionsService` reads from directly.

Routes (`src/router/index.js`) are mostly eagerly imported except `assessment`, `dev`, and `about`, which are lazy-loaded via dynamic `import()`.

Shared/reusable UI primitives (not feature-specific) live in `src/common/components/`, each in its own subfolder (e.g. `stepper/`, `search/`, `quantity-select/`, `number-image/`, `inqueries/`); feature-specific components live under `src/features/<feature>/components/`.

## Linting

ESLint config (`eslint.config.js`) composes `eslint-plugin-vue` (flat/essential), `oxlint` (via `eslint-plugin-oxlint`, config in `.oxlintrc.json`), `@vitest/eslint-plugin` (scoped to `src/**/__tests__/*`), `eslint-plugin-storybook`, and `eslint-config-prettier` to disable formatting-related rules (Prettier owns formatting). `npm run lint` runs oxlint before eslint, both with `--fix`.
