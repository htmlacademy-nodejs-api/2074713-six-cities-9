import { readFileSync } from 'node:fs';

import { TSVRecord } from '../../types/index.js';
import { FileReader } from './file-reader.interface.js';
import { FileExtension } from './file-extension.enum.js';

const RECORDS_SEPARATOR = '\n';
const VALUES_SEPARATOR = '\t';

export class TSVFileReader implements FileReader<TSVRecord[]> {
  public read(filePath: string): TSVRecord[] | never {
    if (!this.validateFileFormat(filePath)) {
      throw new Error(`Некорректный формат TSV-файла: ${filePath}`);
    }

    const rawContent = this.readRawContent(filePath);
    return this.parseRawContent(rawContent);
  }

  private validateFileFormat(filePath: string): boolean {
    return filePath.endsWith(FileExtension.TSV);
  }

  private readRawContent(filePath: string): string {
    return readFileSync(filePath, 'utf-8');
  }

  private parseRawContent(rawContent: string): TSVRecord[] {
    return rawContent
      .trim()
      .split(RECORDS_SEPARATOR)
      .map((record) => record.split(VALUES_SEPARATOR));
  }
}
