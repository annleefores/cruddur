/// <reference path="./.sst/types/index.ts" />

// environment.d.ts
export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CERT_ARN: string;
    }
  }
}
