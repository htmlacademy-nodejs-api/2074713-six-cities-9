import { Command } from './command.interface.js';
import { VersionCommandDeps } from './version-command-deps.interface.js';
import { CommandName } from './command-name.enum.js';

export class VersionCommand implements Command {
  constructor(
    private readonly deps: VersionCommandDeps,
    private readonly configFilePath: string
  ) {}

  public getName(): CommandName {
    return CommandName.Version;
  }

  public execute(): void {
    try {
      this.logVersionFromConfigFile();
    } catch (error) {
      this.handleVersionReadingError(error);
    }
  }

  private logVersionFromConfigFile(): void | never {
    const rawConfig = this.deps.fileReader.read(this.configFilePath);
    const config = this.deps.configParser.parse(rawConfig);
    this.deps.logger.info(config.version);
  }

  private handleVersionReadingError(error: unknown): void {
    this.deps.logger.error(`Не удалось прочитать версию в конфигурационном файле ${this.configFilePath}`);

    if (error instanceof Error) {
      this.deps.logger.error(error.message);
    }
  }
}
