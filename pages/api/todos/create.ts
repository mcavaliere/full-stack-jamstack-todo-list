import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Todo } from "@prisma/client";

import { prisma } from "../../../lib/server/prismaClientInstance";

type ResponseData = {
  todo: Todo;
};

type ResponseError = {
  error: string;
};

type ResponsePayload = ResponseData | ResponseError;

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponsePayload>
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  if (req.method !== "POST") {
    return res.status(400).end();
  }

  const { text } = req.body;
  const { user } = session;

  try {
    const todo = await prisma.todo.create({
      data: {
        text,
        user: {
          connect: { id: user!.id },
        },
      },
    });

    res.status(200).json({ todo });
  } catch (error: unknown) {
    // https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
    const message: string =
      error instanceof Error ? error.message : (error as string);

    console.warn(`Error in /api/todos/create: `, error);

    res.status(500).json({ error: message });
  }
}

export default handler;
