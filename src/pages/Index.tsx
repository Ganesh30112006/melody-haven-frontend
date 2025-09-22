import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Play, Users, Headphones, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import musicHero from "@/assets/music-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img 
          src={musicHero} 
          alt="Music streaming hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 hero-gradient opacity-60" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center mb-8">
            <Music className="w-16 h-16 text-primary animate-float" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text music-gradient">
            MelodyStream
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience music like never before. Stream, discover, and connect with the beats that move your soul.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/login">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="glass" size="lg" className="text-lg px-8 py-6">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Songs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">50K+</div>
              <div className="text-sm text-muted-foreground">Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Streaming</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose MelodyStream?</h2>
            <p className="text-xl text-muted-foreground">
              Discover the perfect blend of technology and music
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card hover-lift">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Headphones className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>High Quality Audio</CardTitle>
                <CardDescription>
                  Experience crystal clear sound with our premium audio streaming technology
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover-lift">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <CardTitle>Social Experience</CardTitle>
                <CardDescription>
                  Connect with friends, share playlists, and discover new music together
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover-lift">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Smart Recommendations</CardTitle>
                <CardDescription>
                  AI-powered suggestions that adapt to your taste and mood
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="glass-card p-12">
            <CardContent>
              <h2 className="text-4xl font-bold mb-6">Ready to Start Your Musical Journey?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join millions of music lovers and discover your next favorite song today.
              </p>
              <Link to="/login">
                <Button variant="music" size="lg" className="text-lg px-12 py-6 glow-effect">
                  Start Listening Now
                  <Music className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music className="w-6 h-6 text-primary" />
            <span className="font-semibold">MelodyStream</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 MelodyStream. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
