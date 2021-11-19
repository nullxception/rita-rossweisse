import { ReleaseType } from "../ReleaseType";
import { ReleaseWriter } from "../ReleaseWriter";
import { rita } from "../App";
import * as fs from "fs";

rita.command("writeci", async (ctx) => {
  const firstName = ctx.message.from.first_name;
  const bannerImage = process.env.BANNER_CI || "assets/banner-ci.png";

  if (ctx.message.from.username != "nullxception") {
    ctx.reply(
      `Gomennasai, ${firstName}-sama, you don't have permission to do this.`
    );
    return;
  }

  await ctx.reply("Kashikomarimashita, kanchou-sama");
  ctx.reply("Creating post...");

  const writer = new ReleaseWriter(ReleaseType.CI, ctx.message.text);
  const caption = await writer.createCaption();
  await ctx.replyWithPhoto(
    {
      source: fs.createReadStream(bannerImage),
    },
    {
      parse_mode: "HTML",
      caption: caption,
    }
  );
});
