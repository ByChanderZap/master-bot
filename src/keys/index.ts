import { Keys } from '../types'

const keys: Keys = {
  clientToken: process.env.CLIENT_TOKEN ?? 'nill'
}

if (Object.values(keys).includes('nill'))
  throw new Error('Not all env variables are defined')

export default keys