import { motion } from "framer-motion";
import { FileText, Briefcase } from "lucide-react";

export default function InputSection({ resume, setResume, jd, setJd }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid md:grid-cols-2 gap-6 mb-8"
    >
      <div>
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-blue-400" />
          <label className="block font-semibold text-slate-100">Resume</label>
        </div>
        <textarea
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          placeholder="Your resume content..."
          className="w-full h-48 bg-slate-800 border border-slate-600 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
        />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="w-5 h-5 text-purple-400" />
          <label className="block font-semibold text-slate-100">Job Description</label>
        </div>
        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Job description..."
          className="w-full h-48 bg-slate-800 border border-slate-600 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
        />
      </div>
    </motion.div>
  );
}

