import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Message = ({ message }) => {
  const isUser = !message.isBot;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          mb: 2,
          mx: 2,
        }}
      >
        <Paper
          elevation={1}
          sx={{
            maxWidth: '80%',
            p: 2,
            backgroundColor: isUser ? 'primary.main' : 'background.paper',
            borderRadius: 2,
            '& pre': {
              margin: 0,
              borderRadius: 1,
            },
          }}
        >
          <Typography
            component="div"
            sx={{
              color: isUser ? 'white' : 'text.primary',
              '& a': {
                color: isUser ? 'white' : 'primary.main',
                textDecoration: 'underline',
              },
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.text}
            </ReactMarkdown>
          </Typography>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default Message; 