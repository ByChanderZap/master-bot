import { Client, GatewayIntentBits } from 'discord.js'
import keys from '../keys'
import { registerEvents } from '../utils'
import events from '../events'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
  ]
})

registerEvents(client, events)

client.login(keys.clientToken)
  .catch(err => {
    console.log('[ERROR] - Error while logging', err)
    process.exit(1)
  })
