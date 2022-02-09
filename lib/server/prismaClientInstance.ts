/**
 * Conditiionally instantiates PrismaClient on-demand or globally depending on
 *  whether we're in a local or deployed(serverless) environment.
 *
 * https://github.com/prisma/prisma/issues/5007#issuecomment-618433162
 */
import { PrismaClient } from "@prisma/client";

export let prisma: PrismaClient;

const options = {};

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient(options);
} else {
  if (typeof (global as any)["prisma"] === "undefined") {
    (global as any)["prisma"] = new PrismaClient(options);
  }

  prisma = (global as any)["prisma"];
}

export default prisma;
