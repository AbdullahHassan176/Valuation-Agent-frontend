"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Send, Bot, User, X, MessageSquare } from "lucide-react";
import { apiClient, SSEEvent, ApiResponse } from "@/src/lib/api";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  toolUsed?: string;
  citations?: Array<{
    standard: string;
    paragraph: string | number;
    section?: string;
  }>;
  confidence?: number;
  status?: string;
}

interface PolicyConfig {
  min_confidence: number;
  require_citations: boolean;
  disallow_language: string[];
  restricted_advice: string[];
  source: string;
}

interface ChatPaneProps {
  isOpen: boolean;
  onClose: () => void;
  pageId: string; // Unique identifier for localStorage
}

export default function ChatPane({ isOpen, onClose, pageId }: ChatPaneProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<string>("");
  const [currentTool, setCurrentTool] = useState<string | null>(null);
  const [currentCitations, setCurrentCitations] = useState<any[]>([]);
  const [currentConfidence, setCurrentConfidence] = useState<number | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);
  const [policy, setPolicy] = useState<PolicyConfig | null>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat-messages-${pageId}`);
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
      } catch (error) {
        console.error("Error loading chat messages:", error);
      }
    }
  }, [pageId]);

  // Load policy on mount
  useEffect(() => {
    loadPolicy();
  }, []);

  const loadPolicy = async () => {
    try {
      const response: ApiResponse<PolicyConfig> = await apiClient.getJson("/api/v1/policy");
      if (response.data) {
        setPolicy(response.data);
      }
    } catch (err) {
      console.error("Failed to load policy:", err);
    }
  };

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      // Keep only last 10 messages
      const recentMessages = messages.slice(-10);
      localStorage.setItem(`chat-messages-${pageId}`, JSON.stringify(recentMessages));
    }
  }, [messages, pageId]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setStreamingMessage("");
    setCurrentTool(null);
    setCurrentCitations([]);
    setCurrentConfidence(null);
    setCurrentStatus(null);

    try {
      await apiClient.streamSSE(
        `/api/v1/chat/stream?message=${encodeURIComponent(input.trim())}`,
        (event: SSEEvent) => {
          switch (event.event) {
            case "TOOL_CALLED":
              setCurrentTool(event.data.tool);
              break;
            case "TOKEN":
              setStreamingMessage(prev => prev + event.data.token);
              break;
            case "CITATIONS":
              setCurrentCitations(event.data.citations || []);
              break;
            case "CONFIDENCE":
              setCurrentConfidence(event.data.confidence);
              setCurrentStatus(event.data.status);
              break;
            case "DONE":
              // Create final assistant message
              const assistantMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: streamingMessage,
                timestamp: new Date(),
                toolUsed: currentTool || undefined,
                citations: currentCitations,
                confidence: currentConfidence || undefined,
                status: currentStatus || undefined,
              };
              setMessages(prev => [...prev, assistantMessage]);
              setStreamingMessage("");
              setCurrentTool(null);
              setCurrentCitations([]);
              setCurrentConfidence(null);
              setCurrentStatus(null);
              break;
            case "ERROR":
              console.error("SSE Error:", event.data.error);
              break;
          }
        }
      );
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              AI Chat Assistant
            </CardTitle>
            {policy && (
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  Min Confidence: {Math.round(policy.min_confidence * 100)}%
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Citations: {policy.require_citations ? "Required" : "Optional"}
                </Badge>
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <Separator />
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {message.role === "user" ? (
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      {message.toolUsed && (
                        <div className="mt-2">
                          <Badge variant="secondary" className="text-xs">
                            Using: {message.toolUsed}
                          </Badge>
                        </div>
                      )}
                      {message.citations && message.citations.length > 0 && (
                        <div className="mt-2 text-xs opacity-75">
                          <div className="font-medium">Citations:</div>
                          {message.citations.map((citation, idx) => (
                            <div key={idx}>
                              {citation.standard} {citation.paragraph}
                            </div>
                          ))}
                        </div>
                      )}
                      {message.confidence && (
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            {Math.round(message.confidence * 100)}% confidence
                          </Badge>
                        </div>
                      )}
                      <div className="text-xs opacity-50 mt-1">
                        {formatTimestamp(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Streaming message */}
              {streamingMessage && (
                <div className="flex gap-3 justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="rounded-lg p-3 bg-gray-100 text-gray-900">
                      <div className="whitespace-pre-wrap">{streamingMessage}</div>
                      {currentTool && (
                        <div className="mt-2">
                          <Badge variant="secondary" className="text-xs">
                            Using: {currentTool}
                          </Badge>
                        </div>
                      )}
                      {currentCitations.length > 0 && (
                        <div className="mt-2 text-xs opacity-75">
                          <div className="font-medium">Citations:</div>
                          {currentCitations.map((citation, idx) => (
                            <div key={idx}>
                              {citation.standard} {citation.paragraph}
                            </div>
                          ))}
                        </div>
                      )}
                      {currentConfidence && (
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            {Math.round(currentConfidence * 100)}% confidence
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <Separator />
          <form onSubmit={handleSubmit} className="p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about IFRS standards..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
