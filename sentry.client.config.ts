// This file configures the initialization of Sentry on the client side
// See docs: https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// Only initialize Sentry in production
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    // DSN is automatically configured by Vercel integration
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN || "",
    
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1.0,
    
    // Setting this option to true will print useful information to the console while you're setting up Sentry
    debug: false,
    
    // Replay configuration for session recordings (optional) - DISABLED temporarily
    // replaysOnErrorSampleRate: 1.0,
    // replaysSessionSampleRate: 0.1,
    
    // You can remove this option if you're not planning to use the Sentry Session Replay feature
    // integrations: [
    //   Sentry.replayIntegration({
    //     // Mask all text and inputs for privacy
    //     maskAllText: true,
    //     blockAllMedia: true,
    //   }),
    // ],
    
    // Ignore common browser extension errors and non-app errors
    ignoreErrors: [
      // Browser extensions
      "top.GLOBALS",
      "ResizeObserver loop limit exceeded",
      "Non-Error promise rejection captured",
      // Network errors that are usually not app issues
      "Network request failed",
      "NetworkError",
      "Failed to fetch",
      // Safari specific
      "AbortError: Fetch is aborted",
    ],
    
    // Don't send errors from localhost
    beforeSend(event, hint) {
      // Filter out errors from browser extensions
      if (event.exception && event.exception.values) {
        const error = event.exception.values[0];
        if (error.stacktrace && error.stacktrace.frames) {
          const frames = error.stacktrace.frames;
          // Check if error comes from browser extension
          if (frames.some(frame => 
            frame.filename && (
              frame.filename.includes('chrome-extension://') ||
              frame.filename.includes('moz-extension://') ||
              frame.filename.includes('safari-extension://')
            )
          )) {
            return null; // Don't send to Sentry
          }
        }
      }
      
      return event;
    },
  });
}