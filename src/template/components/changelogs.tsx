import React from "react";
import { TemplateProps } from "../../core/TemplateProps";
import { UrlType } from "../../core/type/UrlType";

export const Changelogs = ({ data }: TemplateProps) => {
  if (data.changelogs.length == 0 && data.urlOf(UrlType.Gist) === undefined)
    return <></>;

  return (
    <>
      <b>Changelog</b>
      <br />
      {data.changelogs.map((it) => (
        <>
          {it.replace(/^- /g, "• ")}
          <br />
        </>
      ))}
      {data.changelogs.length > 0 ? (
        <>
          • Full changelog at <a href={data.urlOf(UrlType.Gist)}>Gist</a>
        </>
      ) : (
        <>
          • <a href={data.urlOf(UrlType.Gist)}>Gist</a>
        </>
      )}
    </>
  );
};
