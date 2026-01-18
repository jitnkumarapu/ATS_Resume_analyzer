import { motion } from "framer-motion";
import AnalysisFormatter from "./AnalysisFormatter";

export default function ResultCard({ title, data, type }) {
  // Extract the actual result data - handle nested structures
  let analysisData = data;
  
  if (data) {
    // API returns { result: {...} }
    if (data.result) {
      analysisData = data.result;
    }
    // If it's already the result object, use it as-is
    else if (typeof data === 'object' && !Array.isArray(data)) {
      analysisData = data;
    }
    // If it's a string, pass it through
    else if (typeof data === 'string') {
      analysisData = data;
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem", color: "#e2e8f0" }}>
        {title}
      </h2>
      <AnalysisFormatter analysisType={type} data={analysisData} />
    </motion.div>
  );
}

