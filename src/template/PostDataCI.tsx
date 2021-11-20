import { DateTime } from 'luxon';
import React from 'react'

export const PostDataCI: React.FC =  () => {
    const dateNow = `${DateTime.now().toFormat("MMMM dd, yyyy")}`;
    return <>
        <br /><b>DerpFest 12 Shion</b> | <b>CI Build</b>
        <br />Build `${dateNow}`
        <br />By @fryevia x @nullxception
        <br />
        <br /><b>Changelog</b>
        <br />$list_changelog
        <br />
        <br /><b>Download</b>
        <br />• <a href="$url_gdrive">Google Drive</a>
        <br />
        <br /><b>Notes</b>
        <br />• Since it's a CI build, there's no need to share to the channels
        <br />• Gambar hanyalah pemanis
        <br />
        <br />#StayDerped
    </>;
}
