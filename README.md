# Welfare Agent — Irish Elderly Assistant

A simple conversational AI that helps elderly Irish people navigate MySocialWelfare.ie and MyGovID.

---

## What this does

- Walks users through MyGovID setup
- Guides state pension applications
- Helps apply for Fuel Allowance and Household Benefits Package
- Speaks in warm, plain Irish English
- Remembers the full conversation while the page is open

---

## Setup — step by step

### Step 1: Install Node.js (if you don't have it)

Go to https://nodejs.org and download the LTS version. Install it.
Check it worked by opening your terminal and typing:
```
node --version
```
You should see a version number like `v20.x.x`

---

### Step 2: Get your Anthropic API key

1. Go to https://console.anthropic.com
2. Sign up or log in
3. Go to "API Keys" in the left menu
4. Click "Create Key" and copy the key — it starts with `sk-ant-`

---

### Step 3: Create your .env file

In the project folder, copy the example file:
```
cp .env.example .env
```

Open `.env` in any text editor (Notepad, TextEdit, VS Code) and replace
`your_api_key_here` with your actual key:
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
```

Save the file. Do NOT share this file or put it on GitHub.

---

### Step 4: Install dependencies

In your terminal, navigate to this folder and run:
```
npm install
```

This installs Express (the web server) and the Anthropic SDK.

---

### Step 5: Start the server

```
npm start
```

You should see:
```
  Welfare Agent running at http://localhost:3000
```

---

### Step 6: Open the app

Open your browser and go to:
```
http://localhost:3000
```

You'll see the chat interface. Type a message or click one of the quick-start buttons.

---

## Development mode (auto-restart on file changes)

```
npm run dev
```

This uses Node's built-in `--watch` flag — the server restarts automatically
whenever you save a file, so you don't have to stop and restart manually.

---

## Project structure

```
welfare-agent/
  src/
    server.js          ← Express server + Claude API call
    systemPrompt.txt   ← The agent's instructions and personality
  public/
    index.html         ← The chat UI (HTML, CSS, JavaScript — one file)
  .env                 ← Your API key (never commit this)
  .env.example         ← Template for .env
  package.json         ← Project config and dependencies
  README.md            ← This file
```

---

## Customising the agent

The agent's behaviour is almost entirely controlled by `src/systemPrompt.txt`.
Change the tone, add new facts, restrict or expand what it helps with — all by
editing that file. Restart the server after saving changes.

---

## Next steps to add

- [ ] Voice input (Web Speech API — one JS event listener)
- [ ] Text-to-speech output (SpeechSynthesis API — one line of JS)
- [ ] Save conversation history across sessions (localStorage or a database)
- [ ] Family dashboard (separate page showing conversation summaries)
- [ ] Deploy online (Railway, Render, or Fly.io — all have free tiers)
