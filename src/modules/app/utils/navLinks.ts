export const APP_NAV_LINKS = {
  ADMIN_PANEL: '/app/admin',
  APP: '/app',
  ONBOARDING: '/app/onboarding',
  SUBMIT_FORM: '/app/submit',
};

export const APP_HEADER_LINKS = [
  { name: 'Dashboard', href: APP_NAV_LINKS.APP },
  { name: 'Submit Form', href: APP_NAV_LINKS.SUBMIT_FORM },
  { name: 'Admin', href: APP_NAV_LINKS.ADMIN_PANEL, isAdminAccess: true },
];
