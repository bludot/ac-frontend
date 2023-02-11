import { MockHandler } from 'vite-plugin-mock-server'


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

const mocks: MockHandler[] = [
  {
    pattern: '/backend/state',
    handle: (req, res) => {
      return res.end(JSON.stringify(state))
    }
  },
  {
    pattern: '/backend/cmd',
    handle: (req, res) => {
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      })
      req.on('end', () => {
        state = JSON.parse(data)
        return res.end(JSON.stringify(state))
      })
    }
  },
]

export default mocks