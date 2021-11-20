import { ReleaseType } from "../ReleaseType";
import { ReleaseWriter } from "../ReleaseWriter";
import { rita } from "../App";

rita.command("writerelease", async (ctx) => {
  const firstName = ctx.message.from.first_name;
  if (ctx.message.from.username != "nullxception") {
    ctx.reply(
      `Gomennasai, ${firstName}-sama, you don't have permission to do this.`
    );
    return;
  }

  await ctx.reply("Kashikomarimashita, kanchou-sama");
  ctx.reply("Creating post...");

  try {
    const writer = new ReleaseWriter(ReleaseType.CI, ctx.message.text);
    const caption = await writer.createCaption();
    const photo = { source: writer.banner };
    await ctx.replyWithPhoto(photo, {
      parse_mode: "HTML",
      caption: caption,
    });
  } catch (err) {
    ctx.reply(
      "Gomennasai, kanchou-sama, I can't complete the task.\nHere's the error log:"
    );
    ctx.reply(String(err));
  }
});
