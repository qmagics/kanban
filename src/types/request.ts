/**
 * 请求状态
 */
export enum RequestState {
    /** 请求被取消 */
    REQUEST_CANCELED = "REQUEST_CANCELED"
}

/**
 * 带有abort方法的Promise对象
 */
export interface PromiseWithAbort<T = any> extends Promise<T> {

    /**
     * 中止发起的请求
     * @param msg 请求状态
     */
    abort?(msg?: RequestState): void
}

/**
 * 返回数据结果
 */
export interface RequestResponse {

    /** 请求是否成功 */
    bl: boolean

    /** 请求返回消息 */
    msg: string

    /** 请求返回数据 */
    data: any
}