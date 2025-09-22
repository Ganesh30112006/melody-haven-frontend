import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Music, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Heart, 
  Search,
  Home,
  Library,
  LogOut,
  Shuffle,
  Repeat
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import albumPlaceholder from "@/assets/album-placeholder.jpg";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  genre: string;
  liked: boolean;
}

const UserDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState([30]);
  const [volume, setVolume] = useState([70]);
  const [searchTerm, setSearchTerm] = useState("");

  const [songs] = useState<Song[]>([
    { id: "1", title: "Cosmic Dreams", artist: "Luna Nova", album: "Stellar Nights", duration: "3:45", genre: "Electronic", liked: true },
    { id: "2", title: "Electric Pulse", artist: "Neon Waves", album: "Digital Reality", duration: "4:12", genre: "Synthwave", liked: false },
    { id: "3", title: "Midnight Jazz", artist: "Blue Notes", album: "After Hours", duration: "5:28", genre: "Jazz", liked: true },
    { id: "4", title: "Solar Flare", artist: "Cosmic Entity", album: "Space Odyssey", duration: "4:33", genre: "Ambient", liked: false },
    { id: "5", title: "Digital Dreams", artist: "Cyber Sound", album: "Future Vibes", duration: "3:21", genre: "Electronic", liked: true },
  ]);

  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.album.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const likedSongs = songs.filter(song => song.liked);

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    toast({
      title: "Now Playing",
      description: `${song.title} by ${song.artist}`,
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLikeSong = (songId: string) => {
    // In a real app, this would update the backend
    toast({
      title: "Added to Liked Songs",
      description: "Song added to your favorites",
    });
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 glass-card border-r border-border/50 p-4">
        <div className="flex items-center gap-3 mb-8">
          <Music className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold">MelodyStream</h1>
            <p className="text-sm text-muted-foreground">Your Music Hub</p>
          </div>
        </div>

        <nav className="space-y-2 mb-8">
          <Button variant="glass" className="w-full justify-start">
            <Home className="w-4 h-4 mr-3" />
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Search className="w-4 h-4 mr-3" />
            Search
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Library className="w-4 h-4 mr-3" />
            Your Library
          </Button>
        </nav>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Playlists
          </h3>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-sm">
              <Heart className="w-4 h-4 mr-3 text-primary" />
              Liked Songs ({likedSongs.length})
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sm">
              Recently Played
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sm">
              My Playlist #1
            </Button>
          </div>
        </div>

        <div className="mt-auto pt-8">
          <Button variant="ghost" onClick={handleLogout} className="w-full justify-start">
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-6 border-b border-border/50">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search songs, artists, albums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            {/* Featured Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Good afternoon</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {likedSongs.slice(0, 6).map((song) => (
                  <Card key={song.id} className="glass-card hover-lift cursor-pointer" onClick={() => handlePlaySong(song)}>
                    <CardContent className="flex items-center p-4">
                      <img 
                        src={albumPlaceholder} 
                        alt="Album cover" 
                        className="w-16 h-16 rounded-md object-cover mr-4"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{song.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* All Songs */}
            <section>
              <h2 className="text-2xl font-bold mb-4">All Songs</h2>
              <div className="space-y-2">
                {filteredSongs.map((song, index) => (
                  <Card key={song.id} className="glass-card hover-lift cursor-pointer transition-all duration-200">
                    <CardContent className="flex items-center p-4">
                      <div className="w-8 text-center text-muted-foreground mr-4">
                        {index + 1}
                      </div>
                      <img 
                        src={albumPlaceholder} 
                        alt="Album cover" 
                        className="w-12 h-12 rounded-md object-cover mr-4"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{song.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                      </div>
                      <div className="hidden md:block text-sm text-muted-foreground mr-4">
                        {song.album}
                      </div>
                      <Badge variant="secondary" className="mr-4">
                        {song.genre}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLikeSong(song.id);
                          }}
                        >
                          <Heart className={`w-4 h-4 ${song.liked ? 'text-primary fill-primary' : ''}`} />
                        </Button>
                        <span className="text-sm text-muted-foreground mr-2">{song.duration}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlaySong(song);
                          }}
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* Music Player */}
        {currentSong && (
          <footer className="glass-card border-t border-border/50 p-4">
            <div className="flex items-center justify-between">
              {/* Current Song Info */}
              <div className="flex items-center gap-4 flex-1">
                <img 
                  src={albumPlaceholder} 
                  alt="Current song" 
                  className="w-14 h-14 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <h4 className="font-semibold truncate">{currentSong.title}</h4>
                  <p className="text-sm text-muted-foreground truncate">{currentSong.artist}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              {/* Player Controls */}
              <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Shuffle className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button variant="music" size="sm" onClick={handlePlayPause}>
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <SkipForward className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Repeat className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <span className="text-xs text-muted-foreground">1:23</span>
                  <Slider
                    value={currentTime}
                    onValueChange={setCurrentTime}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground">{currentSong.duration}</span>
                </div>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-2 flex-1 justify-end">
                <Volume2 className="w-4 h-4" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-24"
                />
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;