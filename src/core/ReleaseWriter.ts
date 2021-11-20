import { ReleaseType } from "./type/ReleaseType";
import ReactDOMServer from "react-dom/server";
import React from "react";
import { PostDataCI } from "../template/PostDataCI";
import { PostDataRelease } from "../template/PostDataRelease";
import { ReleaseData } from "./ReleaseData";

export class ReleaseWriter {
  type: ReleaseType;
  message: string;
  data: ReleaseData;

  constructor(type: ReleaseType, message: string) {
    this.type = type;
    this.message = message;
    this.data = new ReleaseData(this.type, this.message);
  }

  async createCaption(): Promise<string> {
    const template = ReactDOMServer.renderToStaticMarkup(
      React.createElement(
        this.type == ReleaseType.CI ? PostDataCI : PostDataRelease,
        { data: this.data }
      )
    );

    return template.replaceAll("<br/>", "\n");
  }
}
