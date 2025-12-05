// .prettierrc.cjs
/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: "es5",
  jsxSingleQuote: false,
  htmlWhitespaceSensitivity: "css",
  overrides: [
    {
      files: ["*.js"],
      options: { parser: "babel" }
    },
    {
      files: ["*.jsx"],
      options: { parser: "babel" }
    },
    {
      files: ["*.ts"],
      options: { parser: "typescript" }
    },
    {
      files: ["*.tsx"],
      options: { parser: "typescript" }
    },
    {
      // もし HTML/Pug/EJS も整形するならここに追加
      files: ["*.html"],
      options: { parser: "html" }
    }
  ]
};
