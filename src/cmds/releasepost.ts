import { ReleaseWriter } from "../core/ReleaseWriter";
import { rita, username } from "../App";
import { isOldMessage } from "../utils/datetime";

rita.hears(/hey rita,.*post .*(it|this)/gim, async (ctx) => {
  if (ctx.update.message.from.username != username) return;
  if (isOldMessage(ctx.update.message.date)) return;

  await ctx.reply("Kashikomarimashita, kanchou-sama", {
    reply_to_message_id: ctx.update.message.message_id,
  });
  ctx.reply("Creating post...");

  try {
    const writer = new ReleaseWriter(ctx.message.text);
    const caption = writer.caption();
    const photo = { source: writer.data.banner };
    await ctx.replyWithPhoto(photo, {
      parse_mode: "HTML",
      caption: caption,
    });
  } catch (err) {
    await ctx.reply(
      "Gomennasai, kanchou-sama,\nI can't complete the task.\nHere's the error log:",
      {
        reply_to_message_id: ctx.update.message.message_id,
      }
    );
    ctx.reply(String(err));
  }
});
