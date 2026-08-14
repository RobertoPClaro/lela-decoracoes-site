const fs = require("node:fs");
const path = require("node:path");

const output = path.resolve(__dirname, "../dist");
if (fs.existsSync(output)) fs.rmSync(output, { recursive: true, force: true });
