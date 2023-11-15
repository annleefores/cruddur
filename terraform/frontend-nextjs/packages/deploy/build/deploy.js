/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/build.ts":
/*!**********************!*\
  !*** ./src/build.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build = void 0;
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const utils_2 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const nextjsBuild = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running Next Build......");
    yield (0, utils_2.term)("npm run build");
});
const nextPackage = () => {
    console.log("Copying static files.....");
    const { srcPath, publicPath, standaloneOutputPath } = (0, utils_1.filePath)();
    const destPublic = path_1.default.join(standaloneOutputPath, "public");
    // Copy public files to standalone
    if (fs_1.default.existsSync(publicPath)) {
        if (!fs_1.default.existsSync(destPublic)) {
            fs_1.default.mkdirSync(destPublic, { recursive: true });
        }
        fs_1.default.cpSync(publicPath, destPublic, { recursive: true });
        // Copy favicon
        const faviconPath = path_1.default.join(srcPath, "favicon.ico");
        if (fs_1.default.existsSync(faviconPath)) {
            fs_1.default.copyFileSync(faviconPath, path_1.default.join(destPublic, "favicon.ico"));
        }
    }
};
const CreateRunScript = () => {
    console.log("Creating run script.....");
    const { standaloneOutputPath } = (0, utils_1.filePath)();
    // run bash script code
    const script = `#!/bin/bash
[ ! -d '/tmp/cache' ] && mkdir -p /tmp/cache
exec node server.js`;
    fs_1.default.writeFile(`${standaloneOutputPath}/run.sh`, script, (err) => {
        if (err)
            throw err;
    });
};
const build = () => __awaiter(void 0, void 0, void 0, function* () {
    yield nextjsBuild();
    nextPackage();
    CreateRunScript();
    console.log("Build complete!");
});
exports.build = build;


/***/ }),

/***/ "./src/deploy.ts":
/*!***********************!*\
  !*** ./src/deploy.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tfDelete = exports.tfDeploy = void 0;
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const { tfPath, appPath } = (0, utils_1.filePath)();
const tfDeploy = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running deploy command.....");
    yield (0, utils_1.term)(`terraform -chdir=${tfPath}/ apply -var="SOURCE_DIR=${appPath}/.next" --auto-approve`);
    console.log("\nDeploy complete!");
    console.log("\nWait for CloudFront Deployment/Invalidation to complete....\n");
});
exports.tfDeploy = tfDeploy;
const tfDelete = () => __awaiter(void 0, void 0, void 0, function* () {
    const { tfPath } = (0, utils_1.filePath)();
    console.log("Running deployment delete command.....");
    yield (0, utils_1.term)(`terraform -chdir=${tfPath}/ destroy -var="SOURCE_DIR=${appPath}/.next" --auto-approve`);
    console.log("Delete complete!");
});
exports.tfDelete = tfDelete;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const build_1 = __webpack_require__(/*! ./build */ "./src/build.ts");
const deploy_1 = __webpack_require__(/*! ./deploy */ "./src/deploy.ts");
const deploy = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, build_1.build)();
    yield (0, deploy_1.tfDeploy)();
});
const del = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, deploy_1.tfDelete)();
});
//Todo: Configure Deploy, Build, Delete conditionals
const run = () => {
    const args = process.argv.slice(2);
    if (args[0] === "deploy") {
        deploy();
    }
    else if (args[0] === "build") {
        (0, build_1.build)();
    }
    else if (args[0] === "delete") {
        del();
    }
    else {
        console.log("Please provide a valid argument - deploy, delete or build");
    }
};
run();


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.term = exports.filePath = void 0;
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const child_process_1 = __webpack_require__(/*! child_process */ "child_process");
const filePath = () => {
    const appPath = path_1.default.join(process.cwd(), ".");
    const srcOrApp = fs_1.default.existsSync(path_1.default.join(appPath, "src")) ? "src/app" : "app";
    const srcPath = path_1.default.join(appPath, srcOrApp);
    const scriptBasePath = path_1.default.join(__dirname, "../../../");
    return {
        srcPath: srcPath,
        publicPath: path_1.default.join(appPath, "public"),
        appPath: appPath,
        standaloneOutputPath: path_1.default.join(appPath, ".next", "standalone"),
        staticOutputPath: path_1.default.join(appPath, ".next", "static"),
        tfPath: path_1.default.join(scriptBasePath, "tf"),
    };
};
exports.filePath = filePath;
const term = (command) => {
    return new Promise((resolve, reject) => {
        const child = (0, child_process_1.spawn)(command, { shell: true });
        child.stdout.on("data", (data) => {
            process.stdout.write(`${data}`);
        });
        child.stderr.on("data", (data) => {
            console.error(`${data}`);
        });
        child.on("close", (code) => {
            resolve(code);
        });
        child.on("error", (error) => {
            console.error(`Error: ${error}`);
            reject(error);
        });
    });
};
exports.term = term;


/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=deploy.js.map