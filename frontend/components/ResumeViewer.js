"use client";
import { useEffect, useState } from "react";
import { Loader2, GraduationCap, Briefcase, Award, Code, User } from "lucide-react";

export default function ResumeViewer() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResume() {
      try {
        const res = await fetch("/api/resume");
        const data = await res.json();
        setResume(data);
      } catch (err) {
        console.error("Failed to load resume:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResume();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-300">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Loading Resume...
      </div>
    );
  }

  if (!resume) {
    return <p className="text-red-400">❌ Failed to load resume data.</p>;
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-6 text-white space-y-8">
      {/* Personal Info */}
      <section>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-blue-400" /> {resume.personalInfo.name}
        </h2>
        <p>Email: {resume.personalInfo.email}</p>
        <p>Phone: {resume.personalInfo.phone}</p>
        <p>
          <a href={resume.personalInfo.linkedin} target="_blank" className="text-blue-400 underline">
            LinkedIn
          </a>{" "}
          |{" "}
          <a href={resume.personalInfo.github} target="_blank" className="text-blue-400 underline">
            GitHub
          </a>
        </p>
      </section>

      {/* Profile */}
      <section>
        <h3 className="text-xl font-semibold mb-2">👤 Profile</h3>
        <p className="text-gray-300">{resume.profile}</p>
      </section>

      {/* Experience */}
      <section>
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-purple-400" /> Work Experience
        </h3>
        <ul className="space-y-4">
          {resume.experience.map((exp, idx) => (
            <li key={idx} className="bg-black/20 p-4 rounded-lg">
              <p className="font-semibold">
                {exp.position} @ {exp.company} <span className="text-gray-400">({exp.duration})</span>
              </p>
              <ul className="list-disc list-inside text-gray-300 text-sm">
                {exp.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* Education */}
      <section>
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-green-400" /> Education
        </h3>
        <ul className="space-y-2 text-gray-300">
          {resume.education.map((edu, idx) => (
            <li key={idx}>
              🎓 {edu.degree} — {edu.school} ({edu.year})
              {edu.cgpa && <span className="ml-2 text-yellow-400">CGPA: {edu.cgpa}</span>}
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section>
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Code className="w-5 h-5 text-pink-400" /> Skills
        </h3>
        <p className="text-gray-300">{resume.skills.join(", ")}</p>
      </section>

      {/* Certifications */}
      <section>
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-400" /> Certifications
        </h3>
        <ul className="list-disc list-inside text-gray-300">
          {resume.certifications.map((c, idx) => (
            <li key={idx}>{c}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
