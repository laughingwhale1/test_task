import {
    Button,
    Input,
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
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../hooks/redux";
import { userSlice } from "../store/reducers/UserSlice";

type props = {
    index: number;
};

type Inputs = {
    userText: string;
};

export default function DeleteButton(props: props) {
    const dispatch = useAppDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [rowIndex, setRowIndex] = useState<number>(0);
    const { register, handleSubmit, watch } = useForm<Inputs>();

    const handleDeletion = () => {
        dispatch(
            userSlice.actions.deleteTransaction({
                rowIndex: rowIndex
            })
        );
        onClose()
    };

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
                                        onClick={() => handleDeletion()}
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
