import type { NextPage } from "next";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Container,
  Link,
  StackDivider,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import useSWR from "swr";
import { Todo } from "@prisma/client";
import { NavBar } from "../components/NavBar";
import { TodoRow } from "../components/TodoRow";
import { AddTodoModal } from "../components/AddTodoModal";
import { create } from "../lib/client/api/todos";
import { TodoFormInput } from "../lib/shared/types";
import { fetcher } from "../lib/client/fetcher";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const { data: todosData, mutate: mutateTodos } = useSWR(
    "/api/todos/list",
    fetcher
  );
  const isLoading = status === "loading";
  const isLoggedIn = status === "authenticated";
  const todos = todosData?.todos;

  const {
    isOpen: addTodoModalIsOpen,
    onOpen: openAddTodoModal,
    onClose: closeAddTodoModal,
  } = useDisclosure();

  const handleAddTodoClicked = () => {
    openAddTodoModal();
  };

  const handleAddTodoSubmit = async ({ text }: TodoFormInput) => {
    try {
      await create({ text });
      mutateTodos();
      closeAddTodoModal();
    } catch (error) {
      console.warn(`Error creating todo: `, error);
    }
  };

  return (
    <>
      <NavBar />
      <Container>
        <Head>
          <title>Full-Stack Jamstack TODO List</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <Heading size='xl' mb={10}>
          Full-Stack Jamstack TODO List
        </Heading>

        {!isLoading && !isLoggedIn && (
          <Flex direction='row' align='center' justify='center'>
            <Heading size='lg'>
              <Link onClick={() => signIn()}>Sign in</Link> to access your todo
              list.
            </Heading>
          </Flex>
        )}

        {!isLoading && isLoggedIn && (
          <>
            <Box boxShadow='lg' p={6} rounded='md' bg='white'>
              {todos?.length > 0 ? (
                <VStack divider={<StackDivider />} align='space-between'>
                  {todos.map((todo: Todo) => (
                    <TodoRow todo={todo} key={todo.id} />
                  ))}
                </VStack>
              ) : (
                <Heading size='lg'>No todos yet. Add some.</Heading>
              )}
            </Box>
            <Flex direction='row' justify='flex-end' mt={5} variant='primary'>
              <Button onClick={handleAddTodoClicked} colorScheme='blue'>
                Add Todo
              </Button>
            </Flex>
          </>
        )}

        {addTodoModalIsOpen && (
          <AddTodoModal
            onSubmit={handleAddTodoSubmit}
            isOpen={addTodoModalIsOpen}
            onClose={closeAddTodoModal}
          />
        )}
      </Container>
    </>
  );
};

export default Home;
