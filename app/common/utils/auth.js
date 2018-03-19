export const getToken = () => localStorage.getItem('jwt');
export const setToken = (token) => localStorage.setItem('jwt', token);
export const clearToken = () => localStorage.removeItem('jwt');
export const hasToken = () => {
  let token;
  try {
    token = getToken();
  } catch (error) {
    // eslint-disable-next-line no-alert
    window.alert(
      'You appear to have LocalStorage disabled or you are in private browsing mode. KaniWani will not function correctly if it cannot store local data. Please enable LocalStorage and try again.'
    );
  }
  return token != null;
};
