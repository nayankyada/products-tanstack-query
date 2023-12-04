## My Store

Brief description or introduction of the project.

## Project Structure

### `/public`

Static assets, public files, and the root HTML file.

### `/src`

Source code for the project.

#### `/src/app/(components)`

Reusable UI components that are shared across multiple pages or features. Wrapped into () because its exclude in app routing

#### `/src/app/***`

Pages of the application built with Next.js. Each `.tsx` or `.jsx` file in this directory represents a page.

#### `/src/hooks`

Custom React hooks that provide reusable functionality.

#### `/src/utils`

Utility functions and helper modules that are used across the application.

#### `/src/context`

React context providers and consumers.

#### `/src/types`

TypeScript type definitions for the project.

### `/utils/config`

Configuration files for tools, bundlers, etc.

## Getting Started

Instructions on how to set up and run the project locally.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
