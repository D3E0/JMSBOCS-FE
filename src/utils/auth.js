import Cookies from 'js-cookie'

const TokenKey = 'JMSBOCS-Token';

export function getToken() {
    console.info(Cookies.get());
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token, {expires: 7})
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
