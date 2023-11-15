import { filePath, term } from "./utils";

const { tfPath, appPath } = filePath();

export const tfDeploy = async () => {
  console.log("Running deploy command.....");
  await term(
    `terraform -chdir=${tfPath}/ apply -var="SOURCE_DIR=${appPath}/.next" --auto-approve`
  );
  console.log("\nDeploy complete!");
  console.log(
    "\nWait for CloudFront Deployment/Invalidation to complete....\n"
  );
};

export const tfDelete = async () => {
  const { tfPath } = filePath();
  console.log("Running deployment delete command.....");
  await term(
    `terraform -chdir=${tfPath}/ destroy -var="SOURCE_DIR=${appPath}/.next" --auto-approve`
  );
  console.log("Delete complete!");
};
