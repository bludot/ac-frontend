import webpackMockServer from 'webpack-mock-server'
import cookieparser from 'cookie-parser'
import cors from 'cors'

let state = {
    "power": 1,
    "temp": 25,
    "mode": 0,
    "fan": 0,
    "powerful": 0,
    "quiet": 0,
    "swingh": 1,
    "swingv": 1
}
// app is expressjs application
export default webpackMockServer.add((app, helper) => {
    // you can find more about expressjs here: https://expressjs.com/
    app.use(cookieparser())
    app.use(cors({
        origin(origin, callback) {
            callback(null, true)
        },
        credentials: true,
    }))
    app.get('/backend/state', (_req, res) => {
        return res.json(state)
    })
    app.post('/backend/cmd', (req, res) => {
        state = req.body
        return res.json(state)
    })
})
