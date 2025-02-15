#!/usr/bin/env node

import { resolve } from 'node:path';

import { Application } from './cli/application/index.js';
import { SingleCommandParser } from './cli/commands-parser/index.js';
import { Command, HelpCommand, VersionCommand, ImportCommand } from './cli/commands/index.js';
import { ColoredLogger } from './shared/libs/logger/index.js';
import { JSONFileReader, TSVFileReader } from './shared/libs/file-reader/index.js';
import { JSONToPackageConfigParser, TSVToOffersParser } from './shared/libs/data-parser/index.js';

const LOGGER = new ColoredLogger();
const PACKAGE_CONFIG_FILE_NAME = 'package.json';

bootstrap();

function bootstrap() {
  const application = createApplication();
  const commands = createCommands();

  try {
    registerCommands(application, commands);
  } catch (error) {
    handleCommandsRegistrationError(error);
    return;
  }

  try {
    processCommands(application);
  } catch (error) {
    handleCommandsProcessingError(error);
  }
}

function createApplication(): Application {
  return new Application({
    commandsParser: new SingleCommandParser()
  });
}

function createCommands(): Command[] {
  const helpCommand = new HelpCommand({ logger: LOGGER });

  const versionCommand = new VersionCommand(
    {
      logger: LOGGER,
      fileReader: new JSONFileReader(),
      configParser: new JSONToPackageConfigParser()
    },
    resolve(PACKAGE_CONFIG_FILE_NAME)
  );

  const importCommand = new ImportCommand({
    logger: LOGGER,
    fileReader: new TSVFileReader(),
    dataParser: new TSVToOffersParser()
  });

  return [helpCommand, versionCommand, importCommand];
}

function registerCommands(
  application: Application,
  commands: Command[]
): void | never {
  application.registerCommands(commands);
}

function handleCommandsRegistrationError(error: unknown): void {
  LOGGER.error('Не удалось зарегистрировать команды приложения');

  if (error instanceof Error) {
    LOGGER.error(error.message);
  }
}

function processCommands(application: Application): void | never {
  application.processCommands(process.argv);
}

function handleCommandsProcessingError(error: unknown): void {
  LOGGER.error('Не удалось обработать команды приложения');

  if (error instanceof Error) {
    LOGGER.error(error.message);
  }
}
