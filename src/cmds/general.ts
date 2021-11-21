import { rita } from "../App";

rita.start((ctx) => {
  const firstName = ctx.message.from.first_name;
  ctx.reply(`Okaerinasai, ${firstName}-sama`);
});

rita.hears(/hey rita,.*(a.+|)r.*(y.+|)u ther/gim, async (ctx) => {
  if (ctx.message.from.username != "nullxception") return;

  ctx.reply(`at your service, kanchou-sama`);
});
