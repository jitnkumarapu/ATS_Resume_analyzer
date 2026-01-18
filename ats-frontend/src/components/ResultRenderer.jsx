import { motion } from "framer-motion";
import { useState } from "react";
import AnalysisFormatter from "./AnalysisFormatter";

function ResultRenderer({ data, analysisType }) {
  if (!data) {
    return (
      <div className="text-slate-400">No data to display</div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10"
    >
      <h2 className="text-2xl font-semibold mb-6 text-slate-100">Analysis Results</h2>
      <AnalysisFormatter analysisType={analysisType} data={data} />
    </motion.div>
  );
}

export default ResultRenderer;

