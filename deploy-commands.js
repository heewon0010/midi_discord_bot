import { REST, Routes, SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

// 🔧 명령어 등록
const commands = [
  new SlashCommandBuilder()
    .setName("say")
    .setDescription("입력한 문장을 미디가 말해줌!!")
    .addStringOption(option =>
      option.setName("message")
        .setDescription("미디가 말할 문장")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("toggle")
    .setDescription("모든 명령어를 히원만 쓸 수 있게 하거나 해제함!"),
  new SlashCommandBuilder()
    .setName("saytoggle")
    .setDescription("SAY (채팅) 명령어를 켜거나 끔!"),
  new SlashCommandBuilder()
    .setName("join")
    .setDescription("미디를 음챗으로 부름!"),
  new SlashCommandBuilder()
    .setName("leave")
    .setDescription("미디를 음챗에서 내보냄!"),
  new SlashCommandBuilder()
    .setName("tts")
    .setDescription("미디가 말함!! (ElevenLabs TTS 사용)")
    .addStringOption(option =>
      option.setName("message")
        .setDescription("봇이 말할 문장")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("midi")
    .setDescription("미디가 음을 연주함 🎵")
    .addStringOption(option =>
      option.setName("notes")
        .setDescription("예: C4-D4-E4 또는 A#4-Bb4")
        .setRequired(true)
    )
];

// ✅ 환경 변수 불러오기
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID; // 테스트용 서버 ID 넣기

(async () => {
  try {
    console.log("🚀 명령어 등록 중...");

    // ⚡ 서버 한정 명령어 등록 (빠르게 반영됨)
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log(`✅ 서버 한정 명령어 등록 완료! (서버 ID: ${GUILD_ID})`);

  } catch (err) {
    console.error("❌ 명령어 등록 실패:", err);
  }
})();
