import { DateTime } from "luxon";
import { ReleaseType } from "./ReleaseType";
import { UrlType } from "./UrlType";
import { ChatUrl } from "./ChatUrl";
import ReactDOMServer from "react-dom/server";
import React from "react";
import { PostDataCI } from "./template/PostDataCI";
import { PostDataRelease } from "./template/PostDataRelease";

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
      .replaceAll("$list_changelog", this.changelogs.join("\n"))
      .replaceAll("<br/>", "\n");
  }
}
