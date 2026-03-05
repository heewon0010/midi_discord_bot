import { SlashCommandBuilder } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const OWNER_ID = "968837432617365564";

// 파일 경로 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const statePath = path.join(__dirname, "..", "data", "state.json");

export default {
  data: new SlashCommandBuilder()
    .setName("saytoggle")
    .setDescription("SAY (채팅) 명령어를 켜거나 끔!"),

  async execute(interaction) {
    if (interaction.user.id !== OWNER_ID)
      return interaction.reply({ content: "이건 히원만 가능 😅", ephemeral: true });

    // 파일 읽기
    const state = JSON.parse(fs.readFileSync(statePath, "utf8"));

    // 값 반전
    state.sayEnabled = !state.sayEnabled;

    // 파일 저장
    fs.writeFileSync(statePath, JSON.stringify(state, null, 2));

    await interaction.reply({
      content: ` SAY 명령어 ${state.sayEnabled ? " 켜짐" : " 꺼짐"}!`
    });
  },
};
