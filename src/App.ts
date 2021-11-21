import * as dotenv from "dotenv";
import { Telegraf } from "telegraf";

dotenv.config();

export const rita = new Telegraf(process.env.BOT_TOKEN || "");

// Commands
require("./cmds/general");
require("./cmds/releasepost");

// Start rita
rita.launch();

// Enable graceful stop
process.once("SIGINT", () => rita.stop("SIGINT"));
process.once("SIGTERM", () => rita.stop("SIGTERM"));
