import { AllStateTypes } from './interface';
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import RootStateTypes from '@/store/interface';
import a from './modules/a';
import b from './modules/b';

export const key: InjectionKey<Store<RootStateTypes>> = Symbol()

export const store = createStore<RootStateTypes>({
    modules: {
        a, b
    },
    state: {
        count: 0
    },
    mutations: {
        increment(state, n = 1) {
            state.count += n;
        }
    }
})

export function useStore<T = AllStateTypes>() {
    return baseUseStore<T>(key);
}