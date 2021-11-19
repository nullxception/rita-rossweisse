import { DateTime } from "luxon";
import { ReleaseType } from "./ReleaseType";
import { UrlType } from "./UrlType";
import * as fs from "fs";
import { promisify } from "util";
import { ChatUrl } from "./ChatUrl";

const readFileAsync = promisify(fs.readFile);

export class ReleaseWriter {
  type: ReleaseType;
  message: string;

  constructor(type: ReleaseType, message: string) {
    this.type = type;
    this.message = message;
  }

  async createCaption(): Promise<string> {
    const file = this.type == ReleaseType.CI ? "ci.mdt" : "official.mdt";
    const template = await readFileAsync(`assets/${file}`, "utf-8");
    return this.parseData(template);
  }

  get hasChangelog(): boolean {
    return (
      this.message.split("\n").filter((v) => v.startsWith("- ")).length != 0
    );
  }

  get changelogs(): string[] {
    return this.message
      .split("\n")
      .filter((v) => v.startsWith("- "))
      .map((v) => v.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&"));
  }

  get urls(): ChatUrl[] {
    return (
      this.message
        .match(
          /(https?:\/\/(?:www\.|(?!www))[^\s.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi
        )
        ?.map((it) => new ChatUrl(it)) || []
    );
  }

  findByType(type: UrlType) {
    return this.urls?.find((it) => it.type == type);
  }

  parseData(template: string): string {
    return template
      .replaceAll("$url_gist", this.findByType(UrlType.Gist)?.url || "")
      .replaceAll("$url_gdrive", this.findByType(UrlType.Gdrive)?.url || "")
      .replaceAll(
        "$url_sourceforge",
        this.findByType(UrlType.Sourceforge)?.url || ""
      )
      .replaceAll("$date_today", DateTime.now().toFormat("MMMM dd, yyyy"))
      .replaceAll("$list_changelog", this.changelogs.join("\n"));
  }
}
