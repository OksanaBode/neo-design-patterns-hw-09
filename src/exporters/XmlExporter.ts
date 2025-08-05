import { DataExporter } from "./DataExporter";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

export class XmlExporter extends DataExporter {
  protected render(): string {
    const items = this.data.map(
        (user) =>
          `  <user>
    <id>${user.id}</id>
    <name>${user.name}</name>
    <email>${user.email}</email>
    <phone>${user.phone}</phone>
  </user>`
      )
      .join("\n");
    return `<users>\n${items}\n</users>`;
  }

  protected afterRender(): void {
    this.result += `\n<!-- Експорт згенеровано: ${new Date().toISOString()} -->`;
  }

  protected save(): void {
    const filePath = "./dist/users.xml";
    const dir = dirname(filePath);

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    writeFileSync(filePath, this.result, "utf-8");
  }
}
