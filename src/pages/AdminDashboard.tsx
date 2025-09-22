import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Music, Plus, Edit, Trash2, Users, Play, LogOut } from "lucide-react";
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
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [songs, setSongs] = useState<Song[]>([
    { id: "1", title: "Cosmic Dreams", artist: "Luna Nova", album: "Stellar Nights", duration: "3:45", genre: "Electronic" },
    { id: "2", title: "Electric Pulse", artist: "Neon Waves", album: "Digital Reality", duration: "4:12", genre: "Synthwave" },
    { id: "3", title: "Midnight Jazz", artist: "Blue Notes", album: "After Hours", duration: "5:28", genre: "Jazz" },
  ]);

  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    album: "",
    duration: "",
    genre: "",
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddSong = () => {
    if (!newSong.title || !newSong.artist) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive",
      });
      return;
    }

    const song: Song = {
      id: Date.now().toString(),
      ...newSong,
    };

    setSongs([...songs, song]);
    setNewSong({ title: "", artist: "", album: "", duration: "", genre: "" });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Song added successfully",
    });
  };

  const handleDeleteSong = (id: string) => {
    setSongs(songs.filter(song => song.id !== id));
    toast({
      title: "Success",
      description: "Song deleted successfully",
    });
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-card border-b border-border/50 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Music className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">MelodyStream Admin</h1>
              <p className="text-muted-foreground">Manage your music platform</p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Songs</CardTitle>
              <Music className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{songs.length}</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">1,234</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Plays</CardTitle>
              <Play className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">45,678</div>
              <p className="text-xs text-muted-foreground">+23% from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Songs Management */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Song Management</CardTitle>
                <CardDescription>Add, edit, or remove songs from your platform</CardDescription>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="music" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Song
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card">
                  <DialogHeader>
                    <DialogTitle>Add New Song</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add a new song to your platform
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={newSong.title}
                        onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                        placeholder="Song title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="artist">Artist *</Label>
                      <Input
                        id="artist"
                        value={newSong.artist}
                        onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                        placeholder="Artist name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="album">Album</Label>
                      <Input
                        id="album"
                        value={newSong.album}
                        onChange={(e) => setNewSong({ ...newSong, album: e.target.value })}
                        placeholder="Album name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={newSong.duration}
                        onChange={(e) => setNewSong({ ...newSong, duration: e.target.value })}
                        placeholder="e.g., 3:45"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="genre">Genre</Label>
                      <Input
                        id="genre"
                        value={newSong.genre}
                        onChange={(e) => setNewSong({ ...newSong, genre: e.target.value })}
                        placeholder="Music genre"
                      />
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="music" onClick={handleAddSong}>
                        Add Song
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cover</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Artist</TableHead>
                  <TableHead>Album</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {songs.map((song) => (
                  <TableRow key={song.id}>
                    <TableCell>
                      <img 
                        src={albumPlaceholder} 
                        alt="Album cover" 
                        className="w-12 h-12 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{song.title}</TableCell>
                    <TableCell>{song.artist}</TableCell>
                    <TableCell>{song.album}</TableCell>
                    <TableCell>{song.duration}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{song.genre}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteSong(song.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;