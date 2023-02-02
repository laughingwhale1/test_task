import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import { TableActionProps } from "../../../models/IUser";
import useDeleting from "./useDeleting";



export default function DeleteModal (props: TableActionProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { handleDeletion, setRowIndex } = useDeleting()

    return (
        <>
            <Button
                background={"white"}
                color="black"
                borderRadius={"0px"}
                border="1px solid black"
                _hover={{
                    background: "#F56565",
                    border: "1px white solid",
                }}
                value={props.index}
                onClick={(e) => {
                    onOpen();
                    setRowIndex(Number((e.target as HTMLButtonElement).value));
                }}
            >
                Delete
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm transaction deletion</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        
                    </ModalBody>
                    <ModalFooter textAlign={'center'}>
                            <Wrap >
                                <WrapItem>
                                    <Button
                                        background={"white"}
                                        color="black"
                                        borderRadius={"0px"}
                                        border="1px solid black"
                                        _hover={{
                                            background: "#9AE6B4",
                                            border: "1px white solid",
                                        }}
                                        onClick={() => {handleDeletion(); onClose()}}
                                    >
                                        Confirm
                                    </Button>
                                </WrapItem>
                                <WrapItem>
                                    <Button
                                        background={"white"}
                                        color="black"
                                        borderRadius={"0px"}
                                        border="1px solid black"
                                        _hover={{
                                            background: "#F56565",
                                            border: "1px white solid",
                                        }}
                                        onClick={onClose}
                                    >
                                        Discard
                                    </Button>
                                </WrapItem>
                            </Wrap>
                        </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
