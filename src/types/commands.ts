import { 
  Awaitable,
  Client,
  ChatInputCommandInteraction,
  SlashCommandBuilder
} from 'discord.js'

type LoggerFunction = (...args: unknown[]) => void

export interface CommandProps {
  interaction: ChatInputCommandInteraction
  client: Client
  log: LoggerFunction
}

export type CommandExec =
  (props: CommandProps) => Awaitable<unknown>

export type commandMeta = 
  | SlashCommandBuilder 
  | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>

export interface Command {
  meta: commandMeta,
  exec: CommandExec
}

export interface CommandCategoryExtra {
  description?: string
  emoji?: string
}

export interface CommandCategory extends CommandCategoryExtra {
  name: string,
  commands: Command[]
}
