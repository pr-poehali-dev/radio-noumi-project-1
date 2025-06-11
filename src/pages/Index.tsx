import { AudioPlayer } from "@/components/AudioPlayer";
import { ListenerCounter } from "@/components/ListenerCounter";
import { LiveChat } from "@/components/LiveChat";
import { RequestForms } from "@/components/RequestForms";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <header className="text-center py-8">
        <h1 className="text-6xl font-bold text-white mb-2 font-montserrat">
          Radio Noumi
        </h1>
        <p className="text-xl text-purple-200">Твоя любимая музыка 24/7</p>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Player & Counter */}
          <div className="lg:col-span-1 space-y-6">
            <AudioPlayer />
            <ListenerCounter />
          </div>

          {/* Middle Column - Chat */}
          <div className="lg:col-span-1">
            <LiveChat />
          </div>

          {/* Right Column - Forms */}
          <div className="lg:col-span-1">
            <RequestForms />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
