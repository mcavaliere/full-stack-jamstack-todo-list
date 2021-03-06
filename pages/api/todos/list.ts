import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Todo } from "@prisma/client";

import prisma from "../../../lib/server/prismaClientInstance";

type ResponseData = {
  todos: Todo[];
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

  if (req.method !== "GET") {
    return res.status(400).end();
  }

  const { user } = session;

  try {
    const todos = await prisma.todo.findMany({
      where: {
        user: {
          id: user!.id,
        },
      },
    });

    return res.status(200).json({ todos });
  } catch (error) {
    // https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
    const message: string =
      error instanceof Error ? error.message : (error as string);

    console.warn(`Error in /api/todos/list: `, error);

    return res.status(500).json({ error: message });
  }
}

export default handler;
