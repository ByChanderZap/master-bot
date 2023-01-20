import {
  Command,
  CommandCategory,
  CommandExec,
  commandMeta
} from '../types'

export function command(meta: commandMeta, exec: CommandExec): Command {
  return {
    meta,
    exec
  }
}

export function category(name: string, commands: Command[]): CommandCategory {
  return {
    name,
    commands
  }
}
