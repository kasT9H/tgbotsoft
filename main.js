import { Telegraf, Markup } from "telegraf";
import LocalSession from "telegraf-session-local";

const token = "8192965107:AAGjEGgUFbVeCYGQ0j5JgQIsXz3QqS2-TLI";
const webUrl = "https://ludostrateg.ru/";

const activations = [
  "MNXKQ-WY2CT",
  "JWBJ2-T68TQ",
  "VK7JG-NPHTM",
  "X6XXQ-RXX86",
];

let isActivation = false;

const bot = new Telegraf(token);

// Инициализация сессии
bot.use(new LocalSession({ database: 'sessions.json' }).middleware());

// Функция для получения текста на нужном языке
const getText = (ctx, ru, en) => {
  return ctx.session.language === "ru" ? ru : en;
};

bot.start((ctx) => {
  ctx.replyWithPhoto(
    {
      source: "assets/1.jpg",
    },
    {
      caption: "Please select your language:",
      ...Markup.inlineKeyboard([
        Markup.button.callback("Русский 🇷🇺", "lang_ru"),
        Markup.button.callback("English 🇺🇸", "lang_en"),
      ]),
    },
  );
});

bot.action("lang_ru", async (ctx) => {
  ctx.deleteMessage(); // Удаляем сообщение с выбором языка
  ctx.session.language = "ru";
  sendInitialMessage(ctx);
});

bot.action("lang_en", async (ctx) => {
  ctx.deleteMessage(); // Удаляем сообщение с выбором языка
  ctx.session.language = "en";
  sendInitialMessage(ctx);
});

const sendInitialMessage = (ctx) => {
  ctx.replyWithPhoto(
    {
      source: "assets/2.jpg",
    },
    {
      caption: getText(
        ctx,
        "Этот СОФТ разработан специально для игр от 🔹1WIN🔹\n" +
        "Пользуясь этим софтом ТЫ получаешь⤵️\n" +
        "❗️Сигналы с проходимостью 80-85%\n" +
        "❗️Бонусы для постоянных игроков\n" +
        "❗️ЧТОБЫ АКТИВИРОВАТЬ СОФТ❗️⤵️\n" +
        "❗️По всем вопросам пиши сюда ➡️ @alexmanagersoft",
        "This SOFTWARE is specially designed for the games from 🔹1WIN🔹\n" +
        "By using this software YOU get⤵️\n" +
        "❗️Signals with a pass rate of 80-85%\n" +
        "❗️Bonuses for regular players\n" +
        "❗️TO ACTIVATE THE SOFT❗️⤵️\n" +
        "❗️For any questions, write here ➡️ @alexmanagersoft"
      ),
      ...Markup.inlineKeyboard([
        Markup.button.callback(getText(ctx, "Информация о боте", "Bot information"), "info"),
      ]),
    },
  );
};

bot.action("info", async (ctx) => {
  ctx.reply(
    getText(
      ctx,
      "Данный 🤖СОФТ🤖 создан для обхода игр от 🔹1WIN🔹\n" +
      "Он работает на основе AI и почти не промахивается, но надо помнить что он не может угадывать в 100% случаев🤖\n\n" +
      "Данный бот ежедневно обновляется и улучшается, чтобы увеличить шанс выигрыша!🥇\n\n" +
      "Количество угаданных игр: 845.358🎰\n" + // этот момент посмотреть
      "❌Актуальная версия бота: 2.5-b8 (beta)🔧\n" +
      "❗️❗️По всем вопросам пиши сюда ➡️ @alexmanagersoft\n",
      "This 🤖SOFTWARE🤖 is designed to bypass games from 🔹1WIN🔹\n" +
      "It works based on AI and almost never misses, but remember that it cannot guess in 100% of cases🤖\n\n" +
      "This bot is updated and improved daily to increase the chance of winning!🥇\n\n" +
      "Number of guessed games: 845,358🎰\n" + // этот момент посмотреть
      "❌Current bot version: 2.5-b8 (beta)🔧\n" +
      "❗️❗️For any questions, write here ➡️  @alexmanagersoft\n"
    ),
    Markup.inlineKeyboard([
      Markup.button.callback(getText(ctx, "Активировать бота", "Activate bot"), "activate"),
    ]),
  );
});

bot.action("activate", (ctx) => {
  ctx.reply(
    getText(
      ctx,
      "Выбери тариф 👇(для бесплатного периода на 3 дня введите ключ активации)\n\n❗️Ключ активации ты можешь получить тут ➡️ @alexmanagersoft",
      "Choose a tariff plan👇(for a free 3-day period, enter the activation key)\n\n❗️You can get the activation key here ➡️ @alexmanagersoft"
    ),
    Markup.inlineKeyboard([
      [Markup.button.url("✅90.000₽ (доступ навсегда)", "http://24time2pay.ru/pay-id90.html")],
      [Markup.button.url("✅30.000₽ (доступ на месяц)", "http://24time2pay.ru/pay-id30.html")],
      [Markup.button.callback("🚀3 ДНЯ БЕСПЛАТНО🚀", "free_trial")],
    ]),
  );
  isActivation = true;
});

bot.action("free_trial", (ctx) => {
  ctx.reply(
    getText(
      ctx,
      "Введите ключ активации для бесплатного периода на 3 дня:",
      "Enter the activation key for the free 3-day period:"
    ),
  );
});

bot.on("text", (ctx) => {
  if (isActivation) {
    const userCode = ctx.message.text;
    if (activations.includes(userCode)) {
      ctx.reply(
        getText(
          ctx,
          "Софт активирован!",
          "Soft activated!"
        ),
        Markup.inlineKeyboard([Markup.button.webApp(getText(ctx, "ЗАПУСТИТЬ БОТА", "RUN BOT"), webUrl)]),
      );
      isActivation = false;
    } else {
      ctx.reply(getText(ctx, "Неверный ключ активации!", "Invalid activation key!"));
    }
  }
});

bot.launch();