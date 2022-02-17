import { UrlType } from "./type/UrlType";

export class ChatUrl {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  get type(): UrlType {
    let type: UrlType;
    if (this.url.match(/\/\/drive.goog/gm)) {
      type = UrlType.Gdrive;
    } else if (this.url.match(/\/\/sourceforg/gm)) {
      type = UrlType.Sourceforge;
    } else if (this.url.match(/githubusercontent/gm)) {
      type = UrlType.GitHub;
    } else if (this.url.match(/\/\/telegra.ph/gm)) {
      type = UrlType.Telegraph;
    } else {
      type = UrlType.Unknown;
    }
    return type;
  }
}
