import { BotBuilderCloudAdapter } from "@microsoft/teamsfx";
import { TestCommandHandler } from "../commandHandlers/testCommandHandler"
import { WhereCommandHandler } from "../commandHandlers/whereCommandHandler";
import ConversationBot = BotBuilderCloudAdapter.ConversationBot;
import config from "./config";
import { DeleteCommandHandler } from "../commandHandlers/deleteCommandHandler";
import { ClearCommandHandler } from "../commandHandlers/clearCommandHandler";
import { CardActionHandler } from "../commandHandlers/cardActionHandler";
import { CheckCommandHandler } from "../commandHandlers/checkActionHandler";

// Create bot.
export const bot = new ConversationBot({
  // The bot id and password to create CloudAdapter.
  // See https://aka.ms/about-bot-adapter to learn more about adapters.
  adapterConfig: {
    MicrosoftAppId: config.botId,
    MicrosoftAppPassword: config.botPassword,
    MicrosoftAppType: "MultiTenant",
  },
  // Enable notification
  notification: {
    enabled: true,
  },
  cardAction: {
    enabled: true,
    actions: [
      new CardActionHandler()
    ]
  },
  command: {
    enabled: true,
    commands: [
      new TestCommandHandler(),
      new WhereCommandHandler(),
      new DeleteCommandHandler(),
      new ClearCommandHandler(),
      new CheckCommandHandler()
    ]
  }
});
