import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Message from './Message';
import ChatInput from './ChatInput';
import axios from 'axios';

// Use environment variable or default to deployed backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://backend-8c50.onrender.com';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with welcome message
    setMessages([
      {
        text: "Hi! I'm Alex Hormozi's AI assistant. I've analyzed his content across YouTube, Twitter, Instagram, Threads, TikTok, and podcasts. Ask me anything about business growth, marketing, or entrepreneurship!",
        isBot: true,
      },
    ]);
  }, []);

  const handleSend = async (message) => {
    if (!message.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: message, isBot: false }]);
    setIsLoading(true);

    try {
      console.log('Sending message to backend:', message);
      
      // Get conversation context from previous messages
      const context = messages
        .map(m => m.text)
        .join('\n');

      const response = await axios.post(`${API_BASE_URL}/api/agent/chat`, {
        query: message,
        context: context
      });

      console.log('Backend response:', response.data);

      let responseText = '';
      if (response.data && response.data.result) {
        // Handle Llama3 API response format
        responseText = response.data.result;
      } else if (response.data && response.data.choices && response.data.choices[0]) {
        responseText = response.data.choices[0].message.content;
      } else if (response.data && response.data.content) {
        responseText = response.data.content;
      } else if (typeof response.data === 'string') {
        responseText = response.data;
      } else {
        console.error('Unexpected response format:', response.data);
        responseText = "I apologize, but I couldn't process that request properly. Please try again.";
      }

      setMessages((prev) => [...prev, { text: responseText, isBot: true }]);
    } catch (error) {
      console.error('Error in chat:', error);
      console.error('Error details:', error.response?.data || error.message);
      
      const errorMessage = error.response?.data?.error || error.message || "An unexpected error occurred";
      setMessages((prev) => [
        ...prev,
        {
          text: `I'm sorry, I encountered an error: ${errorMessage}. Please try again later.`,
          isBot: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ height: '100%', py: 2 }}>
      <Paper
        elevation={0}
        sx={{
          height: 'calc(100vh - 120px)',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        {/* Messages Container */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Message message={message} />
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontStyle: 'italic', mt: 2 }}
              >
                Alex is thinking...
              </Typography>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input Container */}
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat; 