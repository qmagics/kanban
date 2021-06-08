import router from './router'
import getPageTitle from './utils/getPageTitle'
import { RouteLocationNormalized } from 'vue-router'
import { getToken } from './utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
    showSpinner: true
})

const whiteList: string[] = ['/login', '/', '/home', '/404'];

router.beforeEach(async (to: RouteLocationNormalized & { meta: any }, from: any, next: Function) => {

    // start progress bar
    NProgress.start();

    // set the page title
    document.title = getPageTitle(to.meta.title)

    // user token
    const token = getToken();

    // has token
    if (token) {
        if (to.path === '/login') {
            next({ path: '/' })
        }
        else {
            // judge if user has permission
            const authed = true;

            // has permission
            if (authed) {
                next();
            }
            // has no permission
            else {
                // try to get auth

                // succeed
                try {
                    // ...

                    next({ ...to, replace: true })
                }

                // failed
                catch (error) {
                    // remove token
                    // ...

                    // go to login page to re-login
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }

                // 跳转
                next({ ...to, replace: true })
            }
        }
    }

    // has no token
    else {

        // to.path in whiteList
        if (whiteList.includes(to.path)) {
            next()
        }

        // to.path not in whiteList
        else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }

})

router.afterEach(NProgress.done)