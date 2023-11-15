import path from "path";
import fs from "fs";
import { filePath } from "./utils";
import { term } from "./utils";

const nextjsBuild = async () => {
  console.log("Running Next Build......");
  await term("npm run build");
};

const nextPackage = () => {
  console.log("Copying static files.....");
  const { srcPath, publicPath, standaloneOutputPath } = filePath();

  const destPublic = path.join(standaloneOutputPath, "public");

  // Copy public files to standalone
  if (fs.existsSync(publicPath)) {
    if (!fs.existsSync(destPublic)) {
      fs.mkdirSync(destPublic, { recursive: true });
    }
    fs.cpSync(publicPath, destPublic, { recursive: true });

    // Copy favicon
    const faviconPath = path.join(srcPath, "favicon.ico");

    if (fs.existsSync(faviconPath)) {
      fs.copyFileSync(faviconPath, path.join(destPublic, "favicon.ico"));
    }
  }
};

const CreateRunScript = () => {
  console.log("Creating run script.....");

  const { standaloneOutputPath } = filePath();

  // run bash script code
  const script = `#!/bin/bash
[ ! -d '/tmp/cache' ] && mkdir -p /tmp/cache
exec node server.js`;

  fs.writeFile(`${standaloneOutputPath}/run.sh`, script, (err) => {
    if (err) throw err;
  });
};

export const build = async () => {
  await nextjsBuild();
  nextPackage();
  CreateRunScript();
  console.log("Build complete!");
};
