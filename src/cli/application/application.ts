import { ParsedCommand } from '../commands-parser/index.js';
import { Command, CommandName } from '../commands/index.js';
import { NameToCommandMap } from './name-to-command-map.type.js';
import { ApplicationDeps } from './application-deps.interface.js';

export class Application {
  private nameToCommandMap: Partial<NameToCommandMap> = {};

  constructor(
    private readonly deps: ApplicationDeps,
    private readonly defaultCommandName: CommandName = CommandName.Help
  ) {}

  public registerCommands(commands: Command[]): void | never {
    commands.forEach((command) => this.registerCommand(command));
  }

  public registerCommand(command: Command): void | never {
    const commandName = command.getName();

    if (!this.validateDuplicate(command)) {
      throw new Error(`Команда ${commandName} уже зарегистрирована`);
    }

    this.nameToCommandMap[commandName] = command;
  }

  public processCommands(argv: string[]): void | never {
    const parsedCommands = this.deps.commandsParser.parse(argv);

    if (parsedCommands.length) {
      parsedCommands.forEach((parsedCommand) => this.executeParsedCommand(parsedCommand));
    } else {
      this.executeDefaultCommand();
    }
  }

  private validateDuplicate(command: Command): boolean {
    return !Object.hasOwn(this.nameToCommandMap, command.getName());
  }

  private executeDefaultCommand(): void | never {
    const defaultCommand = this.nameToCommandMap[this.defaultCommandName];

    if (!defaultCommand) {
      throw new Error(`Команда по умолчанию ${this.defaultCommandName} не зарегистрирована`);
    }

    defaultCommand.execute();
  }

  private executeParsedCommand(parsedCommand: ParsedCommand): void | never {
    const command = this.nameToCommandMap[parsedCommand.name];

    if (!command) {
      throw new Error(`Команда ${parsedCommand.name} не зарегистрирована`);
    }

    command.execute(...parsedCommand.args);
  }
}
