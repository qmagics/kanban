import { MockItem } from './interface';

const userMocks: MockItem[] = [
    {
        url: '/api/login',
        type: 'post',
        response: () => {
            return {
                status: 200,
                bl: true
            }
        }
    }
]

export default userMocks;