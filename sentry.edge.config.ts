// This file configures the initialization of Sentry for edge features (middleware, edge routes, etc.)
// See docs: https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// Only initialize Sentry in production
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    // DSN is automatically configured by Vercel integration
    dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || "",
    
    // Adjust this value in production
    tracesSampleRate: 1.0,
    
    // Setting this option to true will print useful information to the console
    debug: false,
    
    // Ignore non-application errors
    ignoreErrors: [
      "ECONNREFUSED",
      "ENOTFOUND",
      "ETIMEDOUT",
    ],
  });
}