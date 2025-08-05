import { readFileSync } from "fs";
import { UserData } from "../data/UserData";

export class CsvIterator implements Iterable<UserData> {
  private users: UserData[] = [];

  constructor(filePath: string) {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.trim().split('\n');
    const headers = lines
      .shift()
      ?.split(',')
      .map(h => h.trim());

    if (!headers) throw new Error('Invalid CSV format');

    this.users = lines.map(line => {
      const values = line.split(',').map(v => v.trim());
      const user: any = {};

      headers.forEach((header, index) => {
        user[header] = isNaN(Number(values[index]))
          ? values[index]
          : Number(values[index]);
      });

      return user as UserData;
    });
  }

  *[Symbol.iterator](): Iterator<UserData> {
    for (const user of this.users) {
      yield user;
    }
  }
}