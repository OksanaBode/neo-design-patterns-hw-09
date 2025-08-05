import { DataExporter } from "./DataExporter";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

export class XmlExporter extends DataExporter {
  protected render(): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<users>\n';

    for (const user of this.data) {
      xml += "  <user>\n";
      for (const key in user) {
        xml += `    <${key}>${user[key as keyof typeof user]}</${key}>\n`;
      }
      xml += "  </user>\n";
    }

    xml += "</users>\n";

    const timestamp = new Date().toISOString();
    xml += `<!-- Експорт згенеровано: ${timestamp} -->\n`;

    return xml;
  }

  protected afterRender(): void {
    console.log("XML export finished. Total users:", this.data.length);
  }

  protected save(): void {
    const filePath = "./exports/users.xml";
    const dir = dirname(filePath);

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    writeFileSync(filePath, this.result, "utf-8");
  }
}
