import router from '@/router';
import axios, { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from 'axios';
import { RequestState, PromiseWithAbort, RequestResponse } from '@/types/request';

const http: AxiosInstance = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API,
    baseURL: '/',

    validateStatus: status => status == 200 || status == 500 || status == 400 || status >= 600 && status < 603
})

http.interceptors.request.use(
    config => {
        // rewrite
        // config.headers['X-Token'] = 'xxx'
        return config
    },
    error => {
        // console.log(error)
        return Promise.reject(error);
    }
)

http.interceptors.response.use(
    response => {

        const res = response.data;

        if (res.status !== 200) {
            switch (res.status) {
                //没有权限
                case 601:
                case 602:
                    // await store.dispatch("user/logout");
                    router.push(`/login?redirect=${router.currentRoute.value.fullPath}`);
                    break;

                default:
                    break;
            }

            return Promise.reject(new Error(res.msg || '请求发生错误'));
        }
        else {
            return res;
        }
    },
    error => {
        if (error) {
            if (error.message === RequestState.REQUEST_CANCELED) {
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
)

/**
 * 请求数据
 * @param config axios请求配置项
 * @returns 
 */
export default function request(config: AxiosRequestConfig): PromiseWithAbort<RequestResponse> {

    const source: CancelTokenSource = axios.CancelToken.source();

    const promise: PromiseWithAbort = http({
        ...config,
        cancelToken: source.token
    });

    promise.abort = (msg = RequestState.REQUEST_CANCELED) => {
        source.cancel(msg)
    }

    return promise;
}
