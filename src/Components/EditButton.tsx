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
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../hooks/redux";
import { userSlice } from "../store/reducers/UserSlice";

type Inputs = {
    userText: string;
};

type props = {
    index: number;
};

export default function EditButton(props: props) {
    const dispatch = useAppDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [rowIndex, setRowIndex] = useState<number>(0);

    const { register, handleSubmit, watch } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        dispatch(
            userSlice.actions.editStatus({
                rowIndex: rowIndex,
                text: data.userText,
            })
        );
        onClose();
    };

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
// (e) => console.log((e.target as HTMLButtonElement).value)
