import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Zap, 
  Target,
  BookOpen,
} from "lucide-react";

// Style objects matching the app theme
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  sectionCard: {
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    backdropFilter: "blur(2rem)",
    border: "1px solid rgba(71, 85, 105, 0.3)",
    borderRadius: "0.75rem",
    padding: "1.25rem",
    transition: "all 0.3s ease",
  },
  sectionCardSuccess: {
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    border: "1px solid rgba(34, 197, 94, 0.3)",
  },
  sectionCardWarning: {
    backgroundColor: "rgba(251, 191, 36, 0.1)",
    border: "1px solid rgba(251, 191, 36, 0.3)",
  },
  sectionCardInfo: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    border: "1px solid rgba(59, 130, 246, 0.3)",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  sectionTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#e2e8f0",
    margin: 0,
  },
  sectionContent: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  bulletPoint: {
    display: "flex",
    gap: "0.75rem",
    fontSize: "0.875rem",
    color: "#cbd5e1",
    lineHeight: "1.6",
  },
  bulletPointEmphasized: {
    fontWeight: "500",
    color: "#e2e8f0",
  },
  bulletDot: {
    color: "#60a5fa",
    marginTop: "0.25rem",
    flexShrink: 0,
  },
  keywordBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    padding: "0.375rem 0.75rem",
    borderRadius: "9999px",
    fontSize: "0.875rem",
    border: "1px solid",
  },
  keywordBadgeSuccess: {
    backgroundColor: "rgba(34, 197, 94, 0.2)",
    color: "#86efac",
    borderColor: "rgba(34, 197, 94, 0.3)",
  },
  keywordBadgeWarning: {
    backgroundColor: "rgba(251, 191, 36, 0.2)",
    color: "#fde047",
    borderColor: "rgba(251, 191, 36, 0.3)",
  },
  keywordBadgeError: {
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    color: "#fca5a5",
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
  keywordList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  numberedItem: {
    display: "flex",
    gap: "0.75rem",
  },
  numberedItemLabel: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#60a5fa",
    minWidth: "1.5rem",
    flexShrink: 0,
  },
  numberedItemText: {
    color: "#cbd5e1",
    lineHeight: "1.6",
    margin: 0,
  },
  scoreContainer: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  scoreBar: {
    flex: 1,
  },
  scoreLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.25rem",
  },
  scoreLabel: {
    fontSize: "0.875rem",
    color: "#94a3b8",
  },
  scoreValue: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#e2e8f0",
  },
  scoreBarTrack: {
    height: "0.5rem",
    backgroundColor: "rgba(51, 65, 85, 0.5)",
    borderRadius: "9999px",
    overflow: "hidden",
  },
  scoreBarFill: {
    height: "100%",
  },
  scorePercentage: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#e2e8f0",
    minWidth: "3rem",
  },
  exampleBox: {
    backgroundColor: "rgba(51, 65, 85, 0.3)",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    color: "#cbd5e1",
    marginTop: "0.5rem",
  },
  pitchBox: {
    backgroundColor: "rgba(51, 65, 85, 0.4)",
    padding: "1rem",
    borderRadius: "0.5rem",
    fontStyle: "italic",
    color: "#e2e8f0",
    borderLeft: "4px solid #3b82f6",
    lineHeight: "1.6",
  },
  phraseBox: {
    fontSize: "0.875rem",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    marginTop: "0.5rem",
  },
  phraseBoxSuccess: {
    color: "#cbd5e1",
    fontStyle: "italic",
    backgroundColor: "rgba(34, 197, 94, 0.2)",
    borderLeft: "2px solid #22c55e",
  },
  phraseBoxError: {
    color: "#cbd5e1",
    fontSize: "0.875rem",
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    borderLeft: "2px solid #ef4444",
  },
  errorText: {
    color: "#ef4444",
    fontWeight: "600",
  },
};

function SectionCard({ title, icon: Icon, children, variant = "default" }) {
  const getCardStyle = () => {
    const base = { ...styles.sectionCard };
    if (variant === "success") return { ...base, ...styles.sectionCardSuccess };
    if (variant === "warning") return { ...base, ...styles.sectionCardWarning };
    if (variant === "info") return { ...base, ...styles.sectionCardInfo };
    return base;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={getCardStyle()}
    >
      <div style={styles.sectionHeader}>
        {Icon && <Icon style={{ width: "1.25rem", height: "1.25rem", color: "#94a3b8" }} />}
        <h3 style={styles.sectionTitle}>{title}</h3>
      </div>
      <div style={styles.sectionContent}>{children}</div>
    </motion.div>
  );
}

function BulletPoint({ text, emphasized = false }) {
  if (!text) return null;
  const textStr = typeof text === "string" ? text : JSON.stringify(text);

  return (
    <div style={{ ...styles.bulletPoint, ...(emphasized && styles.bulletPointEmphasized) }}>
      <div style={styles.bulletDot}>•</div>
      <div>
        <MarkdownRenderer content={textStr} inline />
      </div>
    </div>
  );
}

function MarkdownRenderer({ content, inline = false, compact = false, color }) {
  if (!content) return null;
  const text = typeof content === "string" ? content : String(content);
  const Wrapper = inline ? "span" : "div";
  const textColor = color ?? "#cbd5e1";
  const wrapperStyle = inline
    ? { display: "inline", color: textColor, lineHeight: "1.6" }
    : { color: textColor, lineHeight: "1.6" };

  return (
    <Wrapper style={wrapperStyle}>
      <ReactMarkdown
        components={{
          p: ({ children }) =>
            inline ? (
              <span style={{ margin: 0 }}>{children}</span>
            ) : (
              <p style={{ margin: compact ? "0" : "0.5rem 0", color: textColor }}>{children}</p>
            ),
          h1: ({ children }) => <h1 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#e2e8f0", margin: "1rem 0 0.5rem" }}>{children}</h1>,
          h2: ({ children }) => <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#e2e8f0", margin: "1rem 0 0.5rem" }}>{children}</h2>,
          h3: ({ children }) => <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#e2e8f0", margin: "0.75rem 0 0.5rem" }}>{children}</h3>,
          ul: ({ children }) => <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem", listStyleType: "disc" }}>{children}</ul>,
          ol: ({ children }) => <ol style={{ margin: "0.5rem 0", paddingLeft: "1.5rem" }}>{children}</ol>,
          li: ({ children }) => <li style={{ margin: "0.25rem 0", color: "#cbd5e1" }}>{children}</li>,
          strong: ({ children }) => <strong style={{ fontWeight: "600", color: "#e2e8f0" }}>{children}</strong>,
          em: ({ children }) => <em style={{ fontStyle: "italic" }}>{children}</em>,
          code: ({ children }) => (
            <code style={{
              backgroundColor: "rgba(51, 65, 85, 0.5)",
              padding: "0.125rem 0.375rem",
              borderRadius: "0.25rem",
              fontSize: "0.875rem",
              color: "#fbbf24",
            }}>{children}</code>
          ),
          blockquote: ({ children }) => (
            <blockquote style={{
              borderLeft: "3px solid #60a5fa",
              paddingLeft: "1rem",
              margin: "0.5rem 0",
              color: "#94a3b8",
              fontStyle: "italic",
            }}>{children}</blockquote>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </Wrapper>
  );
}

function ScoreDisplay({ score, max = 100, label = "Score" }) {
  const scoreNum = typeof score === 'number' ? score : parseInt(score) || 0;
  const percentage = Math.round((scoreNum / max) * 100);
  const getColor = (pct) => {
    if (pct >= 75) return "#22c55e";
    if (pct >= 50) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div style={styles.scoreContainer}>
      <div style={styles.scoreBar}>
        <div style={styles.scoreLabelRow}>
          <span style={styles.scoreLabel}>{label}</span>
          <span style={styles.scoreValue}>{scoreNum}/{max}</span>
        </div>
        <div style={styles.scoreBarTrack}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8 }}
            style={{ ...styles.scoreBarFill, backgroundColor: getColor(percentage) }}
          />
        </div>
      </div>
      <span style={styles.scorePercentage}>{percentage}%</span>
    </div>
  );
}

export function ATSReviewFormatter({ data }) {
  if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
    return (
      <div style={{ color: "#94a3b8", padding: "1rem", textAlign: "center" }}>
        No analysis data available. Please try running the analysis again.
      </div>
    );
  }

  const renderContent = (content) => {
    if (!content) return null;
    
    if (Array.isArray(content)) {
      return content.map((item, idx) => <BulletPoint key={idx} text={item} />);
    }
    
    if (typeof content === 'string') {
      return <MarkdownRenderer content={content} />;
    }
    
    return <BulletPoint text={content} />;
  };

  // Check if we have any structured data
  const hasStructuredData = data.overall_assessment || data.whats_working_well || 
                            data.areas_to_improve || data.ats_optimization_tips || 
                            data.keyword_recommendations || data.final_verdict;

  return (
    <div style={styles.container}>
      {data.overall_assessment && (
        <SectionCard title="Overall Assessment" icon={TrendingUp} variant="info">
          {renderContent(data.overall_assessment)}
        </SectionCard>
      )}
      
      {data.whats_working_well && (
        <SectionCard title="What's Working Well - Your Strengths" icon={CheckCircle} variant="success">
          {renderContent(data.whats_working_well)}
        </SectionCard>
      )}
      
      {data.areas_to_improve && (
        <SectionCard title="Areas to Improve - Critical Gaps" icon={AlertCircle} variant="warning">
          {renderContent(data.areas_to_improve)}
        </SectionCard>
      )}
      
      {data.ats_optimization_tips && (
        <SectionCard title="ATS Optimization Tips" icon={Zap}>
          {renderContent(data.ats_optimization_tips)}
        </SectionCard>
      )}
      
      {data.keyword_recommendations && (
        <SectionCard title="Keyword Recommendations" icon={Target}>
          {renderContent(data.keyword_recommendations)}
        </SectionCard>
      )}
      
      {data.final_verdict && (
        <SectionCard title="Final Verdict" variant="info">
          <div style={{ fontWeight: "600", fontSize: "1rem" }}>
            <MarkdownRenderer content={data.final_verdict} compact color="#e2e8f0" />
          </div>
        </SectionCard>
      )}

      {data.raw_response && !hasStructuredData && (
        <SectionCard title="Analysis Result" variant="info">
          <MarkdownRenderer content={data.raw_response} />
        </SectionCard>
      )}
    </div>
  );
}

export function ATSMatchFormatter({ data }) {
  if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
    return (
      <div style={{ color: "#94a3b8", padding: "1rem", textAlign: "center" }}>
        No analysis data available. Please try running the analysis again.
      </div>
    );
  }

  const renderContent = (content) => {
    if (!content) return null;
    
    if (Array.isArray(content)) {
      return content.map((item, idx) => <BulletPoint key={idx} text={item} />);
    }
    
    return <BulletPoint text={content} />;
  };

  return (
    <div style={styles.container}>
      {data.match_score !== undefined && (
        <SectionCard title="Match Score Analysis" variant="success" icon={CheckCircle}>
          <ScoreDisplay 
            score={typeof data.match_score === 'number' ? data.match_score : parseInt(data.match_score) || 0} 
            label="ATS Match Score"
          />
        </SectionCard>
      )}

      {data.matched_keywords_from_job_posting && (
        <SectionCard title="Matched Keywords from Job Posting" variant="success" icon={CheckCircle}>
          {Array.isArray(data.matched_keywords_from_job_posting) ? (
            <div style={styles.keywordList}>
              {data.matched_keywords_from_job_posting.map((kw, idx) => (
                <span key={idx} style={{ ...styles.keywordBadge, ...styles.keywordBadgeSuccess }}>
                  <CheckCircle style={{ width: "0.75rem", height: "0.75rem" }} /> {kw}
                </span>
              ))}
            </div>
          ) : (
            <BulletPoint text={data.matched_keywords_from_job_posting} />
          )}
        </SectionCard>
      )}

      {data.missing_critical_keywords && (
        <SectionCard title="Missing Critical Keywords" variant="warning" icon={AlertCircle}>
          {Array.isArray(data.missing_critical_keywords) ? (
            <div style={styles.keywordList}>
              {data.missing_critical_keywords.map((kw, idx) => (
                <span key={idx} style={{ ...styles.keywordBadge, ...styles.keywordBadgeError }}>
                  <AlertCircle style={{ width: "0.75rem", height: "0.75rem" }} /> <MarkdownRenderer content={kw} inline />
                </span>
              ))}
            </div>
          ) : (
            <BulletPoint text={data.missing_critical_keywords} />
          )}
        </SectionCard>
      )}

      {data.missing_important_keywords && (
        <SectionCard title="Missing Important Keywords" variant="warning">
          {Array.isArray(data.missing_important_keywords) ? (
            <div style={styles.keywordList}>
              {data.missing_important_keywords.map((kw, idx) => (
                <span key={idx} style={{ ...styles.keywordBadge, ...styles.keywordBadgeWarning }}>
                  <AlertCircle style={{ width: "0.75rem", height: "0.75rem" }} /> {kw}
                </span>
              ))}
            </div>
          ) : (
            <BulletPoint text={data.missing_important_keywords} />
          )}
        </SectionCard>
      )}

      {data.top_5_recommendations_to_improve_match && (
        <SectionCard title="Top 5 Recommendations to Improve Match" icon={Target}>
          {Array.isArray(data.top_5_recommendations_to_improve_match) ? (
            data.top_5_recommendations_to_improve_match.map((rec, idx) => (
              <div key={idx} style={styles.numberedItem}>
                <span style={styles.numberedItemLabel}>{idx + 1}.</span>
                <div style={styles.numberedItemText}>
                  <MarkdownRenderer content={rec} compact />
                </div>
              </div>
            ))
          ) : (
            <BulletPoint text={data.top_5_recommendations_to_improve_match} />
          )}
        </SectionCard>
      )}

      {data.final_match_score_breakdown && (
        <SectionCard title="Final Match Score Breakdown" variant="info">
          {renderContent(data.final_match_score_breakdown)}
        </SectionCard>
      )}

      {data.raw_response && !data.match_score && (
        <SectionCard title="Analysis Result" variant="info">
          <MarkdownRenderer content={data.raw_response} />
        </SectionCard>
      )}
    </div>
  );
}

export function ResumeImprovementFormatter({ data }) {
  if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
    return (
      <div style={{ color: "#94a3b8", padding: "1rem", textAlign: "center" }}>
        No analysis data available. Please try running the analysis again.
      </div>
    );
  }

  const renderListOrText = (content) => {
    if (!content) return null;
    
    if (Array.isArray(content)) {
      return content.map((item, idx) => (
        <BulletPoint key={idx} text={item} />
      ));
    }
    
    if (typeof content === 'string') {
      return <BulletPoint text={content} />;
    }
    
    return null;
  };

  return (
    <div style={styles.container}>
      {data.top_3_immediate_improvements && (
        <SectionCard title="Top 3 Immediate Improvements" variant="success" icon={Zap}>
          {Array.isArray(data.top_3_immediate_improvements) ? (
            data.top_3_immediate_improvements.map((item, idx) => (
              <div key={idx} style={styles.numberedItem}>
                <span style={{ ...styles.numberedItemLabel, fontWeight: "700" }}>{idx + 1}.</span>
                <div style={{ color: "#cbd5e1", lineHeight: "1.6" }}>
                  <MarkdownRenderer content={item} compact />
                </div>
              </div>
            ))
          ) : (
            <BulletPoint text={data.top_3_immediate_improvements} emphasized={true} />
          )}
        </SectionCard>
      )}

      {data.strengthening_your_experience_section && (
        <SectionCard title="Strengthening Your Experience Section" icon={TrendingUp}>
          {renderListOrText(data.strengthening_your_experience_section)}
        </SectionCard>
      )}

      {data.keywords_and_language_improvements && (
        <SectionCard title="Keywords & Language Improvements" icon={Target}>
          {renderListOrText(data.keywords_and_language_improvements)}
        </SectionCard>
      )}

      {data.skills_section_optimization && (
        <SectionCard title="Skills Section Optimization" icon={CheckCircle}>
          {renderListOrText(data.skills_section_optimization)}
        </SectionCard>
      )}

      {data.formatting_and_structure_fixes && (
        <SectionCard title="Formatting & Structure Fixes" icon={AlertCircle}>
          {renderListOrText(data.formatting_and_structure_fixes)}
        </SectionCard>
      )}

      {data.before_and_after_examples && (
        <SectionCard title="Before & After Examples" variant="info">
          {Array.isArray(data.before_and_after_examples) ? (
            data.before_and_after_examples.map((item, idx) => (
              <div key={idx} style={styles.exampleBox}>
                <MarkdownRenderer content={item} />
              </div>
            ))
          ) : (
            <div style={styles.exampleBox}>
              <MarkdownRenderer content={data.before_and_after_examples} />
            </div>
          )}
        </SectionCard>
      )}

      {data.action_plan_implement_in_this_order && (
        <SectionCard title="Action Plan (Implement in This Order)" variant="info" icon={Target}>
          {Array.isArray(data.action_plan_implement_in_this_order) ? (
            data.action_plan_implement_in_this_order.map((item, idx) => (
              <div key={idx} style={styles.numberedItem}>
                <span style={styles.numberedItemLabel}>{idx + 1}.</span>
                <div style={styles.numberedItemText}>
                  <MarkdownRenderer content={item} compact />
                </div>
              </div>
            ))
          ) : (
            <BulletPoint text={data.action_plan_implement_in_this_order} />
          )}
        </SectionCard>
      )}

      {data.raw_response && !data.top_3_immediate_improvements && (
        <SectionCard title="Analysis Result" variant="info">
          <MarkdownRenderer content={data.raw_response} />
        </SectionCard>
      )}
    </div>
  );
}

export function SkillsGapFormatter({ data }) {
  if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
    return (
      <div style={{ color: "#94a3b8", padding: "1rem", textAlign: "center" }}>
        No analysis data available. Please try running the analysis again.
      </div>
    );
  }

  const renderContent = (content) => {
    if (!content) return null;
    
    if (Array.isArray(content)) {
      return content.map((item, idx) => <BulletPoint key={idx} text={item} />);
    }
    
    return <BulletPoint text={content} />;
  };

  return (
    <div style={styles.container}>
      {data.your_current_strengths && (
        <SectionCard title="Your Current Strengths" variant="success" icon={CheckCircle}>
          {renderContent(data.your_current_strengths)}
        </SectionCard>
      )}

      {data.critical_skill_gaps && (
        <SectionCard title="Critical Skill Gaps" variant="warning" icon={AlertCircle}>
          {renderContent(data.critical_skill_gaps)}
        </SectionCard>
      )}

      {data.nicetohave_skills && (
        <SectionCard title="Nice-to-Have Skills">
          {renderContent(data.nicetohave_skills)}
        </SectionCard>
      )}

      {data.skill_bridge_opportunities && (
        <SectionCard title="Skill Bridge Opportunities" icon={BookOpen}>
          {renderContent(data.skill_bridge_opportunities)}
        </SectionCard>
      )}

      {data.learning_plan_what_to_focus_on && (
        <SectionCard title="Learning Plan - What to Focus On" variant="info">
          {renderContent(data.learning_plan_what_to_focus_on)}
        </SectionCard>
      )}

      {data.quick_wins && (
        <SectionCard title="Quick Wins" variant="success" icon={Zap}>
          {renderContent(data.quick_wins)}
        </SectionCard>
      )}

      {data.next_steps_to_take_today && (
        <SectionCard title="Next Steps to Take Today" variant="success" icon={Target}>
          {Array.isArray(data.next_steps_to_take_today) ? (
            data.next_steps_to_take_today.map((step, idx) => (
              <BulletPoint key={idx} text={step} emphasized={true} />
            ))
          ) : (
            <BulletPoint text={data.next_steps_to_take_today} emphasized={true} />
          )}
        </SectionCard>
      )}

      {data.raw_response && !data.your_current_strengths && (
        <SectionCard title="Analysis Result" variant="info">
          <MarkdownRenderer content={data.raw_response} />
        </SectionCard>
      )}
    </div>
  );
}

export function InterviewPrepFormatter({ data }) {
  if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
    return (
      <div style={{ color: "#94a3b8", padding: "1rem", textAlign: "center" }}>
        No analysis data available. Please try running the analysis again.
      </div>
    );
  }

  const renderContent = (content) => {
    if (!content) return null;
    
    if (Array.isArray(content)) {
      return content.map((item, idx) => <BulletPoint key={idx} text={item} />);
    }
    
    if (typeof content === 'string') {
      return <MarkdownRenderer content={content} />;
    }
    
    return <BulletPoint text={content} />;
  };

  // Check if we have any structured data
  const hasStructuredData = data.predicted_interview_questions || data.your_winning_talking_points || 
                            data.questions_you_should_ask_them || data.red_flags_to_avoid || 
                            data.the_30_second_pitch || data.specific_examples_to_prepare;

  return (
    <div style={styles.container}>
      {data.predicted_interview_questions && (
        <SectionCard title="Predicted Interview Questions" icon={BookOpen}>
          {Array.isArray(data.predicted_interview_questions) ? (
            data.predicted_interview_questions.map((q, idx) => (
              <div key={idx} style={styles.numberedItem}>
                <span style={{ ...styles.numberedItemLabel, color: "#fbbf24", fontWeight: "700" }}>{idx + 1}.</span>
                <div style={styles.numberedItemText}>
                  <MarkdownRenderer content={q} compact />
                </div>
              </div>
            ))
          ) : (
            renderContent(data.predicted_interview_questions)
          )}
        </SectionCard>
      )}

      {data.your_winning_talking_points && (
        <SectionCard title="Your Winning Talking Points" variant="success" icon={CheckCircle}>
          {renderContent(data.your_winning_talking_points)}
        </SectionCard>
      )}

      {data.questions_you_should_ask_them && (
        <SectionCard title="Questions You Should Ask Them" variant="info">
          {renderContent(data.questions_you_should_ask_them)}
        </SectionCard>
      )}

      {data.red_flags_to_avoid && (
        <SectionCard title="Red Flags to Avoid" variant="warning" icon={AlertCircle}>
          {renderContent(data.red_flags_to_avoid)}
        </SectionCard>
      )}

      {data.the_30_second_pitch && (
        <SectionCard title="Your 30-Second Pitch" variant="info">
          <div style={styles.pitchBox}>
            {typeof data.the_30_second_pitch === "string" ? (
              <MarkdownRenderer content={data.the_30_second_pitch} />
            ) : (
              renderContent(data.the_30_second_pitch)
            )}
          </div>
        </SectionCard>
      )}

      {data.specific_examples_to_prepare && (
        <SectionCard title="Specific Examples to Prepare" icon={Target}>
          {renderContent(data.specific_examples_to_prepare)}
        </SectionCard>
      )}

      {data.raw_response && !hasStructuredData && (
        <SectionCard title="Analysis Result" variant="info">
          <MarkdownRenderer content={data.raw_response} />
        </SectionCard>
      )}
    </div>
  );
}

export function SalaryNegotiationFormatter({ data }) {
  if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
    return (
      <div style={{ color: "#94a3b8", padding: "1rem", textAlign: "center" }}>
        No analysis data available. Please try running the analysis again.
      </div>
    );
  }

  const renderContent = (content) => {
    if (!content) return null;
    
    if (Array.isArray(content)) {
      return content.map((item, idx) => <BulletPoint key={idx} text={item} />);
    }
    
    if (typeof content === 'string') {
      return <MarkdownRenderer content={content} />;
    }
    
    return <BulletPoint text={content} />;
  };

  // Check if we have any structured data
  const hasStructuredData = data.market_salary_range_for_this_role_india || 
                            data.why_you_deserve_a_higher_salary || 
                            data.your_negotiation_strategy || data.phrases_that_work || 
                            data.phrases_to_avoid || data.final_advice;

  return (
    <div style={styles.container}>
      {data.market_salary_range_for_this_role_india && (
        <SectionCard title="Market Salary Range (India)" variant="info">
          {Array.isArray(data.market_salary_range_for_this_role_india) ? (
            data.market_salary_range_for_this_role_india.map((range, idx) => (
              <div 
                key={idx} 
                style={{
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  marginBottom: "0.5rem",
                  ...(idx === data.market_salary_range_for_this_role_india.length - 1
                    ? {
                        backgroundColor: "rgba(34, 197, 94, 0.3)",
                        border: "1px solid rgba(34, 197, 94, 0.5)",
                      }
                    : {
                        backgroundColor: "rgba(51, 65, 85, 0.2)",
                      }),
                }}
              >
                <BulletPoint text={range} emphasized={idx === data.market_salary_range_for_this_role_india.length - 1} />
              </div>
            ))
          ) : (
            renderContent(data.market_salary_range_for_this_role_india)
          )}
        </SectionCard>
      )}

      {data.why_you_deserve_a_higher_salary && (
        <SectionCard title="Why You Deserve a Higher Salary" variant="success" icon={TrendingUp}>
          {renderContent(data.why_you_deserve_a_higher_salary)}
        </SectionCard>
      )}

      {data.your_negotiation_strategy && (
        <SectionCard title="Your Negotiation Strategy" icon={Target}>
          {Array.isArray(data.your_negotiation_strategy) ? (
            data.your_negotiation_strategy.map((step, idx) => (
              <div key={idx} style={styles.numberedItem}>
                <span style={{ ...styles.numberedItemLabel, fontWeight: "700", minWidth: "5rem" }}>Step {idx + 1}:</span>
                <div style={styles.numberedItemText}>
                  <MarkdownRenderer content={step} compact />
                </div>
              </div>
            ))
          ) : (
            renderContent(data.your_negotiation_strategy)
          )}
        </SectionCard>
      )}

      {data.phrases_that_work && (
        <SectionCard title="Effective Phrases That Work" variant="success">
          {Array.isArray(data.phrases_that_work) ? (
            data.phrases_that_work.map((phrase, idx) => (
              <p
                key={idx}
                style={{ ...styles.phraseBox, ...styles.phraseBoxSuccess }}
              >
                &ldquo;<MarkdownRenderer content={phrase} inline />&rdquo;
              </p>
            ))
          ) : (
            <p style={{ ...styles.phraseBox, ...styles.phraseBoxSuccess }}>
              &ldquo;{renderContent(data.phrases_that_work)}&rdquo;
            </p>
          )}
        </SectionCard>
      )}

      {data.phrases_to_avoid && (
        <SectionCard title="Phrases to Avoid" variant="warning" icon={AlertCircle}>
          {Array.isArray(data.phrases_to_avoid) ? (
            data.phrases_to_avoid.map((phrase, idx) => (
              <p key={idx} style={styles.phraseBoxError}>
                <span style={styles.errorText}>✗ Don&apos;t say:</span> &ldquo;<MarkdownRenderer content={phrase} inline />&rdquo;
              </p>
            ))
          ) : (
            <p style={styles.phraseBoxError}>
              <span style={styles.errorText}>✗</span> {renderContent(data.phrases_to_avoid)}
            </p>
          )}
        </SectionCard>
      )}

      {data.final_advice && (
        <SectionCard title="Final Advice" variant="info" icon={Zap}>
          {renderContent(data.final_advice)}
        </SectionCard>
      )}

      {data.raw_response && !hasStructuredData && (
        <SectionCard title="Analysis Result" variant="info">
          <MarkdownRenderer content={data.raw_response} />
        </SectionCard>
      )}
    </div>
  );
}

export default function AnalysisFormatter({ analysisType, data }) {
  if (!data) {
    return (
      <div style={{ 
        color: "#94a3b8", 
        padding: "2rem", 
        textAlign: "center",
        backgroundColor: "rgba(15, 23, 42, 0.5)",
        borderRadius: "0.75rem",
        border: "1px solid rgba(71, 85, 105, 0.3)",
      }}>
        No data available for this analysis. Please try running the analysis again.
      </div>
    );
  }

  // Handle raw text responses
  if (typeof data === 'string') {
    return (
      <div style={{ 
        padding: "1.5rem",
        backgroundColor: "rgba(15, 23, 42, 0.5)",
        borderRadius: "0.75rem",
        border: "1px solid rgba(71, 85, 105, 0.3)",
      }}>
        <MarkdownRenderer content={data} />
      </div>
    );
  }

  const formatters = {
    ats: ATSReviewFormatter,
    match: ATSMatchFormatter,
    improve: ResumeImprovementFormatter,
    skills: SkillsGapFormatter,
    interview: InterviewPrepFormatter,
    salary: SalaryNegotiationFormatter,
  };

  const Formatter = formatters[analysisType];
  
  if (!Formatter) {
    return (
      <div style={{ color: "#94a3b8", padding: "1rem" }}>
        Unknown analysis type: {analysisType}
      </div>
    );
  }

  return <Formatter data={data} />;
}
