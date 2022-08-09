module.exports = {
    env: {
        node: true,
        jest: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir : __dirname, 
        sourceType: "module",
    },
    plugins: ["@typescript-eslint/eslint-plugin", "prettier"],
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "prettier", // To avoid conflicts with prettier rules
    ],
    root: true,
    ignorePatterns: [".eslintrc.js"],
    rules: {
        "prettier/prettier": "warn",
        "@typescript-eslint/no-explicit-any": "off",
    },
};
