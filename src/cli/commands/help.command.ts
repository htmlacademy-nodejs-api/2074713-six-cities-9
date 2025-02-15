import { Command } from './command.interface.js';
import { HelpCommandDeps } from './help-command-deps.interface.js';
import { CommandName } from './command-name.enum.js';

const MANUAL = `
  Программа для подготовки тестовых данных для REST API сервера

  Пример: cli.js --<command> [--arguments]

  Команды:
    --version:                   # выводит номер версии
    --help:                      # печатает этот текст
    --import <path>:             # импортирует данные из TSV
    --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
`;

export class HelpCommand implements Command {
  constructor(
    private readonly deps: HelpCommandDeps
  ) {}

  public getName(): CommandName {
    return CommandName.Help;
  }

  public execute(): void {
    this.deps.logger.info(MANUAL);
  }
}
