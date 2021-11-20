import { ReleaseType } from "./ReleaseType";
import { UrlType } from "./UrlType";
import { ChatUrl } from "./ChatUrl";
import ReactDOMServer from "react-dom/server";
import React from "react";
import { PostDataCI } from "./template/PostDataCI";
import { PostDataRelease } from "./template/PostDataRelease";
import * as fs from "fs";

export class ReleaseWriter {
  type: ReleaseType;
  message: string;

  constructor(type: ReleaseType, message: string) {
    this.type = type;
    this.message = message;
  }

  async createCaption(): Promise<string> {
    const template = ReactDOMServer.renderToStaticMarkup(
      React.createElement(
        this.type == ReleaseType.CI ? PostDataCI : PostDataRelease
      )
    );
    return this.parseData(template);
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
      .replaceAll("$list_changelog", this.changelogs.join("\n"))
      .replaceAll("<br/>", "\n");
  }
}
