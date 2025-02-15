import { Logger } from '../../shared/libs/logger/index.js';
import { FileReader } from '../../shared/libs/file-reader/index.js';
import { DataParser } from '../../shared/libs/data-parser/index.js';
import { PackageConfig } from '../../shared/types/index.js';

export interface VersionCommandDeps {
  logger: Logger;
  fileReader: FileReader;
  configParser: DataParser<unknown, PackageConfig>;
}
