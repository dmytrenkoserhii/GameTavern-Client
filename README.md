# GameTavern Client

## 🎮 Overview
GameTavern is a modern web application for gamers to discover, organize, and share their gaming experiences. This repository contains the client-side code of the GameTavern platform.

## 🛠️ Tech Stack
- **Core**: React, TypeScript
- **State Management**: 
  - React Query
  - Zod for schema validation
- **UI & Styling**: 
  - Mantine UI
  - CSS Modules
- **Features & Utils**:
  - DND Kit for drag-and-drop functionality
  - i18next for internationalization
  - Axios for HTTP requests
  - React Router DOM for routing
  - Recharts for data visualization
  - Day.js & Luxon for date handling
- **Development Tools**:
  - Vite
  - Storybook for component documentation
  - Jest & Testing Library for testing
  - ESLint & Prettier for code quality
  - Husky & lint-staged for git hooks
  - Commitizen for standardized commits
- **Package Manager**: pnpm

## 🚦 Getting Started

### Installation
1. Clone the repository:
```bash
git clone https://github.com/dmytrenkoserhii/GameTavern-Client.git
cd GameTavern-Client
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
pnpm dev
