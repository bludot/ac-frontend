import instance, {longInstance} from './http'

export default {
    setState: async (state: any) => {
        const {data} = await instance.post('/backend/cmd', state)
        return data
    },
    getState: async () => {
        const {data} = await instance.get('/backend/state')
        return data
    },
}
