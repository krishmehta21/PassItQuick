const { FlatCompat } = require("@eslint/eslintrc");
const globals = require("globals");
const js = require("@eslint/js");
const ts = require("typescript-eslint");

const compat = new FlatCompat();

module.exports = [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...compat.extends("google"),
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "object-curly-spacing": "off",
      "quotes": ["error", "double"],
      "import/no-unresolved": 0,
      "indent": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
];

