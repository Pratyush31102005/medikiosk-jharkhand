# MediKiosk · Jharkhand

A phone-friendly SIH 2026 patient intake prototype. On desktop it appears inside a phone frame.

## Live prototype

[Open MediKiosk](https://pratyush31102005.github.io/medikiosk-jharkhand/)

## Try it

1. Choose Hindi, English, Bengali or Odia, then choose Patient.
2. Start a visit and give consent to use sample information. Enable voice input and automatic questions to try spoken intake.
3. Select a demo doctor. Enter or speak a sample name, age, village and symptoms.
4. Review the answers, save the record, and keep the generated patient ID.
5. Switch to Doctor. Use `DOC-101` or `DOC-102` to open the corresponding demo queue, find a patient ID and review the visit.

Questions follow predefined symptom branches, including abdominal pain, cough, fever, headache and joint pain. Answers such as vomiting or phlegm open related follow-up questions. Summaries use a fixed template; this is not a diagnostic AI.

Records stay in browser storage on the current device and site address. They do not sync between devices or between this site and the earlier hosted prototype. Use fictional information only. Doctor IDs demonstrate record filtering and are not secure authentication. Speech input and read-aloud availability depend on browser permissions, language support and installed voices. The browser's speech provider may process audio online; the app does not save recordings.

## Local development

Requires Node.js 24 and npm.

```sh
npm ci
npm run build:pages
npm run preview:pages
```

The GitHub Pages build uses the existing patient interface through a standalone React entry point. It writes static output to `dist-pages`. The original `npm run build` command still builds the previous server-hosted version.

## Tests and deployment

```sh
npm run test:pages
```

The `main` branch contains source code. The `gh-pages` branch contains the tested static build and a `.nojekyll` file. Repository Settings → Pages publishes the root of `gh-pages`. To publish an update, run the tests and `npm run build:pages`, then commit the contents of `dist-pages` to `gh-pages`. Relative asset paths allow the prototype to load from the repository subdirectory.
