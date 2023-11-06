import { useCookies } from '@vueuse/integrations/useCookies'

const TokenKey = "token";
const RootTokenKey = "RootToken"
const cookie = useCookies();

// 获取token
export function getToken() {
    return cookie.get(TokenKey);
}
//  获取管理员token
export function getRootToken() {
    return cookie.get(RootTokenKey);
}

// 设置token
export function setToken(token) {
    return cookie.set(TokenKey, token);
}
// 设置管理员token以区分普通用户
export function setRootToken(token) {
    return cookie.set(RootTokenKey, token)
}

// 清除token
export function removeToken() {
    return cookie.remove(TokenKey) || cookie.remove(RootTokenKey);
}