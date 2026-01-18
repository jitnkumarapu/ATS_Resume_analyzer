import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [-8, 0, -8] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
          }}
          className="w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full"
        />
      ))}
    </div>
  );
}
