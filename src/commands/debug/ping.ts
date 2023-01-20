import { SlashCommandBuilder } from 'discord.js'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Check if bot responds')
  .addStringOption(option => 
    option
      .setName('message')
      .setDescription('Provide the bot a message to respond')
      .setMinLength(1)
      .setMaxLength(2000)
      .setRequired(false)
  )

export default command(meta, ({ interaction }) => {
  const message = interaction.options.getString('message')

  return interaction.reply({
    ephemeral: true,
    content: message ?? 'Pong! 🏓'
  })
})
