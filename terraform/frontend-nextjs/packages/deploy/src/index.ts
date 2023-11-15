import { build } from "./build";
import { tfDelete, tfDeploy } from "./deploy";

const deploy = async () => {
  await build();
  await tfDeploy();
};

const del = async () => {
  await tfDelete();
};

//Todo: Configure Deploy, Build, Delete conditionals

const run = () => {
  const args = process.argv.slice(2);
  if (args[0] === "deploy") {
    deploy();
  } else if (args[0] === "build") {
    build();
  } else if (args[0] === "delete") {
    del();
  } else {
    console.log("Please provide a valid argument - deploy, delete or build");
  }
};

run();
