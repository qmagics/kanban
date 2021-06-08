import { MockItem } from './interface';
import Mock from 'mockjs';
import user from './user';

Mock.setup({
    timeout: 1000
})

const mocks: MockItem[] = [
    ...user
]

for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type, i.response)
}
