import { z } from 'zod';

// Raw config values from environment
const rawConfig = {
  apiUrl: import.meta.env.VITE_API_URL,
  appMode: import.meta.env.VITE_APP_MODE,
  appName: import.meta.env.VITE_APP_NAME,
  appVersion: import.meta.env.VITE_APP_VERSION,
  authSecret: import.meta.env.VITE_AUTH_SECRET, // fixed typo here
};

// Schema to validate the environment variables
const configSchema = z.object({
  apiUrl: z.string().url(),
  appMode: z.enum(['development', 'production']),
  appName: z.string(),
  appVersion: z.string(),
  authSecret: z.string(),
});

// Validate the config
const parsed = configSchema.safeParse(rawConfig);

if (!parsed.success) {
  console.error('❌ Invalid configuration:', parsed.error.format());
  throw new Error('Invalid configuration');
}

export const config = parsed.data;
