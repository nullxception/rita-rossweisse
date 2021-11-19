import * as dotenv from "dotenv";
import { Telegraf } from "telegraf";
import * as fs from "fs";

import { ReleaseWriter } from "./ReleaseWriter";
import { ReleaseType } from "./ReleaseType";

dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN || "");

bot.start((ctx) => {
  const firstName = ctx.message.from.first_name;
  ctx.reply(`Okaerinasai, ${firstName}-sama`);
});

bot.command("writerelease", async (ctx) => {
  const firstName = ctx.message.from.first_name;
  const bannerImage =
    process.env.BANNER_RELEASE || "assets/banner-official.png";

  if (ctx.message.from.username != "nullxception") {
    ctx.reply(
      `Gomennasai, ${firstName}-sama, you don't have permission to do this.`
    );
    return;
  }

  await ctx.reply("Kashikomarimashita, kanchou-sama");
  ctx.reply("Creating post...");

  const writer = new ReleaseWriter(ReleaseType.Official, ctx.message.text);
  const caption = await writer.createCaption();
  await ctx.replyWithPhoto(
    {
      source: fs.createReadStream(bannerImage),
    },
    {
      parse_mode: "MarkdownV2",
      caption: caption,
    }
  );
});

bot.command("writeci", async (ctx) => {
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
      parse_mode: "MarkdownV2",
      caption: caption,
    }
  );
});

// Start rita
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
