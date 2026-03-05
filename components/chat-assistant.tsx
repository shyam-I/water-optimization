'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Send, X, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SAMPLE_RESPONSES: Record<string, string> = {
  reduce: 'To reduce water consumption, I recommend: 1) Implementing smart irrigation systems that adjust based on soil moisture and weather, 2) Fixing leaks in distribution pipelines (can save 15-20%), 3) Promoting water-efficient agricultural practices, 4) Installing rainwater harvesting systems. Current potential savings: 75 ML/month.',
  irrigation: 'Based on current soil moisture levels and weather forecast, I recommend irrigation for Region A and Region C within the next 6 hours. Region B should wait 2 days as soil moisture is adequate. This schedule will optimize water use while maintaining plant health.',
  demand: 'Water demand prediction for next month shows a 12% increase due to expected temperature rise. Peak usage expected around mid-month. I recommend pre-positioning additional water supplies and activating water conservation protocols.',
  flood: 'Current flood risk analysis shows high risk for Basin A and moderate risk for Basin C. Water levels will approach critical threshold in 6 hours. Recommended actions: 1) Open spillway gates, 2) Alert downstream communities, 3) Activate emergency protocols.',
  efficiency: 'System efficiency metrics: Agriculture sector has 15% optimization potential, Industrial sector has 20% potential. Current irrigation efficiency is 87%, target is 95%. Implementing AI-based scheduling can achieve additional 8% savings.',
};

const QUICK_QUESTIONS = [
  { text: 'How can we reduce water consumption?', key: 'reduce' },
  { text: 'Show irrigation recommendations', key: 'irrigation' },
  { text: 'Predict next month\'s demand', key: 'demand' },
  { text: 'Current flood risk status', key: 'flood' },
  { text: 'System efficiency analysis', key: 'efficiency' },
];

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI Water Optimization Assistant. I can help you with water usage analysis, irrigation planning, flood risk assessment, and optimization recommendations. What would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find matching response
    const lowerText = text.toLowerCase();
    let responseText = SAMPLE_RESPONSES['reduce'];

    if (lowerText.includes('reduce') || lowerText.includes('consumption') || lowerText.includes('save')) {
      responseText = SAMPLE_RESPONSES['reduce'];
    } else if (lowerText.includes('irrigation') || lowerText.includes('recommend')) {
      responseText = SAMPLE_RESPONSES['irrigation'];
    } else if (lowerText.includes('demand') || lowerText.includes('predict')) {
      responseText = SAMPLE_RESPONSES['demand'];
    } else if (lowerText.includes('flood') || lowerText.includes('risk')) {
      responseText = SAMPLE_RESPONSES['flood'];
    } else if (lowerText.includes('efficiency') || lowerText.includes('optimize')) {
      responseText = SAMPLE_RESPONSES['efficiency'];
    } else {
      responseText = `I understand you're asking about "${text}". Based on current system data and AI analysis, I recommend consulting the relevant dashboard section for detailed information. Would you like me to direct you to a specific analysis module?`;
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: responseText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleQuickQuestion = (key: string) => {
    const question = QUICK_QUESTIONS.find(q => q.key === key)?.text || '';
    handleSendMessage(question);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-40"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-40 w-96 h-[600px] flex flex-col"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <Card className="bg-card border-border backdrop-blur-md h-full flex flex-col overflow-hidden">
              {/* Header */}
              <CardHeader className="border-b border-border pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-foreground">H2O AI Assistant</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">Online and ready to help</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="p-1 hover:bg-card/50 rounded transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                    </motion.button>
                    <motion.button
                      onClick={() => setIsOpen(false)}
                      className="p-1 hover:bg-card/50 rounded transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </CardHeader>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <CardContent className="flex-1 overflow-y-auto py-4 space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-primary text-primary-foreground rounded-br-none'
                              : 'bg-card/50 border border-border text-foreground rounded-bl-none'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {isLoading && (
                      <motion.div
                        className="flex justify-start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="bg-card/50 border border-border text-foreground px-4 py-2 rounded-lg">
                          <div className="flex gap-1">
                            <motion.div
                              className="w-2 h-2 bg-foreground/50 rounded-full"
                              animate={{ y: [0, -8, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-foreground/50 rounded-full"
                              animate={{ y: [0, -8, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-foreground/50 rounded-full"
                              animate={{ y: [0, -8, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </CardContent>

                  {/* Quick Questions */}
                  {messages.length === 1 && (
                    <motion.div
                      className="px-4 py-3 border-t border-border space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-xs text-muted-foreground font-medium mb-2">Quick questions:</p>
                      <div className="space-y-2">
                        {QUICK_QUESTIONS.map((q) => (
                          <motion.button
                            key={q.key}
                            onClick={() => handleQuickQuestion(q.key)}
                            className="w-full text-left px-3 py-2 text-xs rounded-lg bg-card/50 border border-border hover:bg-card/80 text-foreground transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {q.text}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Input */}
                  <div className="border-t border-border p-3 space-y-2">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="flex gap-2"
                    >
                      <Input
                        placeholder="Ask me anything..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground text-sm"
                        disabled={isLoading}
                      />
                      <motion.button
                        type="submit"
                        className="px-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading}
                      >
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </form>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
