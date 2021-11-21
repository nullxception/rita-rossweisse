import { ReleaseWriter } from "../core/ReleaseWriter";
import { rita } from "../App";

rita.hears(/hey rita,.*post .*(it|this)/gim, async (ctx) => {
  if (ctx.message.from.username != "nullxception") return;

  await ctx.reply("Kashikomarimashita, kanchou-sama");
  ctx.reply("Creating post...");

  try {
    const writer = new ReleaseWriter(ctx.message.text);
    const caption = await writer.createCaption();
    const photo = { source: writer.data.banner };
    await ctx.replyWithPhoto(photo, {
      parse_mode: "HTML",
      caption: caption,
    });
  } catch (err) {
    await ctx.reply(
      "Gomennasai, kanchou-sama,\nI can't complete the task.\nHere's the error log:"
    );
    ctx.reply(String(err));
  }
});
