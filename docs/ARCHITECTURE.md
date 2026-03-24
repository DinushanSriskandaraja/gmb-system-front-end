# Architecture & A-Z Instructions

## 1. System Architecture Overview
The GMB Curtain and Blind Management System is a modern web application built on the Next.js App Router paradigm.

### Tech Stack
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Context (for global UI state like sidebar expansion) and localized Component State.
- **Form Handling**: React Hook Form with Zod validation (planned).

## 2. Directory Structure
```
/app
  /customers      # Customer Management
  /jobs           # Job Tracking and Pipeline
  /measurements   # Window/Door Measurement Sheets
  /quotations     # Quote Generation and Costing
  /stocks         # Inventory
  /paperworks     # General Invoices and Documents
  layout.tsx      # Global Navbar/Sidebar
  page.tsx        # Dashboard
/components
  /ui             # Reusable primitive atomic components (Buttons, Inputs, Cards)
  /layout         # Sidebar, Header, Page Wrappers
  /shared         # Domain-specific components used across pages (e.g., CustomerSelect)
/lib              # Utility functions (formatting, calculations)
/types            # Global TypeScript definitions
/docs             # Project rules and instructions
```

## 3. Load Balancing & Performance Strategies
Although "load balancing" traditionally refers to backend servers, in the context of a frontend application, we achieve similar performance distribution through:
1. **Code Splitting**: Next.js automatically splits code by route.
2. **Lazy Loading**: Use `import dynamic from 'next/dynamic'` for component chunks that are not immediately visible (e.g., modals, heavy charts, PDF generators).
3. **Image Optimization**: Use `next/image` to automatically compress and resize images, saving bandwidth.
4. **Debouncing**: Ensure search inputs and resize events are debounced to prevent rendering strain.

## 4. A-Z Integration Instructions
### Step 1: Component Building
Always check `/components/ui` first. If a basic element (like a robust Table) doesn't exist, build it generically before implementing specific domain logic.

### Step 2: Page Implementation
Create a subfolder in `/app`. Example: `/app/jobs/page.tsx`. Use the standard `PageHeader` and `PageContainer` components layout defined in `RULES.md`.

### Step 3: Extending Features
If you need to alter the app later:
- **Adding a new Module**: Create a new route in `/app`. Add navigation link in the `Sidebar` component.
- **Adding new Fields to Forms**: Update the TypeScript interface in `/types`, update the Zod schema, and add the new input field matching the aesthetic of existing forms.

## 5. Deployment Pre-flight
- Run `npm run build` to verify there are no type errors and chunk sizes are minimal (green/yellow warnings in Next build process).
- Revisit this document periodically to log any new architectural patterns adopted.
