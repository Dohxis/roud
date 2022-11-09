require("esbuild").buildSync({
	bundle: true,
	sourcemap: true,
	entryPoints: ["src/index.ts"],
	external: ["zod"],
	outfile: "dist/index.js",
	format: "esm",
	target: ["esnext"],
});
