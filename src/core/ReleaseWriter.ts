import { ReleaseType } from "./type/ReleaseType";
import ReactDOMServer from "react-dom/server";
import React from "react";
import { PostDataCI } from "../template/PostDataCI";
import { PostDataRelease } from "../template/PostDataRelease";
import { ReleaseData } from "./ReleaseData";

export class ReleaseWriter {
  message: string;
  data: ReleaseData;

  constructor(message: string) {
    this.message = message;
    this.data = new ReleaseData(this.type, this.message);
  }

  get type(): ReleaseType {
    return this.message.match(/( ci | official)/gim)?.[0]?.includes("off")
      ? ReleaseType.Official
      : ReleaseType.CI;
  }

  caption(): string {
    const template = ReactDOMServer.renderToStaticMarkup(
      React.createElement(
        this.type == ReleaseType.CI ? PostDataCI : PostDataRelease,
        { data: this.data }
      )
    );

    return template.replaceAll("<br/>", "\n");
  }
}
