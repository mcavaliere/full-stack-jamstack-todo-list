import { Todo } from "@prisma/client";
import { Box } from "@chakra-ui/react";

export type TodoRowProps = {
  todo: Todo;
};

export const TodoRow = ({ todo: { id, text } }: TodoRowProps) => {
  return <Box>{text}</Box>;
};
