"use client";

import { motion } from "framer-motion";

interface SacredGeometryProps {
  className?: string;
  variant?: "sriram" | "yantra" | "mandala" | "lotus";
  size?: number;
}

export function SacredGeometry({ className, variant = "sriram", size = 200 }: SacredGeometryProps) {
  if (variant === "sriram") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.g
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {/* Outer circle */}
          <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          
          {/* Sri Yantra triangles */}
          <polygon
            points="100,20 180,160 20,160"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
          />
          <polygon
            points="100,180 20,40 180,40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
          />
          
          {/* Inner circles */}
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          
          {/* Center point */}
          <circle cx="100" cy="100" r="5" fill="currentColor" opacity="0.5" />
        </motion.g>
      </svg>
    );
  }

  if (variant === "yantra") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.g
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Outer square */}
          <rect x="10" y="10" width="180" height="180" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          
          {/* Inner square */}
          <rect x="30" y="30" width="140" height="140" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          
          {/* Circle */}
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          
          {/* Triangle */}
          <polygon
            points="100,40 160,140 40,140"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.5"
          />
          
          {/* Center */}
          <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.6" />
        </motion.g>
      </svg>
    );
  }

  if (variant === "mandala") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.g
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          {/* Outer petals */}
          {[...Array(8)].map((_, i) => (
            <ellipse
              key={i}
              cx={100 + 70 * Math.cos((i * Math.PI) / 4)}
              cy={100 + 70 * Math.sin((i * Math.PI) / 4)}
              rx="15"
              ry="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
              transform={`rotate(${i * 45} ${100 + 70 * Math.cos((i * Math.PI) / 4)} ${100 + 70 * Math.sin((i * Math.PI) / 4)})`}
            />
          ))}
          
          {/* Inner circle */}
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          
          {/* Inner petals */}
          {[...Array(8)].map((_, i) => (
            <ellipse
              key={`inner-${i}`}
              cx={100 + 35 * Math.cos((i * Math.PI) / 4)}
              cy={100 + 35 * Math.sin((i * Math.PI) / 4)}
              rx="8"
              ry="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
              transform={`rotate(${i * 45} ${100 + 35 * Math.cos((i * Math.PI) / 4)} ${100 + 35 * Math.sin((i * Math.PI) / 4)})`}
            />
          ))}
          
          {/* Center */}
          <circle cx="100" cy="100" r="15" fill="currentColor" opacity="0.4" />
        </motion.g>
      </svg>
    );
  }

  if (variant === "lotus") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.g
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Outer petals */}
          {[...Array(12)].map((_, i) => (
            <ellipse
              key={i}
              cx={100 + 60 * Math.cos((i * Math.PI) / 6)}
              cy={100 + 60 * Math.sin((i * Math.PI) / 6)}
              rx="12"
              ry="25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
              transform={`rotate(${i * 30} ${100 + 60 * Math.cos((i * Math.PI) / 6)} ${100 + 60 * Math.sin((i * Math.PI) / 6)})`}
            />
          ))}
          
          {/* Middle petals */}
          {[...Array(8)].map((_, i) => (
            <ellipse
              key={`mid-${i}`}
              cx={100 + 40 * Math.cos((i * Math.PI) / 4)}
              cy={100 + 40 * Math.sin((i * Math.PI) / 4)}
              rx="10"
              ry="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.4"
              transform={`rotate(${i * 45} ${100 + 40 * Math.cos((i * Math.PI) / 4)} ${100 + 40 * Math.sin((i * Math.PI) / 4)})`}
            />
          ))}
          
          {/* Inner petals */}
          {[...Array(4)].map((_, i) => (
            <ellipse
              key={`inner-${i}`}
              cx={100 + 20 * Math.cos((i * Math.PI) / 2)}
              cy={100 + 20 * Math.sin((i * Math.PI) / 2)}
              rx="8"
              ry="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
              transform={`rotate(${i * 90} ${100 + 20 * Math.cos((i * Math.PI) / 2)} ${100 + 20 * Math.sin((i * Math.PI) / 2)})`}
            />
          ))}
          
          {/* Center */}
          <circle cx="100" cy="100" r="10" fill="currentColor" opacity="0.5" />
        </motion.g>
      </svg>
    );
  }

  return null;
}
