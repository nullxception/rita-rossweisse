import * as dotenv from "dotenv";
import { Telegraf } from "telegraf";

dotenv.config();

const token = process.env.BOT_TOKEN;
if (token === undefined) {
  throw new Error("BOT_TOKEN must be provided!");
}

export const rita = new Telegraf(token);

// Commands
require("./cmds/general");
require("./cmds/releasepost");

// Start rita
rita.launch();

// Enable graceful stop
process.once("SIGINT", () => rita.stop("SIGINT"));
process.once("SIGTERM", () => rita.stop("SIGTERM"));
