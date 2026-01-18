import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  parseResume,
  atsReview,
  atsMatch,
  resumeImprove,
  skillsGap,
  interviewPrep,
  salaryNegotiation,
} from "../api/atsApi";
import Loader from "../components/Loader";
import ResultCard from "../components/ResultCard";
import {
  FileText,
  Briefcase,
  Zap,
  BookOpen,
  Users,
  DollarSign,
  Upload,
  ChevronRight,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const [completedAnalyses, setCompletedAnalyses] = useState(new Set());

  const analysisTools = [
    { id: "ats", label: "ATS Score", description: "Check resume compatibility", icon: FileText },
    { id: "match", label: "Keyword Match", description: "Find matching keywords", icon: Briefcase },
    { id: "improve", label: "Resume Improve", description: "Enhancement suggestions", icon: Zap },
    { id: "skills", label: "Skills Gap", description: "Identify skill gaps", icon: BookOpen },
    { id: "interview", label: "Interview Prep", description: "Interview preparation", icon: Users },
    { id: "salary", label: "Salary Guide", description: "Salary negotiation insights", icon: DollarSign },
  ];

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileUploadLoading(true);
    try {
      const data = await parseResume(file);
      setResumeText(data.resume_text || "");
      setActiveTab("input");
    } catch (error) {
      alert("Error uploading resume: " + error.message);
    } finally {
      setFileUploadLoading(false);
    }
  };

  const runAnalysis = async (analysisType) => {
    if (!resumeText.trim()) {
      alert("Please load a resume first");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please provide a job description");
      return;
    }

    setLoading(true);
    try {
      let result = {};

      switch (analysisType) {
        case "ats":
          result = await atsReview(resumeText, jobDescription);
          break;
        case "match":
          result = await atsMatch(resumeText, jobDescription);
          break;
        case "improve":
          result = await resumeImprove(resumeText, jobDescription);
          break;
        case "skills":
          result = await skillsGap(resumeText, jobDescription);
          break;
        case "interview":
          result = await interviewPrep(resumeText, jobDescription);
          break;
        case "salary":
          result = await salaryNegotiation(resumeText, jobDescription, location || undefined);
          break;
        default:
          return;
      }

      setResults((prev) => ({ ...prev, [analysisType]: result }));
      setCompletedAnalyses((prev) => new Set([...prev, analysisType]));
      setActiveTab(analysisType);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const hasInputData = resumeText.trim() && jobDescription.trim();

  const styles = {
    container: { minHeight: "100vh", backgroundColor: "#0f172a", color: "#e2e8f0", position: "relative", overflow: "hidden" },
    header: {
      backgroundColor: "rgba(15, 23, 42, 0.5)",
      backdropFilter: "blur(2rem)",
      borderBottom: "1px solid rgba(71, 85, 105, 0.5)",
      position: "sticky",
      top: 0,
      zIndex: 40,
      padding: "2rem 1.5rem",
    },
    maxWidth: { maxWidth: "80rem", margin: "0 auto" },
    card: {
      backgroundColor: "rgba(15, 23, 42, 0.5)",
      backdropFilter: "blur(2rem)",
      border: "1px solid rgba(71, 85, 105, 0.3)",
      borderRadius: "1rem",
      padding: "1.5rem 2rem",
      transition: "all 0.3s ease",
    },
    input: {
      width: "100%",
      backgroundColor: "rgba(15, 23, 42, 0.5)",
      border: "1px solid rgba(71, 85, 105, 0.3)",
      borderRadius: "0.75rem",
      padding: "1rem",
      color: "#e2e8f0",
      fontSize: "1rem",
      fontFamily: "inherit",
    },
    button: {
      padding: "0.75rem 1.5rem",
      background: "linear-gradient(135deg, #3b82f6, #a855f7)",
      border: "none",
      borderRadius: "0.75rem",
      color: "white",
      fontWeight: "600",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <style>{`
        input::placeholder, textarea::placeholder { color: #94a3b8; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>

      {/* Animated background */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: "25%",
          width: "24rem",
          height: "24rem",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          borderRadius: "9999px",
          filter: "blur(3rem)",
          animation: "pulse 2s infinite"
        }} />
        <div style={{
          position: "absolute",
          bottom: 0,
          right: "25%",
          width: "24rem",
          height: "24rem",
          backgroundColor: "rgba(168, 85, 247, 0.1)",
          borderRadius: "9999px",
          filter: "blur(3rem)",
          animation: "pulse 2s infinite 1s"
        }} />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.header}
      >
        <div style={styles.maxWidth}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveTab("home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <div style={{ padding: "0.75rem", background: "linear-gradient(135deg, #3b82f6, #a855f7)", borderRadius: "0.75rem" }}>
              <Sparkles style={{ width: "1.5rem", height: "1.5rem", color: "white" }} />
            </div>
            <div style={{ textAlign: "left" }}>
              <h1 style={{ fontSize: "2rem", fontWeight: "700", background: "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0, letterSpacing: "-0.01em" }}>
                Resume Optimizer
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "0.875rem", margin: "0.25rem 0 0", fontWeight: "500" }}>
                Powered by AI • Optimize your career
              </p>
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "3rem 1.5rem", position: "relative", zIndex: 10 }}>
        <AnimatePresence mode="wait">
          {/* Home Screen */}
          {activeTab === "home" && (
            <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <h2 style={{ fontSize: "3.5rem", fontWeight: "700", marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
                  Your AI Resume Assistant
                </h2>
                <p style={{ fontSize: "1.25rem", color: "#cbd5e1", maxWidth: "42rem", margin: "0 auto 2rem", lineHeight: "1.7" }}>
                  Get instant AI-powered insights to optimize your resume, match job descriptions perfectly, and ace your interviews
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("upload")}
                  style={{
                    padding: "1rem 2rem",
                    background: "linear-gradient(135deg, #3b82f6, #a855f7)",
                    border: "none",
                    borderRadius: "0.75rem",
                    color: "white",
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Upload style={{ width: "1.25rem", height: "1.25rem" }} />
                  Get Started
                </motion.button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginTop: "4rem" }}>
                {[
                  { icon: FileText, title: "Upload Resume", description: "Upload your resume in PDF or DOCX format" },
                  { icon: Briefcase, title: "Add Job Description", description: "Paste the job description you're applying for" },
                  { icon: Zap, title: "Get AI Insights", description: "Receive instant personalized recommendations" }
                ].map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      style={styles.card}
                    >
                      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                        <Icon style={{ width: "2rem", height: "2rem", color: "#60a5fa" }} />
                      </div>
                      <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", margin: 0, marginBottom: "0.5rem", textAlign: "center" }}>
                        {step.title}
                      </h3>
                      <p style={{ color: "#94a3b8", fontSize: "0.875rem", textAlign: "center", margin: 0 }}>
                        {step.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Upload Screen */}
          {activeTab === "upload" && (
            <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div style={styles.card}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                    <Upload style={{ width: "1.5rem", height: "1.5rem", color: "#60a5fa" }} />
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "700", margin: 0, letterSpacing: "-0.01em" }}>Upload Resume</h2>
                  </div>

                  <label style={{ display: "block", cursor: "pointer" }}>
                    <div style={{
                      border: "2px dashed rgba(71, 85, 105, 0.5)",
                      borderRadius: "1.5rem",
                      padding: "3rem",
                      textAlign: "center",
                    }}>
                      {fileUploadLoading ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
                          <Loader />
                          <p style={{ color: "#e2e8f0" }}>Uploading...</p>
                        </div>
                      ) : (
                        <>
                          <Upload style={{ width: "3rem", height: "3rem", margin: "0 auto 1rem", color: "#94a3b8" }} />
                          <p style={{ color: "#e2e8f0", fontWeight: "600", marginBottom: "0.5rem", margin: 0 }}>Click to upload or drag and drop</p>
                          <p style={{ color: "#94a3b8", fontSize: "0.875rem", margin: 0 }}>PDF or DOCX • Max 10MB</p>
                        </>
                      )}
                      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} disabled={fileUploadLoading} style={{ display: "none" }} />
                    </div>
                  </label>

                  {resumeText && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.3)", borderRadius: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <CheckCircle style={{ width: "1.25rem", height: "1.25rem", color: "#22c55e", flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: "0.875rem", fontWeight: "500", color: "#22c55e", margin: 0 }}>Resume loaded</p>
                        <p style={{ fontSize: "0.75rem", color: "rgba(34, 197, 94, 0.7)", margin: 0 }}>{resumeText.length} characters</p>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div style={styles.card}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                    <Briefcase style={{ width: "1.5rem", height: "1.5rem", color: "#a78bfa" }} />
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "700", margin: 0, letterSpacing: "-0.01em" }}>Job Description</h2>
                  </div>

                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description..."
                    style={{ ...styles.input, height: "16rem", resize: "none" }}
                  />

                  {jobDescription && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "rgba(168, 85, 247, 0.1)", border: "1px solid rgba(168, 85, 247, 0.3)", borderRadius: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <CheckCircle style={{ width: "1.25rem", height: "1.25rem", color: "#a855f7", flexShrink: 0 }} />
                      <p style={{ fontSize: "0.875rem", color: "#a855f7", margin: 0 }}>Job description added</p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Input Screen */}
          {activeTab === "input" && (
            <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={styles.card}>
              <h2 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "1.5rem", letterSpacing: "-0.01em" }}>Your Documents</h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <label style={{ fontWeight: "600", color: "#e2e8f0" }}>Resume</label>
                    <motion.button whileHover={{ scale: 1.05 }} onClick={() => setActiveTab("upload")} style={{ color: "#60a5fa", fontSize: "0.875rem", fontWeight: "600", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      Change
                    </motion.button>
                  </div>
                  <div style={{ ...styles.card, maxHeight: "12rem", overflow: "auto" }}>
                    <p style={{ color: "#cbd5e1", fontSize: "0.875rem", whiteSpace: "pre-wrap", margin: 0 }}>
                      {resumeText.substring(0, 300)}{resumeText.length > 300 && "..."}
                    </p>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: "600", color: "#e2e8f0", marginBottom: "0.75rem" }}>Job Description</label>
                  <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste job description..." style={{ ...styles.input, height: "11rem", resize: "none" }} />
                </div>
              </div>

              {hasInputData && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveTab("tools")}
                  style={{
                    ...styles.button,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    margin: "0 auto",
                  }}
                >
                  Proceed to Analysis
                  <ChevronRight style={{ width: "1.25rem", height: "1.25rem" }} />
                </motion.button>
              )}
            </motion.div>
          )}

          {/* Tools Screen */}
          {activeTab === "tools" && (
            <motion.div key="tools" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "2.5rem", letterSpacing: "-0.01em" }}>Analysis Tools</h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
                {analysisTools.map((tool, idx) => {
                  const Icon = tool.icon;
                  const isCompleted = completedAnalyses.has(tool.id);

                  return (
                    <motion.button
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -8 }}
                      onClick={() => runAnalysis(tool.id)}
                      disabled={!hasInputData || loading}
                      style={{
                        ...styles.card,
                        position: "relative",
                        overflow: "hidden",
                        cursor: hasInputData && !loading ? "pointer" : "not-allowed",
                        opacity: hasInputData && !loading ? 1 : 0.5,
                        textAlign: "left",
                        backgroundColor: styles.card.backgroundColor,
                        border: styles.card.border,
                        borderRadius: styles.card.borderRadius,
                        padding: styles.card.padding,
                        backdropFilter: styles.card.backdropFilter,
                      }}
                    >
                      {isCompleted && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ position: "absolute", top: "0.75rem", right: "0.75rem", width: "1.5rem", height: "1.5rem", backgroundColor: "#22c55e", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <CheckCircle style={{ width: "1rem", height: "1rem", color: "white" }} />
                        </motion.div>
                      )}

                      <div style={{ position: "relative", zIndex: 10 }}>
                        <div style={{ width: "3rem", height: "3rem", borderRadius: "0.75rem", backgroundColor: "rgba(59, 130, 246, 0.2)", padding: "0.625rem", marginBottom: "1rem" }}>
                          <Icon style={{ width: "100%", height: "100%", color: "#60a5fa" }} />
                        </div>

                        <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#e2e8f0", margin: 0, marginBottom: "0.5rem" }}>
                          {tool.label}
                        </h3>
                        <p style={{ fontSize: "0.875rem", color: "#94a3b8", margin: 0, marginBottom: "1rem" }}>
                          {tool.description}
                        </p>

                        <div style={{ display: "flex", alignItems: "center", color: "#60a5fa", fontSize: "0.875rem", fontWeight: "600" }}>
                          <span>{isCompleted ? "View Result" : "Analyze"}</span>
                          <ChevronRight style={{ width: "1rem", height: "1rem" }} />
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Salary location input */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ ...styles.card, marginTop: "2rem" }}>
                <label style={{ display: "block", fontWeight: "600", color: "#e2e8f0", marginBottom: "0.75rem" }}>
                  Location (optional, for salary insights)
                </label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., San Francisco, CA" style={styles.input} />
              </motion.div>
            </motion.div>
          )}

          {/* Results Screen */}
          {activeTab !== "upload" && activeTab !== "input" && activeTab !== "tools" && activeTab !== "home" && results[activeTab] && (
            <motion.div key={`result-${activeTab}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <motion.button whileHover={{ scale: 1.05 }} onClick={() => setActiveTab("tools")} style={{ marginBottom: "1.5rem", ...styles.button, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ChevronRight style={{ width: "1.25rem", height: "1.25rem", transform: "rotate(180deg)" }} />
                Back to Analysis
              </motion.button>

              <ResultCard
                title={analysisTools.find((t) => t.id === activeTab)?.label || "Result"}
                data={results[activeTab]}
                type={activeTab}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(0.5rem)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
            }}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} style={{ ...styles.card, display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <Loader />
              <p style={{ color: "#cbd5e1", fontWeight: "500", margin: 0 }}>Analyzing your resume...</p>
              <p style={{ color: "#64748b", fontSize: "0.75rem", margin: 0 }}>This may take a few seconds</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
