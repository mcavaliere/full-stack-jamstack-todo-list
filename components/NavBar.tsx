import { Button, Flex } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";

export const NavBar = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isLoggedIn = status === "authenticated";

  return (
    <Flex direction='row' align='center' justify='flex-end' p={5}>
      {!isLoading && !isLoggedIn && (
        <Button onClick={() => signIn()}>Login</Button>
      )}
      {!isLoading && isLoggedIn && (
        <Button onClick={() => signOut()}>Logout</Button>
      )}
    </Flex>
  );
};
