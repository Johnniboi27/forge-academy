# Forge Academy

Forge Academy is a professional online education app for advanced math, physics, and mechanical engineering learners. It provides a structured pathway from mathematical foundations to engineering design, with lecture pages, practice sets, formula references, notes, and progress tracking.

Forge Academy uses MIT OpenCourseWare as its source/reference layer. Course pages link to relevant OCW source materials, and generated Forge lessons/practice sets are original summaries and exercises designed around those references rather than copied OCW content.

## Features

- Dark academic engineering interface with burgundy accents
- Course catalog for math, physics, and mechanical engineering
- Dynamic course pages with modules, lectures, outcomes, and prerequisites
- Lecture pages with explanations, equations, examples, engineering notes, and notes
- Practice sets after every lecture with hints, solutions, scoring, retries, and mastery
- Local progress dashboard with streaks, weak topics, course progress, and downloads
- Search across courses, lectures, formulas, and practice problems
- Searchable and printable formula library
- Visual engineering pathway roadmap
- Review mistakes page powered by saved practice results
- MIT OpenCourseWare source cards on course and lecture pages
- Dedicated MIT OCW source library at `/sources`

## MIT OpenCourseWare Sources

MIT OpenCourseWare course pages are linked from `src/data/ocwSources.ts`. These links are used for attribution and source navigation. MIT OCW materials are generally offered under CC BY-NC-SA 4.0 unless a specific OCW page says otherwise. This project is not endorsed by MIT, and it does not use MIT logos or trademarks.

Examples of linked source courses include:

- MIT OCW 18.01SC Single Variable Calculus
- MIT OCW 8.01SC Classical Mechanics
- MIT OCW 2.001 Mechanics & Materials I
- MIT OCW 2.003SC Engineering Dynamics
- MIT OCW 2.06 Fluid Dynamics
- MIT OCW 2.72 Elements of Mechanical Design
- MIT OCW RES.16-002 How to CAD Almost Anything

## Tech Stack

- Next.js
- TypeScript
- React
- Tailwind CSS
- LocalStorage for first-version progress persistence

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deploy on GitHub Pages

This project is configured for GitHub Pages static hosting. Build the static site, publish the `out/` directory to a `gh-pages` branch, and enable Pages with source set to the `gh-pages` branch.

Expected public URL for a normal project repository:

```text
https://YOUR_GITHUB_USERNAME.github.io/forge-academy/
```

Expected public URL for a user or organization Pages repository named `YOUR_GITHUB_USERNAME.github.io`:

```text
https://YOUR_GITHUB_USERNAME.github.io/
```

For a repository named `forge-academy`, build with:

```bash
NEXT_PUBLIC_BASE_PATH=/forge-academy npm run build:pages
```

Then publish the generated `out/` directory to the `gh-pages` branch and set GitHub Pages to serve from `gh-pages` at `/`.

## Add New Courses

Course content lives in `src/data/courses.ts`. Add a course entry to `catalogDefinitions`, then optionally add a custom module blueprint to `customBlueprints`. Each module should contain lecture titles. Lecture content and practice problems are generated into structured objects so the app can expand without changing page code.

To attach MIT OCW source materials, add an entry in `src/data/ocwSources.ts` under `ocwSourceByCourseTitle`. Include the OCW course number, title, URL, resource types, and a short note explaining how the source maps to the Forge course.

## Progress Storage

Progress is saved in the browser with LocalStorage under `forge-academy-progress-v1`. The saved state includes completed lectures, practice scores, mastered practice sets, notes by lecture ID, last opened course, missed problems, and practice streak metadata.
