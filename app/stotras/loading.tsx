"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function StotrasLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="space-y-8 text-center">
          <motion.div
            className="relative mx-auto size-24"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-4 border-b-transparent border-l-transparent border-r-primary border-t-primary" />
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-primary/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="size-8 text-primary" />
            </div>
          </motion.div>

          <div className="space-y-2">
            <motion.p
              className="text-lg font-semibold text-foreground"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Loading Stotras & Mantras
            </motion.p>
            <motion.p
              className="text-sm text-muted-foreground"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
            >
              Gathering sacred hymns...
            </motion.p>
          </div>

          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
