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

### server/utils/sixhat.ts

Replace the [OpenAI Assistant ID](https://platform.openai.com/assistants)

```Diff
const getAssistantId = (hat: SixHats) => {
  switch(hat) {
+    case SixHats.BlackHat: return "asst_US...";
+    case SixHats.BlueHat: return "asst_GG...";
+    case SixHats.GreenHat: return "asst_vI...";
+    case SixHats.RedHat: return "asst_Oa...";
+    case SixHats.WhiteHat: return "asst_hq...";
+    case SixHats.YellowHat: return "asst_RI...";
-    case SixHats.BlackHat: return "<<ASSISTANT_ID_BLACKHAT>>";
-    case SixHats.BlueHat: return "<<ASSISTANT_ID_BLUEHAT>>";
-    case SixHats.GreenHat: return "<<ASSISTANT_ID_GREENHAT>>";
-    case SixHats.RedHat: return "<<ASSISTANT_ID_REDHAT>>";
-    case SixHats.WhiteHat: return "<<ASSISTANT_ID_WHITEHAT>>";
-    case SixHats.YellowHat: return "<<ASSISTANT_ID_YELLOWHAT>>";
  }
};
```

### Ignore git tracking

```bash
git update-index --skip-worktree nuxt.config.ts
git update-index --skip-worktree server/utils/sixhat.ts
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
