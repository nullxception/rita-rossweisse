import { DateTime } from 'luxon'
import React from 'react'

export const PostDataRelease: React.FC = () => {
    const dateNow = `${DateTime.now().toFormat("MMMM dd, yyyy")}`;
    return <>
        <br /><b>DerpFest 12 Shion</b> | <b>Android 12</b>
        <br />Build `${dateNow}`
        <br />By @fryevia x @nullxception
        <br />
        <br /><b>Changelog</b>
        <br />• [Gist]($url_gist)
        <br />
        <br /><b>Download</b>
        <br />• [Google Drive]($url_gdrive)
        <br />• [SourceForge]($url_sourceforge)
        <br />
        <br /><b>Notes</b>
        <br />• Custom vendor
        <br />• GApps Included
        <br />• SELinux Enforced
        <br />• SafetyNet Passed by default \(non\-root\)
        <br />
        <br />#StayDerped
    </>
}
