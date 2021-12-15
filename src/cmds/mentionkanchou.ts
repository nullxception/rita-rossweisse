import { rita, username } from "../App";
import fs from "fs";
import path from "path";
import { isOldMessage } from "../utils/datetime";

const userMatch = new RegExp(`.*@${username}.*`, "gim");
rita.hears(userMatch, (ctx) => {
  if (isOldMessage(ctx.update.message.date)) return;

  try {
    const friendlist = fs
      .readFileSync(path.resolve(__dirname, "../assets/data.friends.txt"))
      .toString()
      .split("\n");

    if (!friendlist.includes(ctx.update.message.from.username ?? "")) {
      ctx.reply("Please do not mention kanchou-sama, he still busy", {
        reply_to_message_id: ctx.update.message.message_id,
      });
    }
  } catch (err) {
    console.error(err);
  }
});
