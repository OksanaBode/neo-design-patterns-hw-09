import { readFileSync } from "fs";
import { UserData } from "../data/UserData";
import { XMLParser } from "fast-xml-parser";

export class XmlIterator implements Iterable<UserData> {
  private users: UserData[];

  constructor(filePath: string) {
    const xmlContent = readFileSync(filePath, 'utf-8');

    const parser = new XMLParser({
      ignoreAttributes: false,
      trimValues: true,
    });

    const parsed = parser.parse(xmlContent);

    let users = parsed.users?.user;

    if (!Array.isArray(users)) {
      users = users ? [users] : [];
    }

    this.users = users.map((u: any) => ({
      id: Number(u.id),
      name: u.name,
      email: u.email,
      phone: u.phone,
    }));
  }

  *[Symbol.iterator](): Iterator<UserData> {
    for (const user of this.users) {
      yield user;
    }
  }
}