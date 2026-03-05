import { Client, GatewayIntentBits, REST, Routes, Collection } from "discord.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// 명령어 로드
client.commands = new Collection();
const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  client.commands.set(command.default.data.name, command.default);
  commands.push(command.default.data.toJSON());
}

// 슬래시 명령 등록
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
(async () => {
  try {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log("✅ 슬래시 명령 등록 완료!");
  } catch (err) {
    console.error("명령어 등록 실패:", err);
  }
})();

// SAY 상태 파일 경로
const statePath = path.join(__dirname, "data", "state.json");

// 일반 메시지 SAY 기능 (대문자만, 원본 메시지 삭제 + toggle 반영)
client.on("messageCreate", async msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith("SAY ")) return;

  // 파일에서 sayEnabled 읽어오기
  const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
  if (!state.sayEnabled) return;

  const text = msg.content.slice(4).trim();
  if (!text) return;

  try {
    await msg.channel.send(text);
    await msg.delete().catch(() => {});
  } catch (err) {
    console.error("SAY 처리 오류:", err);
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({ content: "😥 명령 실행 중 오류 발생!", ephemeral: true });
  }
});

client.once("ready", () => {
  console.log(`🤖 로그인 완료! ${client.user.tag}`);
});

client.login(process.env.TOKEN);
