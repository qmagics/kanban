import request from "@/utils/request";

/**
 * 用户登录 
 * @param data 
 */
export function login(data: { Account: string, Password: string, Token?: string }) {
    return request({
        url: '/api/login',
        method: 'post',
        data
    })
}

/**
 * 获取登录用户信息
 */
export function getInfo() {
    return request({
        url: '/api/profile',
        method: 'get',
    })
}


/**
 * 登出
 */
export function logout() {
    return request({
        url: '/api/login',
        method: 'delete'
    })
}