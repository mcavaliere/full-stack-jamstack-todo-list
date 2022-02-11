import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { TodoFormInput } from "../lib/shared/types";

export type AddTodoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (todo: TodoFormInput) => void;
};

export const AddTodoModal = ({
  isOpen = false,
  onClose,
  onSubmit,
}: AddTodoModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormInput>();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                type='text'
                id='text'
                placeholder='Name your todo...'
                {...register("text", { required: true })}
              />
              {errors.text && (
                <FormErrorMessage>There was an error.</FormErrorMessage>
              )}
              <FormHelperText>Keep it short and memorable.</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant='ghost' onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='blue' type='submit'>
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
