<div align="center">
  <img src="./docs/logo.png" alt="ResumeForge Logo" width="120" />
  <h1>ResumeForge 🚀</h1>
  <p><strong>AI-Powered Interview Preparation Platform</strong></p>
  <p>
    Get personalized interview strategies, tailored resume generation, and a complete preparation roadmap — all powered by AI.
  </p>
</div>

<br />

## 🌟 Overview
ResumeForge is a cutting-edge full-stack application designed to help job seekers generate hyper-customized interview strategies. By analyzing the target job description against the user's resume, the integrated Gen-AI seamlessly provides behavioral & technical questions, skill gap analysis, and tailored roadmaps.

---

## 📸 Screenshots

| Login & Authentication | Home & Strategy Creation |
| :---: | :---: |
| ![Login Screen](./docs/login.png)<br/>*Secure user authentication with a modern dark UI.* | ![Home Screen](./docs/home.png)<br/>*Upload resumes and map them against specific jobs.* |

| Technical Deep-dive | Custom Interview Roadmap |
| :---: | :---: |
| ![Technical Questions](./docs/technical_questions.png)<br/>*AI-generated, highly specific technical questions.* | ![Loading Screen](./docs/loading.png)<br/>*Engaging progress state while generating the report.* |

*(Note: Please place your screenshots inside the `/docs` folder as `login.png`, `home.png`, `technical_questions.png`, and `loading.png` so they show up above!)*

---

## ✨ Features
- 🔐 **Secure Authentication**: User login and registration powered by custom authentication.
- 📄 **Resume Parsing & Job Matching**: Upload a PDF/DOCX or write a self-description to check match scores against job descriptions.
- 🤖 **AI-Generated Strategy**: Leverages Gemini AI to generate:
  - Technical Questions
  - Behavioral Questions
  - Preparation Roadmap
  - Skill Gap Analysis
- 🎨 **Modern Dark UI**: Beautiful, accessible, and highly responsive interface using a customized Zinc + Violet accent palette.
- ⚡ **Global Loader**: Enjoy a professional UX with custom animated loading screens during server spin-ups.

---

## 🛠️ Tech Stack
- **Frontend**: React, React Router, SCSS (Modern UI)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **AI Integration**: Google Gemini AI
- **Authentication**: Custom JWT-based 
- **Deployment**: Render / Vercel

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/Gen-AI-Job-Preparation-Web-Application.git
cd Gen-AI-Job-Preparation-Web-Application
```

### 2. Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

### 3. Backend Setup
```bash
cd Backend
npm install
# Set up your .env file with MongoDB URI, Gemini API Key, etc.
node index.js
```

---

## 👤 Author
Developed as a comprehensive guide and personal project. Contributions, issues, and feature requests are welcome!

<div align="center">
  <sub>Built with ❤️ and Gen-AI.</sub>
</div>
