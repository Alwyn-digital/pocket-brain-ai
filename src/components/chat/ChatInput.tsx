import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Send, Paperclip, Mic, MicOff } from 'lucide-react';
import FileUpload from './FileUpload';
import VoiceRecorder from './VoiceRecorder';

interface ChatInputProps {
  onSendMessage: (content: string, files?: File[]) => void;
  disabled: boolean;
}

const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!message.trim() && attachedFiles.length === 0) return;
    
    let content = message.trim();
    
    // If we have files, add them to the message
    if (attachedFiles.length > 0) {
      const fileList = attachedFiles.map(f => f.name).join(', ');
      content += `\n\n[Attached files: ${fileList}]`;
    }
    
    onSendMessage(content, attachedFiles);
    setMessage('');
    setAttachedFiles([]);
    setShowFileUpload(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileUpload = (files: File[]) => {
    setAttachedFiles(prev => [...prev, ...files]);
    setShowFileUpload(false);
    
    toast({
      title: "Files attached",
      description: `${files.length} file(s) ready to send`,
    });
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleVoiceResult = (transcript: string) => {
    setMessage(prev => prev + (prev ? ' ' : '') + transcript);
    setShowVoiceRecorder(false);
    
    // Focus the textarea after voice input
    textareaRef.current?.focus();
  };

  return (
    <div className="space-y-3">
      {/* Attached files display */}
      {attachedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {attachedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-muted px-3 py-1 rounded text-sm"
            >
              <Paperclip className="w-3 h-3" />
              <span className="truncate max-w-[200px]">{file.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="h-auto p-0 text-muted-foreground hover:text-destructive"
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            disabled={disabled}
            className="min-h-[44px] max-h-32 resize-none pr-12"
          />
        </div>
        
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowFileUpload(!showFileUpload)}
            disabled={disabled}
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowVoiceRecorder(!showVoiceRecorder)}
            disabled={disabled}
            className={isRecording ? "text-destructive" : ""}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          
          <Button
            onClick={handleSubmit}
            disabled={disabled || (!message.trim() && attachedFiles.length === 0)}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* File Upload Panel */}
      {showFileUpload && (
        <FileUpload
          onFilesSelected={handleFileUpload}
          onClose={() => setShowFileUpload(false)}
        />
      )}

      {/* Voice Recorder Panel */}
      {showVoiceRecorder && (
        <VoiceRecorder
          onTranscript={handleVoiceResult}
          onClose={() => setShowVoiceRecorder(false)}
          onRecordingChange={setIsRecording}
        />
      )}
    </div>
  );
};

export default ChatInput;