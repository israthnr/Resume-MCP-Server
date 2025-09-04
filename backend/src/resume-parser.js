import Fuse from "fuse.js";

export class ResumeParser {
  constructor(resumeData) {
    this.resumeData = resumeData;

    this.qa = [
      {
        keywords: [
          "last position",
          "current job",
          "recent job",
          "latest role",
          "last job",
          "previous job",
        ],
        answer: () => {
          const lastJob = this.resumeData.experience[0];
          return `Your last position was ${lastJob.position} at ${
            lastJob.company
          } for ${
            lastJob.duration
          }. Key responsibilities: ${lastJob.responsibilities.join(", ")}.`;
        },
      },
      {
        keywords: ["technical skills", "technologies", "what can you do"],
        answer: () =>
          `Your technical skills include: ${this.resumeData.skills.join(", ")}`,
      },
      {
        keywords: [
          "education",
          "degree",
          "university",
          "studies",
          "college",
          "school",
        ],
        answer: () => {
          const education = this.resumeData.education[0];
          return `You have a ${education.degree} from ${education.school}, studied during ${education.year}`;
        },
      },

      {
        keywords: ["personal info", "profile", "about me", "contact info"],
        answer: () => {
          return `Your personal information:\n👤 Name: ${this.resumeData.personalInfo.name}\n📧 Email: ${this.resumeData.personalInfo.email}\n📞 Phone: ${this.resumeData.personalInfo.phone}\n🔗 LinkedIn: ${this.resumeData.personalInfo.linkedin}\n💻 GitHub: ${this.resumeData.personalInfo.github}`;
        },
      },
      {
        keywords: ["contact", "email", "phone", "linkedin", "github"],
        answer: () =>
          `Your contact details:\n- Email: ${this.resumeData.personalInfo.email}\n- Phone: ${this.resumeData.personalInfo.phone}\n- LinkedIn: ${this.resumeData.personalInfo.linkedin}\n- GitHub: ${this.resumeData.personalInfo.github}`,
      },
      {
        keywords: ["experience", "work history", "employment", "career"],
        answer: () => {
          const experiences = this.resumeData.experience
            .map(
              (exp, i) =>
                `${i + 1}. ${exp.position} at ${exp.company} (${exp.duration})`
            )
            .join("\n");
          return `Your work experience:\n${experiences}`;
        },
      },
      {
        keywords: [
          "companies",
          "worked at",
          "where did you work",
          "which companies",
          "organizations",
          "my companies",
          "firms",
        ],
        answer: () =>
          `You have worked at: ${this.resumeData.experience
            .map((exp) => exp.company)
            .join(", ")}`,
      },
      {
        keywords: ["projects", "portfolio", "work done"],
        answer: () => {
          return `Some of your key projects include:\n${this.resumeData.projects
            .map((p, i) => `${i + 1}. ${p.name} - ${p.description}`)
            .join("\n")}`;
        },
      },
      {
        keywords: ["certifications", "courses", "training"],
        answer: () =>
          `You hold certifications in: ${this.resumeData.certifications.join(
            ", "
          )}`,
      },
      {
        keywords: ["soft skills", "strengths"],
        answer: () =>
          `Your soft skills include: ${this.resumeData.softSkills.join(", ")}`,
      },
      {
        keywords: ["activities", "extracurricular", "involvement"],
        answer: () =>
          `You participated in: ${this.resumeData.activities.join(", ")}`,
      },
      {
        keywords: ["referees", "references"],
        answer: () => {
          return `Your referees are:\n${this.resumeData.referees
            .map(
              (r, i) =>
                `${i + 1}. ${r.name}, ${r.position} (${r.company}) - Contact: ${
                  r.contact
                }`
            )
            .join("\n")}`;
        },
      },
    ];

    // Fuse.js setup (stricter threshold)
    this.fuse = new Fuse(this.qa, {
      keys: ["keywords"],
      threshold: 0.6, // stricter for accurate matching
    });
  }

  answerQuestion(question) {
    const q = question.toLowerCase();

    // Try fuzzy search first
    const result = this.fuse.search(q);
    if (result.length > 0) {
      return result[0].item.answer();
    }

    // 🔥 Intent-based fallback (priority: specific → generic)
    if (q.includes("education") || q.includes("degree"))
      return this.qa[2].answer();
    if (q.includes("skill") || q.includes("technologies"))
      return this.qa[1].answer();
    if (q.includes("project")) return this.qa[7].answer();
    if (q.includes("job") || q.includes("position")) return this.qa[0].answer();
    if (q.includes("companies")) return this.qa[6].answer();
    if (q.includes("referee") || q.includes("reference"))
      return this.qa[11].answer();
    if (q.includes("soft skill") || q.includes("strength"))
      return this.qa[9].answer();
    if (q.includes("activity") || q.includes("extracurricular"))
      return this.qa[10].answer();
    if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("phone") ||
      q.includes("linkedin") ||
      q.includes("github") ||
      q.includes("info")
    ) {
      return this.qa[3].answer(); // personal info fallback
    }

    // Default fallback → profile summary
    return `Can not find the data so, Here’s a quick profile summary:\n\n${
      this.resumeData.profile
    }\n\n💼 Last Job: ${this.resumeData.experience[0].position} at ${
      this.resumeData.experience[0].company
    }\n🛠 Skills: ${this.resumeData.skills.slice(0, 5).join(", ")}...`;
  }
}
