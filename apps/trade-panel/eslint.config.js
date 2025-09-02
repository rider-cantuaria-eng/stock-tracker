import { fileURLToPath } from "url";
import { dirname } from "path";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import eslintPluginImportHelpers from "eslint-plugin-import-helpers";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
	// General config for src/**/*.ts and **/*.tsx
	{
		files: ["src/**/*.ts", "**/*.tsx"],
		ignores: ["dist/**", ".jest", ".next/**"],
		languageOptions: {
			parser: typescriptEslintParser,
			parserOptions: {
				project: "tsconfig.json",
				tsconfigRootDir: __dirname,
				sourceType: "module",
			},
		},
		plugins: {
			"@typescript-eslint": typescriptEslintPlugin,
			"import-helpers": eslintPluginImportHelpers,
			prettier: eslintPluginPrettier,
			"unused-imports": eslintPluginUnusedImports,
		},
		rules: {
			"prettier/prettier": ["warn"],
			"@typescript-eslint/interface-name-prefix": "off",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/consistent-type-imports": "off",
			"import-helpers/order-imports": [
				"warn",
				{
					newlinesBetween: "always",
					groups: ["module", "/^@shared/", ["parent", "sibling", "index"]],
					alphabetize: { order: "asc", ignoreCase: true },
				},
			],
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
		},
	},

	// Specific config for Storybook
	{
		files: [".storybook/**/*.{ts,tsx}"],
		languageOptions: {
			parser: typescriptEslintParser,
			parserOptions: {
				project: undefined,
			},
		},
	},
];
