require('dotenv').config();
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Load the system prompt once at startup
const SYSTEM_PROMPT = fs.readFileSync(
  path.join(__dirname, 'systemPrompt.txt'),
  'utf-8'
);

// Initialise the Anthropic client — it reads ANTHROPIC_API_KEY from .env automatically
const client = new Anthropic();

// ─── Chat endpoint ────────────────────────────────────────────────────────────
// The frontend sends the full conversation history each time.
// We pass it straight to Claude and return the reply.
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  // Basic validation
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages,
    });

    const reply = response.content[0].text;
    res.json({ reply });

  } catch (error) {
    console.error('Anthropic API error:', error.message);

    // Give a helpful error message depending on what went wrong
    if (error.status === 401) {
      res.status(401).json({ error: 'Invalid API key. Check your .env file.' });
    } else if (error.status === 429) {
      res.status(429).json({ error: 'Rate limit hit. Wait a moment and try again.' });
    } else {
      res.status(500).json({ error: 'Something went wrong. Check the server logs.' });
    }
  }
});

// ─── Start server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n  Welfare Agent running at http://localhost:${PORT}`);
  console.log(`  Press Ctrl+C to stop\n`);
});
