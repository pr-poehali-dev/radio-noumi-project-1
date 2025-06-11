import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export const ListenerCounter = () => {
  const [listeners, setListeners] = useState(2000000);

  useEffect(() => {
    const interval = setInterval(() => {
      // Случайное изменение от -50000 до +150000
      const change = Math.floor(Math.random() * 200000) - 50000;
      setListeners((prev) => {
        const newValue = prev + change;
        // Ограничиваем диапазон 2-10 млн
        return Math.max(2000000, Math.min(10000000, newValue));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString("ru-RU");
  };

  return (
    <Card className="bg-gradient-to-r from-green-800/30 to-emerald-800/30 border-green-400/30 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Icon name="Users" size={32} className="text-green-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">Нас слушают</h3>
          </div>

          <div className="text-4xl font-bold text-green-400 mb-2 animate-pulse">
            {formatNumber(listeners)}
          </div>

          <p className="text-green-200">слушателей онлайн</p>

          <div className="mt-4 flex justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-green-200 text-sm">В эфире</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-blue-200 text-sm">24/7</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
