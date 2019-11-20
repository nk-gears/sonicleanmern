import Cookies from 'universal-cookie';

export const tokenName = 'jwtToken';
export const dealerIdName = 'dealerid';
export const userIdName = 'userId';

export const getToken = () => {
  const cookies = new Cookies();
  return cookies.get(tokenName);
};

export const getDealerId = () => {
  const cookies = new Cookies();
  return cookies.get(dealerIdName);
};

export const getUserId = () => {
  const cookies = new Cookies();
  return cookies.get(userIdName);
};

export const setToken = (token, created, ttl, dealerId) => {
  const cookies = new Cookies();
  cookies.set(tokenName, token, { maxAge: ttl });
  cookies.set(dealerIdName, dealerId);
};

export const setDealerId = dealerId => {
  const cookies = new Cookies();
  cookies.set(dealerIdName, dealerId);
};

export const setUserId = userId => {
  const cookies = new Cookies();
  cookies.set(userIdName, userId);
};

export const removeToken = () => {
  const cookies = new Cookies();
  cookies.remove(tokenName);
  cookies.remove(dealerIdName);
  cookies.remove(userIdName);
};
