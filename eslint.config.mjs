import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["eslint.config.mjs", "dist/**", "node_modules/**"],
  },

  {
    ...js.configs.recommended,
    files: ["**/*.{js,mjs,cjs}"],
  },

  {
    files: ["src/**/*.ts"],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      "no-undef": "off",
    },
    ...tseslint.configs.recommendedTypeChecked[0],
  },
];
