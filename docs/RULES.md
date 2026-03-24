# Project Setup and Rules (GMB Curtain and Blind)

## 1. Core Philosophy
- **Less is More**: Keep component files small. Abstract repetitive logic into custom hooks (`/hooks`) and UI elements into reusable components (`/components/ui`).
- **High Performance ("Load Balancing" for Frontend)**: Utilize Next.js route segmenting and `next/dynamic` for heavy client components to split bundles and balance client-side load.
- **Maintainability**: Strict adherence to TypeScript interfaces. Keep business logic separate from UI rendering.

## 2. Theming & Styling
- **Engine**: Tailwind CSS.
- **Theme Concept**: Premium, modern, and clean. Use a primary color (e.g., slate/blue or brand-specific), with plenty of whitespace, rounded corners (e.g., `rounded-xl`), and subtle glassmorphism or shadows for depth.
- **Typography**: Modern sans-serif (Inter or similar).
- **Animations**: Use framer-motion or Tailwind utility transitions for micro-animations on hover and state changes.

## 3. Page Structure Components
Every major page should follow this structure to maintain consistency:
1. **`PageContainer`**: The outermost wrapper dictating max-width and internal padding.
2. **`PageHeader`**: Contains the Title, Breadcrumbs, and primary actions (e.g., "Add New Customer" button).
3. **`PageContent`**: The core work area. Often split into a `DataGrid` (tables), `KanbanBoard`, or `FormLayout`.
4. **`SlideOver` / `Modal`**: Use overlays for adding/editing entities instead of routing to new pages, to keep the user in the context of their workflow.

## 4. Coding Standard Rules
- **No Inline Styles**: All styling must be via Tailwind classes.
- **Client vs. Server Components**: Default to Server Components. Add `"use client"` ONLY when state (`useState`), effects (`useEffect`), or DOM event listeners are absolutely necessary (e.g., complex forms, interactive tables).
- **Type Safety**: No `any`. Define interfaces in `/types`.

## 5. Maintenance Protocol
- Whenever a new feature is requested, update `ARCHITECTURE_AND_INSTRUCTIONS.md`.
- Before adding a new third-party library, evaluate if the requirement can be met with native APIs or existing dependencies to keep bundle sizes small.
