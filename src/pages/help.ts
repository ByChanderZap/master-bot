// Namespaces we will use

import { ButtonBuilder, EmbedBuilder, SelectMenuBuilder, SelectMenuOptionBuilder } from '@discordjs/builders'
import { ActionRowBuilder, APIEmbedField, APIMessageComponentEmoji, ButtonStyle, InteractionReplyOptions } from 'discord.js'
import CategoryRoot from '../commands'
import { chunk, createId, readId } from '../utils'

export const Namespaces = {
  root: 'help_category_root',
  select: 'help_category',
  action: 'help_category_action'
}

// Actions we will use
export const Actions = {
  next: '+',
  back: '-',
}

const N = Namespaces
const A = Actions

// Generate root embed for help paginator
export function getCategoryRoot(ephemeral?: boolean): InteractionReplyOptions {
  // Map the categories
  const mappedCategories = CategoryRoot.map(({ name, description, emoji }) => 
    new SelectMenuOptionBuilder({
      label: name,
      description, 
      emoji: emoji as APIMessageComponentEmoji,
      value: name,
    })
  )

  const embed = new EmbedBuilder()
    .setTitle('Help Menu')
    .setDescription('Browse through all commands.')

    // Create select menu for categories
    const selectId = createId(N.select)
    const select = new SelectMenuBuilder()
      .setCustomId(selectId)
      .setPlaceholder('Command Category')
      .setMaxValues(1)
      .setOptions(mappedCategories)

    const components = new ActionRowBuilder<SelectMenuBuilder>()
      .addComponents(select)
    
    return {
      embeds: [embed],
      components: [components],
      ephemeral
    }
}


// Generate new embed for current category page
export function getCategoryPage(interactionId: string): InteractionReplyOptions {
  // Extract metadata from itneracionId
  const [__namespace, cateryName, action, currentOffset] = readId(interactionId)

  const categoryChunks = CategoryRoot.map(c => {
    // Premap all commands as embed fields
    const commands: APIEmbedField[] = c.commands.map((c) => ({
      name: c.meta.name,
      value: c.meta.description,
    }))

    return {
      ...c,
      commands: chunk(commands, 10)
    }
  })

  const category = categoryChunks.find(({ name }) => name === cateryName)

  if (!category)
    throw new Error('Invalidad interactionId; Failed to find corresponding category page!')

  // get Current offset
  let offset = parseInt(currentOffset)
  // if is NaN set offset to 0
  if(isNaN(offset)) offset = 0
  // Increment offset according to action
  if (action === A.next) offset++
  else if (action === A.back) offset--

  const emoji = category.emoji ? `${category.emoji} ` : ''
  const defaultDescription = `Brouse through ${category.commands.flat().length} commands in ${emoji}${category.name}`

  const embed = new EmbedBuilder()
    .setTitle(`${emoji}${category.name} Commands`)
    .setDescription(category.description ?? defaultDescription)
    .setFields(category.commands[offset])
    .setFooter({ text: `${offset + 1} / ${category.commands.length}` })

  // back button
  const backId = createId(N.action, category.name, A.back, offset)
  const backButton = new ButtonBuilder()
    .setCustomId(backId)
    .setLabel('Back')
    .setStyle(ButtonStyle.Danger)
    .setDisabled(offset <= 0)

  // Return root
  const rootId = createId(N.root)
  const rootButton = new ButtonBuilder()
    .setCustomId(rootId)
    .setLabel('Categories')
    .setStyle(ButtonStyle.Secondary)

    const nextId = createId(N.action, category.name, A.next, offset)
    const nextButton = new ButtonBuilder()
    .setCustomId(backId)
    .setLabel('Next')
    .setStyle(ButtonStyle.Success)
    .setDisabled(offset >= category.commands.length -1)

  const component = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(backButton, rootButton, nextButton)

  return {
    embeds: [embed],
    components: [component]
  }
}
