export const getToken = () => localStorage.getItem('jwt');
export const hasToken = () => getToken() != null;
export const setToken = (token) => localStorage.setItem('jwt', token);
export const clearToken = () => localStorage.removeItem('jwt');
