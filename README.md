# Everyday — Product Catalog

A clean, responsive product catalog built with **React, TypeScript, and Chakra UI**. Browse products, explore their details, find items using search and filters, and share feedback through a simple form.

## Live Demo

**[Open Everyday Product Catalog](https://product-catalog-six-phi.vercel.app/)**

Browse the deployed application on desktop or mobile.

## Features

- **Product catalog** — Browse products in a responsive card grid.
- **Product details** — Open any card to view its image, description, price, category, and rating.
- **Search** — Find products by title with case-insensitive matching.
- **Category filtering** — Narrow the collection to a selected category.
- **Sorting** — Use the original order, price ascending or descending, or highest rating.
- **Combined controls** — Apply search, category, and sorting together, with a clear/reset option.
- **Feedback** — Submit your name, rating, and message, then revisit saved submissions.
- **Persistent submissions** — Keep feedback after a page refresh using localStorage.
- **Loading and error states** — Loading placeholders, retry actions, empty results, and not-found pages.
- **Responsive layouts** — Consistent navigation and layouts across mobile and desktop screens.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React 19 | Component-based user interface |
| TypeScript | Strict typing for components, state, and API data |
| Chakra UI v3 | Components, styling, and responsive layouts |
| Redux Toolkit + React Redux | Shared product and feedback state |
| React Router | Client-side routing |
| Vite | Development server and production builds |
| Fake Store API | Product data |
| localStorage | Feedback persistence |

## Getting Started

### Prerequisites

- Node.js **22.12 or newer**
- npm

### Installation

Clone or download this repository, then run the following commands from the project root:

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal, usually `http://localhost:5173`.

No API key or environment variables are required.

### Production Build

```bash
npm run build
npm run preview
```

The build command checks TypeScript and generates the production files in `dist/`. The preview command serves that build locally.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Check TypeScript and create a production build |
| `npm run preview` | Preview the production build locally |

## Pages and Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/products` | Product catalog with search, filtering, and sorting |
| `/products/:id` | Product details |
| `/feedback` | Feedback submission form |
| `/feedbacks` | Saved feedback, newest first |
| `*` | Page not found |

Product detail URLs support direct visits and page refreshes. Invalid or missing product IDs display a product-not-found screen.

## Project Structure

```text
src/
  app/
    store.ts                  Redux store and feedback persistence
    hooks.ts                  Typed Redux hooks

  components/
    AppLayout.tsx             Shared page layout
    Navbar.tsx                Navigation

  features/
    products/
      product.types.ts        Product and catalog types
      productsApi.ts          API request and response validation
      productsSlice.ts        Product data and request status
      productUtils.ts         Search, filter, sort, and price formatting
      ProductCard.tsx         Clickable product card
      ProductControls.tsx     Search and dropdown controls

    feedback/
      feedback.types.ts       Feedback types
      feedbackSlice.ts        Submitted feedback state
      feedbackStorage.ts      localStorage helpers

  pages/
    HomePage.tsx
    ProductsPage.tsx
    ProductDetailsPage.tsx
    FeedbackPage.tsx
    SavedFeedbackPage.tsx
    NotFoundPage.tsx

  App.tsx                     Routes
  main.tsx                    Application providers and entry point
  index.css                   Global and navigation styles

vercel.json                    Vercel routing configuration
```

## State and Data Flow

**Redux** stores the product list, request status, API errors, and submitted feedback. The catalog and detail pages share the same product data. Opening a detail URL directly loads the collection when needed.

**Local component state** manages search text, category and sort selections, unsubmitted form fields, and validation errors. The displayed product list is calculated from the original products and current controls, so searching and sorting do not require additional API requests.

**Feedback persistence** runs through a store subscription. Saved entries initialize the feedback state when the app starts. Corrupted saved data is handled safely, and unsuccessful storage writes display a message.

## API

Products are fetched from [Fake Store API](https://fakestoreapi.com):

```text
GET https://fakestoreapi.com/products
```

The application uses each product's ID, title, description, image, category, price, and rating. Product availability depends on the external API; failed requests display a retry action.

## Feedback Storage

Feedback is saved under the localStorage key `catalog-feedback-v1`. Each entry contains a generated ID, name, rating, message, and submission timestamp.

Saved entries are available in the same browser profile and site origin. Clearing browser site data removes them. The application is frontend-only and does not send feedback to a server.

## Deployment

The application is deployed on **Vercel** from its GitHub repository.

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Production branch | `main` |

The root-level `vercel.json` configures the fallback for React Router routes:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This serves the app for direct visits and refreshes on routes such as `/products/1`. Updates pushed to the connected production branch trigger a new deployment.
