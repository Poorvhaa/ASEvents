# AS Events — Development Workflow Guidelines

This document outlines the guidelines and workflow protocols to ensure a stable local development environment.

## Concurrency Prevention

### Rule: Never run `npm run dev` and `npm run build` simultaneously.
Both commands read/write generated files under the `.next` directory. Running them concurrently will cause Webpack/Turbopack manifest locks, corrupted compilation caches, and `ENOENT` crashes.

### Workflow before running a Production Build:
1. **Stop the development server** by pressing `Ctrl + C` in the terminal hosting `npm run dev`.
2. Wait for the node process to exit completely.
3. Run the production build:
   ```bash
   npm run build
   ```
4. Once the build finishes successfully, you can restart development if needed:
   ```bash
   npm run dev
   ```

## Development and Cache Cleaning Scripts

We have configured safe, lock-aware scripts to manage cache clearance:
* **Start Dev Server (Turbopack)**:
  ```bash
  npm run dev
  ```
* **Start Dev Server (Webpack fallback)**:
  ```bash
  npm run dev:webpack
  ```
* **Type-check Source Files**:
  ```bash
  npm run type-check
  ```
* **Clean Next.js Build Cache Safely**:
  ```bash
  npm run clean
  ```
* **Reset Dev Cache & node_modules/.cache**:
  ```bash
  npm run reset:dev
  ```

*Note: The `clean` and `reset:dev` scripts will automatically refuse to run if they detect an active development server, avoiding concurrent folder deletions.*
