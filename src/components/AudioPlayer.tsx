import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  return (
    <Card className="bg-gradient-to-r from-purple-800/30 to-pink-800/30 border-purple-400/30 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            🎵 В эфире сейчас
          </h2>
          <p className="text-purple-200">Лучшие хиты для тебя</p>
        </div>

        {/* Pulsing Visualization */}
        <div className="flex justify-center mb-6">
          <div className={`relative ${isPlaying ? "animate-pulse" : ""}`}>
            <div
              className={`w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center ${isPlaying ? "animate-pulse shadow-lg shadow-purple-500/50" : ""}`}
            >
              <div
                className={`w-24 h-24 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center ${isPlaying ? "animate-bounce" : ""}`}
              >
                <Icon
                  name={isPlaying ? "Pause" : "Play"}
                  size={32}
                  className="text-white"
                />
              </div>
            </div>
            {isPlaying && (
              <>
                <div className="absolute inset-0 w-32 h-32 rounded-full bg-purple-500/20 animate-ping"></div>
                <div className="absolute inset-0 w-32 h-32 rounded-full bg-pink-500/20 animate-ping animation-delay-75"></div>
                <div className="absolute inset-0 w-32 h-32 rounded-full bg-blue-500/20 animate-ping animation-delay-150"></div>
              </>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <Button
            onClick={togglePlay}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3"
            size="lg"
          >
            {isPlaying ? "Остановить" : "Слушать Radio Noumi"}
          </Button>

          {/* Volume Control */}
          <div className="flex items-center space-x-3">
            <Icon name="Volume2" size={20} className="text-purple-200" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-purple-800 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-purple-200 text-sm w-12">{volume}%</span>
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src="https://myradio24.org/61673"
          preload="none"
        />
      </CardContent>
    </Card>
  );
};
