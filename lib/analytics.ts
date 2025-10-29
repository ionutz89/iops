/**
 * Analytics tracking utility
 * Provides a centralized way to track user interactions
 */

export interface TrackingEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}

/**
 * Track an event (can be extended to integrate with GA4, PostHog, etc.)
 * @param eventName - The name of the event to track
 * @param properties - Additional properties for the event
 */
export function track(eventName: string, properties?: Record<string, string | number | boolean>): void {
  // For now, log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventName, properties);
  }

  // Google Analytics 4 integration (if gtag is available)
  if (typeof window !== 'undefined') {
    const windowWithGtag = window as Window & { gtag?: (...args: unknown[]) => void };
    if (windowWithGtag.gtag) {
      windowWithGtag.gtag('event', eventName, properties);
    }
  }

  // Can add other analytics providers here (PostHog, Mixpanel, etc.)
  // Example: posthog.capture(eventName, properties);
}

/**
 * Track CTA clicks with standardized properties
 */
export function trackCTAClick(label: string, location?: string): void {
  track('cta_click', {
    label,
    location: location || 'unknown',
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track form submissions
 */
export function trackFormSubmit(formName: string, success: boolean): void {
  track('form_submit', {
    form_name: formName,
    success,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track page section views
 */
export function trackSectionView(sectionName: string): void {
  track('section_view', {
    section: sectionName,
    timestamp: new Date().toISOString(),
  });
}

