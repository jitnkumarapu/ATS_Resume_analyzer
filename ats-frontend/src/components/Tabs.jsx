import { motion } from "framer-motion";

function Tabs({ activeTab, setActiveTab, tabs }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-2 overflow-x-auto pb-2 mb-6"
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
            activeTab === tab.id
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          {tab.label}
        </motion.button>
      ))}
    </motion.div>
  );
}

export default Tabs;

