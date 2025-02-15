export interface DataParser<RawData = unknown, ParsedData = unknown> {
  parse(rawData: RawData): ParsedData;
}
