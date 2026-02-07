"use client";

import { useState } from "react";
import { ChatMessage as ChatMessageType, Citation } from "@/types";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import { n8nApi } from "@/lib/api/n8n-client";
import Link from "next/link";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>();

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Call n8n API
      const response = await n8nApi.chat({
        organizationId: "demo-org",
        userId: "demo-user",
        message: content,
        sessionId,
      });

      if (response.success && response.data) {
        const assistantMessage: ChatMessageType = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.data.response,
          citations: response.data.citations,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setSessionId(response.data.sessionId);
      } else {
        // Error handling
        const errorMessage: ChatMessageType = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'm sorry, I encountered an error processing your request. Please try again.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              DocMind Chat
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Admin
            </Link>
            <Link
              href="/"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="text-2xl font-semibold mb-2">
                Start a conversation
              </h2>
              <p>Ask me anything about your knowledge base</p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          {loading && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <div className="animate-pulse">Thinking...</div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSend={handleSendMessage} disabled={loading} />
        </div>
      </div>
    </div>
  );
}
