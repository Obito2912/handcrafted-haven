import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

/**
 * ESLint configuration for the project
 * - Enforces single quotes instead of double quotes
 * - Uses Next.js recommended rules
 * - Defines files and folders to ignore
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      // Require single quotes instead of double quotes
      // avoidEscape: allows double quotes if it avoids escaping
      // allowTemplateLiterals: allows template literals (backticks)
      quotes: [
        "error",
        "single",
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
