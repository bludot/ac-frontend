import instance, {longInstance} from './http'

export default {
    setState: async (state: any) => {
        const {data} = await instance.post('/cmd', state)
        return data
    },
    getState: async () => {
        const {data} = await instance.get('/state')
        return data
    },
    getRoomCondtionsBetween: async (from: string, to: string) => {
        const {data} = await instance.post('/roomconditions/between', {from, to})
        return data
    }
}
