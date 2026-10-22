"use client";

import { motion } from "framer-motion";
import { Music } from "lucide-react";

export default function AudioLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="space-y-8 text-center">
          <motion.div
            className="relative mx-auto size-24"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="border-primary/20 absolute inset-0 rounded-full border-4" />
            <div className="border-r-primary border-t-primary absolute inset-0 rounded-full border-4 border-b-transparent border-l-transparent" />
            <motion.div
              className="border-primary/10 absolute inset-2 rounded-full border-2"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Music className="text-primary size-8" />
            </div>
          </motion.div>

          <div className="space-y-2">
            <motion.p
              className="text-foreground text-lg font-semibold"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Loading Vedic Audio Library
            </motion.p>
            <motion.p
              className="text-muted-foreground text-sm"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
            >
              Preparing sacred recitations…
            </motion.p>
          </div>

          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="bg-primary size-2 rounded-full"
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
