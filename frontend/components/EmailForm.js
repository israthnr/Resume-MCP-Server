"use client";
import { useState, useEffect } from "react";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function EmailForm() {
  const [formData, setFormData] = useState({
    recipient: "",
    subject: "",
    body: "",
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        setStatus({ type: "success", message: result.message || "Email sent!" });
        setFormData({ recipient: "", subject: "", body: "" });
      } else {
        setStatus({ type: "error", message: result.error || "Failed to send email." });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Server connection failed." });
    }

    setSending(false);
  };

  const templates = [
    {
      name: "Interview Follow-up",
      subject: "Thank you for the interview",
      body: "Dear Hiring Manager,\n\nThank you for taking the time to interview me...",
    },
    {
      name: "Application Status",
      subject: "Following up on my application",
      body: "Dear Hiring Team,\n\nI wanted to follow up on my application...",
    },
  ];

  const useTemplate = (tpl) => {
    setFormData((prev) => ({ ...prev, subject: tpl.subject, body: tpl.body }));
  };

  if (!mounted) return null;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <Mail className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white">Send Email</h2>
      </div>

      {/* Quick Templates */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Quick Templates:</h3>
        <div className="flex flex-wrap gap-2">
          {templates.map((tpl, idx) => (
            <button
              key={idx}
              onClick={() => useTemplate(tpl)}
              disabled={sending}
              className="px-3 py-1 bg-white/10 hover:bg-blue-500/30 text-white rounded-full text-sm transition-colors duration-200"
            >
              {tpl.name}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="recipient"
          placeholder="Recipient Email *"
          required
          value={formData.recipient}
          onChange={handleChange}
          disabled={sending}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject *"
          required
          value={formData.subject}
          onChange={handleChange}
          disabled={sending}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
        />
        <textarea
          name="body"
          placeholder="Message *"
          required
          rows={6}
          value={formData.body}
          onChange={handleChange}
          disabled={sending}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-white"
        />

        <button
          type="submit"
          disabled={sending || !formData.recipient || !formData.subject || !formData.body}
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors duration-200"
        >
          {sending ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Email
            </>
          )}
        </button>
      </form>

      {status.message && (
        <div
          className={`mt-4 p-4 rounded-xl flex items-center gap-3 ${
            status.type === "success"
              ? "bg-green-50 text-purple-700 border border-purple-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span className="font-medium">{status.message}</span>
        </div>
      )}
    </div>
  );
}

