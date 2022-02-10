import prisma from "../../../../lib/server/prismaClientInstance";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "GET") {
    return res.status(400).end();
  }

  try {
    await prisma.
  }
}

export default handler;
