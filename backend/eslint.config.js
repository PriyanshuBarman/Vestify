import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import unicorn from "eslint-plugin-unicorn";
import prettierConfig from "eslint-config-prettier";
import unusedImports from "eslint-plugin-unused-imports";

export default defineConfig([
  {
    ignores: ["node_modules/**", "prisma/**", "generated/**"],
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js, "unused-imports": unusedImports, unicorn: unicorn },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
    rules: {
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
        },
      ],
    },
  },
  prettierConfig,
]);
