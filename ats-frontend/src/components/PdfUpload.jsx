import { motion } from "framer-motion";
import { Upload, FileText } from "lucide-react";
import { parseResume } from "../api/atsApi";

function PdfUpload({ setLoading, setResult, setResumeText }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const data = await parseResume(file);
      setResumeText(data.resume_text || "");
      setResult(data);
    } catch (err) {
      alert("Resume upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-400" />
        <label className="block font-semibold text-slate-100">
          Upload Resume (PDF / DOCX)
        </label>
      </div>

      <label className="block cursor-pointer">
        <div className="border-2 border-dashed border-slate-500 hover:border-blue-400 rounded-xl p-8 text-center transition-colors">
          <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
          <p className="text-slate-300 font-medium">Click to upload or drag and drop</p>
          <p className="text-sm text-slate-500 mt-1">PDF or DOCX files</p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleUpload}
            className="hidden"
          />
        </div>
      </label>
    </motion.div>
  );
}

export default PdfUpload;

