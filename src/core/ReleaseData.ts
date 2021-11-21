import { ChatUrl } from "./ChatUrl";
import { ReleaseType } from "./type/ReleaseType";
import { UrlType } from "./type/UrlType";
import * as fs from "fs";

export class ReleaseData {
  type: ReleaseType;
  message: string;

  constructor(type: ReleaseType, message: string) {
    this.type = type;
    this.message = message;
  }

  get hasChangelog(): boolean {
    return (
      this.message.split("\n").filter((v) => v.startsWith("- ")).length != 0
    );
  }

  get changelogs(): string[] {
    return this.message.split("\n").filter((v) => v.startsWith("- "));
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

  get banner(): string {
    const imgCI = process.env.BANNER_CI || "assets/banner-ci.png";
    const imgRel = process.env.BANNER_RELEASE || "assets/banner-official.png";
    const img = this.type == ReleaseType.CI ? imgCI : imgRel;
    if (!fs.existsSync(img)) {
      throw new Error(`${img} does not exists`);
    }

    return img;
  }

  get customDate(): string {
    return (
      this.message
        .match(/(\d{4}\d{2}\d{2})/gm)
        ?.find((it) => it.startsWith("20")) || ""
    );
  }

  urlExists(type: UrlType) {
    return this.urls?.find((it) => it.type == type) != undefined;
  }

  urlOf(type: UrlType) {
    return this.urls?.find((it) => it.type == type)?.url;
  }
}
