export const routes = [
  /** Landing Journey */
  { path: '/', component: import('./journeys/landing/landing.component.vue') },

  /** Authentication Journey */
  { path: '/sign-in', component: async () => await import('./journeys/authentication/sign-in/sign-in.component.vue') },
  { path: '/sign-up', component: async () => await import('./journeys/authentication/sign-up/sign-up.component.vue') },
  { path: '/recover-access-code', component: async () => await import('./journeys/authentication/recover-access-code/recover-access-code.component.vue') }
]
