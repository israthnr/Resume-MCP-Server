"use client";
import { useState } from "react";
import { Send, User, Bot, Loader2 } from "lucide-react";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Hello! I'm here to help you explore your resume. Ask me about your work experience, skills, education, or contact info!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "What was my last position?",
    "What are my skills?",
    "What is my education?",
    "Which companies did I work at?",
    "What is my contact info?",
  ];

  const autoReplies = {
    hi: "Hello! How can I assist you with your resume today?",
    hello: "Hi there! Feel free to ask me any questions about your resume.",
    hey: "Hey! What would you like to know about your resume?",
    thanks: "You're welcome! Happy to help.",
    "thank you": "You're welcome! Let me know if you have any more questions.",
    bye: "Goodbye! Have a great day!",
    goodbye: "Goodbye! Feel free to chat anytime.",
  };

  const sendMessage = async (question = input) => {
    if (!question.trim()) return;

    const userMessage = { type: "user", content: question };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    // Auto-replies
    const normalized = question.trim().toLowerCase();
    if (autoReplies[normalized]) {
      const botMessage = { type: "bot", content: autoReplies[normalized] };
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      const botMessage = {
        type: "bot",
        content: data.success ? data.answer : "Sorry, something went wrong. Try again.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "Sorry, I couldn't connect to the server. Make sure the backend is running.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white">Chat About Resume</h2>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(s)}
            disabled={loading}
            className="px-3 py-1 bg-white/10 hover:bg-blue-500/30 text-white rounded-full text-sm transition-colors duration-200"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 min-h-[400px] max-h-[500px] p-4 rounded-xl bg-black/20">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start gap-2 max-w-[80%] ${
                msg.type === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.type === "user" ? "bg-blue-500" : "bg-gray-500"
                }`}
              >
                {msg.type === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div
                className={`px-4 py-3 rounded-2xl ${
                  msg.type === "user"
                    ? "bg-blue-500 text-white rounded-br-md"
                    : "bg-white text-gray-800 rounded-bl-md shadow-sm"
                }`}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
         onKeyDown={handleKeyPress}
          placeholder="Ask about your resume..."
          disabled={loading}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
          className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2 transition-colors duration-200"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}


