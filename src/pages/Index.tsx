import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Upload, Mic, Bot } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/chat');
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
            <Bot className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            AI Chat Assistant
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the power of AI conversation with support for text, voice, and document uploads. 
            Your intelligent assistant is ready to help.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/auth')} size="lg" className="px-8">
              Get Started
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Smart Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Engage in natural conversations with our advanced AI assistant powered by ChatGPT
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Document Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Upload and discuss documents, images, and files to get contextual AI assistance
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Mic className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Voice Input</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Use voice recording with real-time transcription for hands-free interaction
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to start chatting?</h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of users who are already experiencing the power of AI assistance
              </p>
              <Button onClick={() => navigate('/auth')} size="lg" className="px-8">
                Start Your First Chat
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
