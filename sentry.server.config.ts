// This file configures the initialization of Sentry on the server side
// See docs: https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// Only initialize Sentry in production
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    // DSN is automatically configured by Vercel integration
    dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || "",
    
    // Adjust this value in production
    tracesSampleRate: 1.0,
    
    // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: process.env.NODE_ENV === 'development',
    
    // Setting this option to true will print useful information to the console
    debug: false,
    
    // Ignore non-application errors
    ignoreErrors: [
      "ECONNREFUSED",
      "ENOTFOUND",
      "ETIMEDOUT",
      "Request aborted",
    ],
    
    beforeSend(event, hint) {
      // Don't send events in development
      if (process.env.NODE_ENV === 'development') {
        return null;
      }
      
      // Filter out specific API errors that are expected
      if (event.request?.url?.includes('/api/contact') && 
          event.extra?.status === 429) {
        // Don't report rate limiting as errors
        return null;
      }
      
      return event;
    },
  });
}