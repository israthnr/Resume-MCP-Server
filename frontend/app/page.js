"use client";
import { useState } from "react";
import ChatInterface from "../components/ChatInterface";
 import EmailForm from "../components/EmailForm";
 import ResumeViewer from "../components/ResumeViewer";
import { Bot, Mail, FileText } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("chat");

  const tabs = [
    { id: "chat", name: "AI Chat", icon: <Bot className="w-5 h-5" /> },
    { id: "email", name: "Email Service", icon: <Mail className="w-5 h-5" /> },
    { id: "resume", name: "Resume Viewer", icon: <FileText className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col">
      {/* Hero Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border-b border-white/10">
        <div className="container mx-auto px-6 py-16 text-center relative z-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            🚀 Resume MCP Innovation Hub
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Experience the future of AI-powered resume interactions, smart email automation,
            and transparent MCP-driven integration.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
      </header>

      {/* Tabs Navigation */}
      <div className="container mx-auto px-6 mt-8">
        <div className="flex justify-center space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 flex-1 flex justify-center">
        <div className="w-full max-w-5xl">
          {activeTab === "chat" && <ChatInterface />}
          {activeTab === "email" && <EmailForm />}
          {activeTab === "resume" && <ResumeViewer />}
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 py-16 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            ✨ Why Choose Resume MCP?
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-lg font-semibold mb-2">AI-Driven Chat</h4>
              <p className="text-gray-400">
                Natural conversations with your resume data for smarter career insights.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Smart Email</h4>
              <p className="text-gray-400">
                Send professional, template-based emails in seconds with MCP-powered APIs.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-lg font-semibold mb-2">MCP Integration</h4>
              <p className="text-gray-400">
                Powered by the Model Context Protocol for seamless AI-driven workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/70 border-t border-white/10 py-8 text-center text-gray-400">
        <p>
          ⚡ Built with Next.js, TailwindCSS & MCP —{" "}
          <span className="text-white">AI Innovation Playground</span>
        </p>
      </footer>
    </div>
  );
}
