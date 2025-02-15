import { Command } from './command.interface.js';
import { ImportCommandDeps } from './import-command-deps.interface.js';
import { CommandName } from './command-name.enum.js';

export class ImportCommand implements Command {
  constructor(
    private readonly deps: ImportCommandDeps
  ) {}

  public getName(): CommandName {
    return CommandName.Import;
  }

  public execute(...args: string[]): void | never {
    const [filePath] = args;

    if (!filePath) {
      throw new Error('Для импорта данных необходимо указать источник');
    }

    try {
      this.importDataFromFile(filePath);
    } catch (error) {
      this.handleImportError(filePath, error);
    }
  }

  private importDataFromFile(filePath: string): void | never {
    const rawData = this.deps.fileReader.read(filePath);
    const parsedData = this.deps.dataParser.parse(rawData);
    // TODO: логирование заменить на настоящий импорт
    this.deps.logger.log(parsedData);
  }

  private handleImportError(filePath: string, error: unknown): void {
    this.deps.logger.error(`Не удалось импортировать данные из файла ${filePath}`);

    if (error instanceof Error) {
      this.deps.logger.error(error.message);
    }
  }
}
