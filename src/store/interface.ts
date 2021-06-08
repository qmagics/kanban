import { Store } from 'vuex'
import ModuleATypes from './modules/a/interface';
import ModuleBTypes from './modules/b/interface';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store<RootStateTypes>
    }
}

export default interface RootStateTypes {
    count: number,
    user?: Record<string, Array<number>>
}

export interface AllStateTypes extends RootStateTypes {
    a: ModuleATypes;
    b: ModuleBTypes;
}