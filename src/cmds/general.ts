import { rita, username } from "../App";
import { isOldMessage } from "../utils/datetime";

rita.start(async (ctx) => {
  if (isOldMessage(ctx.message.date)) return;
  const firstName = ctx.message.from.first_name;
  const chat = await ctx.getChat();
  if (chat.type != "private") return;

  try {
    ctx.reply(`Okaerinasai, ${firstName}-sama`);
  } catch (error) {
    ctx.leaveChat();
    console.error(error);
  }
});

rita.hears(/hey rita,.*(a.+|)r.*(y.+|)u ther/gim, async (ctx) => {
  if (ctx.update.message.from.username != username) return;
  if (isOldMessage(ctx.update.message.date)) return;

  ctx.reply(`at your service, kanchou-sama`, {
    reply_to_message_id: ctx.update.message.message_id,
  });
});

rita.hears(/hey rita$/gim, async (ctx) => {
  if (ctx.update.message.from.username != username) return;
  if (isOldMessage(ctx.update.message.date)) return;

  ctx.reply(`at your service, kanchou-sama`, {
    reply_to_message_id: ctx.update.message.message_id,
  });
});
