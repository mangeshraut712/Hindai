#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🔍 Running Alternative Code Quality Checks...\n");

// Check TypeScript
console.log("1️⃣ TypeScript Strict Mode Check:");
try {
  execSync("npm run type-check", { stdio: "inherit" });
  console.log("✅ TypeScript check passed\n");
} catch (error) {
  console.log("❌ TypeScript check failed\n");
  process.exit(1);
}

// Check Prettier formatting
console.log("2️⃣ Prettier Formatting Check:");
try {
  execSync("npm run format:check", { stdio: "inherit" });
  console.log("✅ Prettier check passed\n");
} catch (error) {
  console.log("❌ Prettier check failed\n");
  process.exit(1);
}

// Basic code quality checks
console.log("3️⃣ Basic Code Quality Checks:");

const criticalFiles = [
  "app/page.tsx",
  "app/HomePage.tsx",
  "src/components/Header.tsx",
  "src/lib/ai/openrouter.ts",
];

let issuesFound = [];

criticalFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, "utf8");

    // Check for common issues
    if (content.includes("console.log") && !file.includes("test")) {
      issuesFound.push(`${file}: Contains console.log`);
    }

    if (content.includes("TODO:") || content.includes("FIXME:")) {
      issuesFound.push(`${file}: Contains TODO/FIXME comments`);
    }

    if (content.includes("any") && !file.includes("test")) {
      issuesFound.push(`${file}: Contains 'any' type`);
    }
  }
});

if (issuesFound.length > 0) {
  console.log("⚠️  Code Quality Issues Found:");
  issuesFound.forEach((issue) => console.log(`   - ${issue}`));
  console.log("\n💡 Consider addressing these issues for better code quality");
} else {
  console.log("✅ No obvious code quality issues found\n");
}

console.log("🎉 Alternative code quality checks completed!");
console.log("📝 Note: ESLint is temporarily disabled due to AJV schema compatibility issue");
console.log("🔧 Code quality is maintained through TypeScript, Prettier, and manual checks");
