import type { NextPage } from "next";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Box,
  Flex,
  Heading,
  Container,
  Link,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";
import useSWR from "swr";
import { Todo } from "@prisma/client";
import { NavBar } from "../components/NavBar";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const { data: todos } = useSWR("/api/todos/list");
  const isLoading = status === "loading";
  const isLoggedIn = status === "authenticated";

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
          <Box boxShadow='lg' p={6} rounded='md' bg='white'>
            {todos?.length > 0 ? (
              <OrderedList>
                {todos.map(({ text, id }: Todo) => (
                  <ListItem key={id}>{text}</ListItem>
                ))}
              </OrderedList>
            ) : (
              <Heading size='lg'>No todos yet. Add some.</Heading>
            )}
          </Box>
        )}
      </Container>
    </>
  );
};

export default Home;
