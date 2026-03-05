import { SlashCommandBuilder } from "discord.js";

const OWNER_ID = "968837432617365564";
let ownerOnly = false;

export default {
  data: new SlashCommandBuilder()
    .setName("toggle")
    .setDescription("모든 명령어를 히원만 쓸 수 있게 하거나 해제함!"),
  async execute(interaction) {
    if (interaction.user.id !== OWNER_ID)
      return interaction.reply({ content: "이건 히원만 가능 😅", ephemeral: true });
    ownerOnly = !ownerOnly;
    await interaction.reply({ content: `✅ 이제 ${ownerOnly ? "히원만" : "모두"} 사용 가능!` });
  },
};
