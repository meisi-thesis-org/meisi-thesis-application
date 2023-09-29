type Locale = 'PT' | 'EN';
type Theme = 'DARK' | 'LIGHT';

type OpenRoute =
    '/sign-in' |
    '/sign-up' |
    '/refresh-access-code';

type ClosedRoute = '/dashboard';

type Route = OpenRoute | ClosedRoute;

export type { Locale, Theme, Route, OpenRoute, ClosedRoute };
