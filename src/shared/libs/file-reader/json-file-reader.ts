import { readFileSync } from 'node:fs';

import { JSONData } from '../../types/index.js';
import { FileReader } from './file-reader.interface.js';
import { FileExtension } from './file-extension.enum.js';

export class JSONFileReader implements FileReader<JSONData> {
  public read(filePath: string): JSONData | never {
    if (!this.validateFileFormat(filePath)) {
      throw new Error(`Некорректный формат JSON-файла: ${filePath}`);
    }

    const rawContent = this.readRawContent(filePath);
    return this.parseRawContent(rawContent);
  }

  private validateFileFormat(filePath: string): boolean {
    return filePath.endsWith(FileExtension.JSON);
  }

  private readRawContent(filePath: string): string {
    return readFileSync(filePath, 'utf-8');
  }

  private parseRawContent(rawContent: string): JSONData | never {
    return JSON.parse(rawContent);
  }
}
