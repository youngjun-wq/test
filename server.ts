import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory game state with disk backup so server reloads preserve GM settings
const DATA_DIR = path.resolve(process.cwd(), '.data');
const STATE_FILE = path.join(DATA_DIR, 'game_state.json');

interface GameState {
  phaseVisibility: Record<string, boolean>;
  currentPhaseIndex: number;
  lastUpdated: number;
}

const DEFAULT_PHASE_VISIBILITY: Record<string, boolean> = {
  phase_0_opening: true,
  phase_1_travel: true,
  phase_2_intro: false,
  phase_3_interlude1: false,
  phase_4_talk2: false,
  phase_5_interlude2: false,
  phase_6_investigate3: false,
  phase_7_talk3: false,
  phase_8_interlude3: false,
  phase_9_investigate4: false,
  phase_10_talk4: false,
  phase_11_council: false,
  phase_12_deduction: false,
  phase_13_ending: false,
};

let gameState: GameState = {
  phaseVisibility: { ...DEFAULT_PHASE_VISIBILITY },
  currentPhaseIndex: 0,
  lastUpdated: Date.now(),
};

// Try to load persisted state if exists
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (fs.existsSync(STATE_FILE)) {
    const raw = fs.readFileSync(STATE_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    gameState = {
      phaseVisibility: { ...DEFAULT_PHASE_VISIBILITY, ...parsed.phaseVisibility, phase_0_opening: true },
      currentPhaseIndex: typeof parsed.currentPhaseIndex === 'number' ? parsed.currentPhaseIndex : 0,
      lastUpdated: parsed.lastUpdated || Date.now(),
    };
  }
} catch (e) {
  console.error('Failed to load persisted game state:', e);
}

function persistState() {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(gameState, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to save game state to disk:', e);
  }
}

// SSE clients for real-time push to all devices
const sseClients: Response[] = [];

function broadcastState() {
  const payload = `data: ${JSON.stringify(gameState)}\n\n`;
  for (let i = sseClients.length - 1; i >= 0; i--) {
    const client = sseClients[i];
    try {
      client.write(payload);
    } catch {
      sseClients.splice(i, 1);
    }
  }
}

// CORS and caching middleware for multi-device & mobile compatibility
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// API Routes
app.get('/api/game-state', (_req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.json(gameState);
});

app.post('/api/game-state/phase', (req: Request, res: Response) => {
  const { phaseVisibility, currentPhaseIndex } = req.body;
  if (phaseVisibility && typeof phaseVisibility === 'object') {
    gameState.phaseVisibility = {
      ...gameState.phaseVisibility,
      ...phaseVisibility,
      phase_0_opening: true, // Always unlocked
    };
  }
  if (typeof currentPhaseIndex === 'number') {
    gameState.currentPhaseIndex = currentPhaseIndex;
  }
  gameState.lastUpdated = Date.now();
  persistState();
  broadcastState();
  res.json({ success: true, gameState });
});

app.post('/api/game-state/reset', (_req: Request, res: Response) => {
  gameState = {
    phaseVisibility: { ...DEFAULT_PHASE_VISIBILITY },
    currentPhaseIndex: 0,
    lastUpdated: Date.now(),
  };
  persistState();
  broadcastState();
  res.json({ success: true, gameState });
});

// SSE endpoint for instant real-time sync across all connected player devices
app.get('/api/game-state/stream', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // Crucial for nginx/Cloud Run reverse proxies!
  if (typeof (res as any).flushHeaders === 'function') {
    (res as any).flushHeaders();
  }

  // Send initial state immediately
  res.write(`data: ${JSON.stringify(gameState)}\n\n`);
  sseClients.push(res);

  // Send periodic keep-alive ping every 15s to prevent mobile carriers/gateways from dropping the connection
  const keepAliveTimer = setInterval(() => {
    try {
      res.write(': keepalive-ping\n\n');
    } catch {
      clearInterval(keepAliveTimer);
    }
  }, 15000);

  req.on('close', () => {
    clearInterval(keepAliveTimer);
    const idx = sseClients.indexOf(res);
    if (idx !== -1) sseClients.splice(idx, 1);
  });
});

// Vite Middleware Integration
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd && fs.existsSync('dist')) {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Boardbang Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
