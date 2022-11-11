require("esbuild").buildSync({
	bundle: true,
	sourcemap: true,
	entryPoints: ["src/index.ts"],
	external: ["zod"],
	outfile: "dist/index.js",
	platform: "node",
	target: ["node16"],
});
