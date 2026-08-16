import { breakpoints, type Breakpoint } from '@stellix/ui-tokens';

export function getBreakpoint(width: number): Breakpoint {
  if (width >= breakpoints.bigScreen.min) return 'bigScreen';
  if (width >= breakpoints.web.min) return 'web';
  if (width >= breakpoints.tablet.min) return 'tablet';
  return 'mobile';
}

export function responsiveValue<T>(
  breakpoint: Breakpoint,
  values: Partial<Record<Breakpoint, T>> & { mobile: T },
): T {
  const order: Breakpoint[] = ['bigScreen', 'web', 'tablet', 'mobile'];
  const startIdx = order.indexOf(breakpoint);
  for (let i = startIdx; i < order.length; i++) {
    if (values[order[i]] !== undefined) return values[order[i]]!;
  }
  return values.mobile;
}
