import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

/**
 * ESLint configuration for the project
 * - Enforces double quotes instead of single quotes
 * - Uses Next.js recommended rules
 * - Defines files and folders to ignore
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      // Require double quotes instead of single quotes
      // avoidEscape: allows single quotes if it avoids escaping
      // allowTemplateLiterals: allows template literals (backticks)
      quotes: [
        "error",
        "double",
        { avoidEscape: true, allowTemplateLiterals: true },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
