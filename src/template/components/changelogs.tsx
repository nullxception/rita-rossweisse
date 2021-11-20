import React from "react";
import { TemplateProps } from "../../core/TemplateProps";

export const Changelogs = ({ data }: TemplateProps) => {
  return (
    <>
      {data.changelogs.map((it) => (
        <>
          {it.replace(/^- /g, "• ")}
          <br />
        </>
      ))}
    </>
  );
};
