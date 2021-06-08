import { App, Plugin } from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';

const p: Plugin = {
    install(app: App) {
        app.component(SvgIcon.name || 'SvgIcon', SvgIcon)
    }
}

export default p;