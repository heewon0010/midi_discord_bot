import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("🧹 등록된 명령어 전체 삭제 중...");

    // ✅ 특정 서버(길드)에 등록된 명령어 전체 삭제
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: [] }
    );
    console.log("✅ 길드 명령어 삭제 완료!");

    // ✅ 혹시 글로벌로 등록된 명령어도 함께 삭제
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: [] }
    );
    console.log("✅ 전역 명령어 삭제 완료!");

    console.log("🎉 모든 명령어 삭제 완료!");
  } catch (err) {
    console.error("❌ 명령어 삭제 실패:", err);
  }
})();
