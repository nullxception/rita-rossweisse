import { DateTime } from "luxon";
import React from "react";
import { TemplateProps } from "../core/TemplateProps";
import { UrlType } from "../core/type/UrlType";
import { Changelogs } from "./components/changelogs";

export const PostDataCI: React.FC<TemplateProps> = ({
  data,
}: TemplateProps) => {
  const dateNow = DateTime.now().toFormat("MMMM dd, yyyy");
  return (
    <>
      <br />
      <b>DerpFest 12 Shion</b> | <b>CI Build</b>
      <br />
      Build {dateNow}
      <br />
      By @fryevia x @nullxception
      <br />
      <br />
      <b>Changelog</b>
      <br />
      <Changelogs data={data} />
      <br />
      <b>Download</b>
      <br />• <a href={data.urlOf(UrlType.Gdrive)}>Google Drive</a>
      <br />
      <br />
      <b>Notes</b>
      <br />• Since it's a CI build, there's no need to share to the channels
      <br />• Gambar hanyalah pemanis
      <br />
      <br />
      #StayDerped
    </>
  );
};
