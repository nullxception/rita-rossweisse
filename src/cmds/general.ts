import { rita, username } from "../App";

rita.start((ctx) => {
  const firstName = ctx.message.from.first_name;
  ctx.reply(`Okaerinasai, ${firstName}-sama`);
});

rita.hears(/hey rita,.*(a.+|)r.*(y.+|)u ther/gim, async (ctx) => {
  if (ctx.update.message.from.username != username) return;

  ctx.reply(`at your service, kanchou-sama`, {
    reply_to_message_id: ctx.update.message.message_id,
  });
});
