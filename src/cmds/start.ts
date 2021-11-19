import { rita } from "../App";

rita.start((ctx) => {
  const firstName = ctx.message.from.first_name;
  ctx.reply(`Okaerinasai, ${firstName}-sama`);
});
