import {
  Command,
  CommandCategory,
  CommandCategoryExtra,
  CommandExec,
  commandMeta
} from '../types'

export function command(meta: commandMeta, exec: CommandExec): Command {
  return {
    meta,
    exec
  }
}

export function category(name: string, commands: Command[], extra: CommandCategoryExtra = {}): CommandCategory {
  return {
    name,
    commands,
    ...extra,
  }
}
