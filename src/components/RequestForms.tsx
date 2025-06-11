import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

export const RequestForms = () => {
  const [songRequest, setSongRequest] = useState("");
  const [greeting, setGreeting] = useState("");
  const [isSubmittingSong, setIsSubmittingSong] = useState(false);
  const [isSubmittingGreeting, setIsSubmittingGreeting] = useState(false);

  const handleSongRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!songRequest.trim()) return;

    setIsSubmittingSong(true);

    // Имитация отправки
    setTimeout(() => {
      setSongRequest("");
      setIsSubmittingSong(false);
      alert("Заявка на песню отправлена! 🎵");
    }, 1000);
  };

  const handleGreeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!greeting.trim()) return;

    setIsSubmittingGreeting(true);

    // Имитация отправки
    setTimeout(() => {
      setGreeting("");
      setIsSubmittingGreeting(false);
      alert("Привет отправлен в эфир! 📻");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Song Request Form */}
      <Card className="bg-gradient-to-r from-orange-800/30 to-red-800/30 border-orange-400/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Icon name="Music" size={24} className="mr-2 text-orange-400" />
            Заявка на песню
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSongRequest} className="space-y-4">
            <div>
              <label className="block text-orange-200 text-sm font-medium mb-2">
                Название песни
              </label>
              <Input
                value={songRequest}
                onChange={(e) => setSongRequest(e.target.value)}
                placeholder="Напишите название песни"
                className="bg-white/10 border-orange-400/30 text-white placeholder:text-orange-200/60"
                disabled={isSubmittingSong}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmittingSong || !songRequest.trim()}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
            >
              {isSubmittingSong ? (
                <>
                  <Icon
                    name="Loader2"
                    size={16}
                    className="mr-2 animate-spin"
                  />
                  Отправляем...
                </>
              ) : (
                <>
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить заявку
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Greeting Form */}
      <Card className="bg-gradient-to-r from-pink-800/30 to-purple-800/30 border-pink-400/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Icon name="Heart" size={24} className="mr-2 text-pink-400" />
            Передать привет
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleGreeting} className="space-y-4">
            <div>
              <label className="block text-pink-200 text-sm font-medium mb-2">
                Ваше сообщение
              </label>
              <Textarea
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                placeholder="Напишите привет или поздравление..."
                className="bg-white/10 border-pink-400/30 text-white placeholder:text-pink-200/60 min-h-[100px]"
                disabled={isSubmittingGreeting}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmittingGreeting || !greeting.trim()}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
            >
              {isSubmittingGreeting ? (
                <>
                  <Icon
                    name="Loader2"
                    size={16}
                    className="mr-2 animate-spin"
                  />
                  Отправляем...
                </>
              ) : (
                <>
                  <Icon name="Send" size={16} className="mr-2" />
                  Передать в эфир
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Info */}
      <div className="text-center text-purple-200 text-sm">
        <p>📧 Сообщения отправляются на:</p>
        <p>swi79@bk.ru • toly.akuloff@yandex.ru</p>
      </div>
    </div>
  );
};
