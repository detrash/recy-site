export const APP_NAV_LINKS = {
  ADMIN_PANEL: '/admin',
  APP: '/dashboard',
  ONBOARDING: '/onboarding',
  PROFILE: '/profile',
  SUBMIT_FORM: '/submit',
};

export const APP_HEADER_LINKS = [
  { name: 'Dashboard', href: APP_NAV_LINKS.APP, key: 'dashboard' },
  {
    name: 'Submit Form',
    href: APP_NAV_LINKS.SUBMIT_FORM,
    isRecyclerOrWasteAccess: true,
    key: 'submit_form',
  },
  {
    name: 'Admin',
    href: APP_NAV_LINKS.ADMIN_PANEL,
    isAdminAccess: true,
    key: 'admin_panel',
  },
];
