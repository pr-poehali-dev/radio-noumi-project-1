import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

interface ChatMessage {
  id: number;
  username: string;
  message: string;
  timestamp: Date;
  isUser?: boolean;
}

export const LiveChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineCount, setOnlineCount] = useState(1500000);
  const [userMessage, setUserMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const usernames = [
    "МузыкаЛюбитель",
    "ДимаМосква",
    "АняРадио",
    "МаксимЗвук",
    "КатяМелодия",
    "СергейБит",
    "ЛенаРитм",
    "АлексМузон",
    "ЮляХит",
    "ПавелБас",
    "ОльгаСонг",
    "ИванЗвезда",
    "НатаРок",
    "АртурБлюз",
    "ВераДжаз",
    "РоманТранс",
    "ЛизаПоп",
    "ГлебРейв",
    "ИраФанк",
    "ТимурХаус",
  ];

  const positiveMessages = [
    "Какая классная песня! 🎵",
    "Обожаю этот трек! ❤️",
    "Radio Noumi лучшее радио! 🔥",
    "Эта песня просто шикарна! ✨",
    "Слушаю каждый день, супер! 👍",
    "Отличная музыка, спасибо! 🙏",
    "Моя любимая станция! 💜",
    "Какой же крутой плейлист! 🎶",
    "Эта песня поднимает настроение! 😊",
    "Radio Noumi - это огонь! 🚀",
    "Слушаю на работе, очень круто! 💪",
    "Лучшая музыка в городе! 🏆",
    "Эти треки просто космос! 🌟",
    "Не могу оторваться от радио! 🎧",
    "Какая же атмосферная музыка! 🌙",
    "Отличный выбор песен! 👌",
    "Эта композиция просто wow! 🤩",
    "Слушаю с утра до вечера! ☀️",
    "Radio Noumi в моем сердце! 💝",
    "Эта песня цепляет за душу! 💫",
  ];

  useEffect(() => {
    // Генерируем сообщения каждые 2-5 секунд
    const messageInterval = setInterval(
      () => {
        const randomUsername =
          usernames[Math.floor(Math.random() * usernames.length)];
        const randomMessage =
          positiveMessages[Math.floor(Math.random() * positiveMessages.length)];

        const newMessage: ChatMessage = {
          id: Date.now(),
          username: randomUsername,
          message: randomMessage,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev.slice(-49), newMessage]); // Храним последние 50 сообщений
      },
      Math.random() * 3000 + 2000,
    );

    // Обновляем счетчик онлайн каждые 10 секунд
    const onlineInterval = setInterval(() => {
      const change = Math.floor(Math.random() * 100000) - 50000;
      setOnlineCount((prev) => Math.max(1500000, prev + change));
    }, 10000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(onlineInterval);
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      username: "Вы",
      message: userMessage.trim(),
      timestamp: new Date(),
      isUser: true,
    };

    setMessages((prev) => [...prev.slice(-49), newMessage]);
    setUserMessage("");
  };

  return (
    <Card className="bg-gradient-to-r from-blue-800/30 to-cyan-800/30 border-blue-400/30 backdrop-blur-sm h-[500px] flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center">
            <Icon name="MessageCircle" size={24} className="mr-2" />
            Живой чат
          </div>
          <div className="text-sm text-blue-200">
            {onlineCount.toLocaleString("ru-RU")} онлайн
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-transparent mb-4 max-h-[350px] min-h-[350px]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col rounded-lg p-2 ${
                msg.isUser
                  ? "bg-purple-600/30 border border-purple-400/30"
                  : "bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`font-semibold text-sm ${
                    msg.isUser ? "text-purple-300" : "text-cyan-300"
                  }`}
                >
                  {msg.username}
                </span>
                <span className="text-blue-300 text-xs">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
              <p className="text-white text-sm break-words whitespace-pre-wrap">
                {msg.message}
              </p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-2 flex-shrink-0">
          <Input
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Напишите сообщение..."
            className="flex-1 bg-white/10 border-blue-400/30 text-white placeholder-blue-200"
            maxLength={200}
          />
          <Button
            type="submit"
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Icon name="Send" size={16} />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
