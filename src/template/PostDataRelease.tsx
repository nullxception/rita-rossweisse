import { DateTime } from "luxon";
import React from "react";
import { TemplateProps } from "../core/TemplateProps";
import { UrlType } from "../core/type/UrlType";
import { Changelogs } from "./components/changelogs";

export const PostDataRelease: React.FC<TemplateProps> = ({
  data,
}: TemplateProps) => {
  let dateNow = DateTime.now().toFormat("MMMM dd, yyyy");
  if (data.customDate != "") {
    dateNow = DateTime.fromFormat(data.customDate, "yyyyMMdd").toFormat(
      "MMMM dd, yyyy"
    );
  }
  return (
    <>
      <br />
      <b>DerpFest 12 Shion</b> | <b> Poco X3 Pro</b> | <b>Official</b>
      <br />
      <b>Build</b> {dateNow}
      <br />
      <b>By</b> @fryevia x @nullxception
      <br />
      <br />
      <Changelogs data={data} />
      <br />
      <br />
      <b>Download</b>
      <br />• <a href={data.urlOf(UrlType.Gdrive)}>Google Drive</a>
      <br />• <a href={data.urlOf(UrlType.Sourceforge)}>SourceForge</a>
      <br />
      <br />
      <b>Notes</b>
      <br />• Custom vendor
      <br />• GApps Included
      <br />• SELinux Enforced
      <br />• SafetyNet Passed by default (non-root)
      <br />• <a href="https://t.me/ChaldeaFuckFest">Support Chat</a>
      <br />
      <br />
      #StayDerped
    </>
  );
};
