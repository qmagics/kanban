import { ElButton, ElInput, ElSelect, ElForm, ElFormItem, ElContainer, ElHeader, ElMain, ElFooter, ElAside, ElTooltip } from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import { App, Plugin } from 'vue';

const p: Plugin = {
    install(app: App) {
        app.use(ElButton)
        app.use(ElInput)
        app.use(ElSelect)
        app.use(ElForm)
        app.use(ElFormItem)
        app.use(ElContainer)
        app.use(ElHeader)
        app.use(ElMain)
        app.use(ElFooter)
        app.use(ElAside)
        app.component(ElTooltip.name, ElTooltip)
    }
}

export default p;