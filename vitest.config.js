/// <reference types="vitest" />

import { defineConfig } from "vite";

export default defineConfig({
	test: {
		watch: false,
		globals: true,
		environment: "node",
		include: ["./tests/**/*.test.ts"],
		watchExclude: [".*\\/node_modules\\/.*", ".*\\/dist\\/.*"],
	},
});
