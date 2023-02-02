import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Input,
} from "@chakra-ui/react";
import { TableActionProps } from "../../../models/IUser";
import useEditing from "./useEditing";



export default function EditModal(props: TableActionProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { setRowIndex, handleSubmit, register, onSubmit } = useEditing();

    return (
        <>
            <Button
                background={"white"}
                color="black"
                borderRadius={"0px"}
                border="1px solid black"
                _hover={{
                    background: "#BEE3F8",
                    border: "1px white solid",
                }}
                value={props.index}
                onClick={(e) => {
                    onOpen();
                    setRowIndex(Number((e.target as HTMLButtonElement).value));
                }}
            >
                Edit
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit transaction status</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            style={{ textAlign: "center" }}
                        >
                            <Input {...register("userText")} />
                            <br />
                            <button
                                style={{
                                    width: "90px",
                                    background: "white",
                                    height: "40px",
                                    border: "2px solid black",
                                    margin: "10px 0px 0px 0px",
                                }}
                                type="submit"
                            >
                                Save
                            </button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
