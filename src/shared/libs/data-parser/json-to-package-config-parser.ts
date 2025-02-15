import { PackageConfig, JSONData } from '../../types/index.js';
import { DataParser } from './data-parser.interface.js';

export class JSONToPackageConfigParser implements DataParser<JSONData, PackageConfig> {
  public parse(rawData: JSONData): PackageConfig | never {
    if (!this.validateConfigFormat(rawData)) {
      throw new Error('Некорректный формат конфигурации пакета');
    }

    return rawData;
  }

  private validateConfigFormat(rawData: JSONData): rawData is PackageConfig {
    return (
      rawData !== null
      && typeof rawData === 'object'
      && !Array.isArray(rawData)
      && Object.hasOwn(rawData, 'version')
    );
  }
}
