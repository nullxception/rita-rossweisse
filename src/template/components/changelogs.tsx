import React from "react";
import { TemplateProps } from "../../core/TemplateProps";
import { UrlType } from "../../core/type/UrlType";

export const Changelogs = ({ data }: TemplateProps) => {
  const hasGist = data.urlOf(UrlType.GitHub) != undefined;
  const hasChangelog = data.changelogs.length > 0;
  const url = hasGist
    ? data.urlOf(UrlType.GitHub)
    : data.urlOf(UrlType.Telegraph);
  const hasUrl = (url?.length ?? 0) > 1;
  if (!hasChangelog && !hasUrl) return <></>;

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
      {hasChangelog && hasUrl ? (
        <>
          • Full changelog at <a href={url}>here</a>
        </>
      ) : hasUrl ? (
        <>
          • <a href={url}>{hasGist ? "GitHub" : "Telegraph"}</a>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
