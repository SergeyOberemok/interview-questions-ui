import { io } from 'socket.io-client'

export const socket = io({
  autoConnect: import.meta.env.PROD,
})
