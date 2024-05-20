# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Dependencies install

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Setup

Replace the placeholder

### nuxt.config.ts

Replace the [OpenAI API Key](https://platform.openai.com/api-keys)

```Diff
runtimeConfig: {
+  openai_apikey: "<<YOUR OPENAI API KEY>>"
-  openai_apikey: "sk-lBTs...",
},
```

### Ignore git tracking

```bash
git update-index --skip-worktree nuxt.config.ts
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
