import { io } from 'socket.io-client'

const PORT = import.meta.env.VITE_PORT
const URL = `${window.location.protocol}//${window.location.hostname}:${PORT}`

export const socket = io(URL, { autoConnect: process.env.NODE_ENV === 'production' })
