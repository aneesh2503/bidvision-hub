
// Admin authentication service

const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem('adminAuthenticated') === 'true';
};

const adminLogout = (): void => {
  localStorage.removeItem('adminAuthenticated');
};

export const adminAuthService = {
  isAdminAuthenticated,
  adminLogout
};
