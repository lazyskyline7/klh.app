'use client';

import { trackEvent } from '@/lib/analytics';

export function useTrackClick(event: string, data?: Record<string, unknown>) {
  return () => trackEvent(event, data);
}

export default function TrackedLink({
  event,
  data,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  data?: Record<string, unknown>;
}) {
  return (
    <a onClick={() => trackEvent(event, data)} {...props}>
      {children}
    </a>
  );
}
