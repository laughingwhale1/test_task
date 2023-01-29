import React, { CSSProperties } from "react";
const styles = {
    csvReader: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 10,
    } as CSSProperties,
    browseFile: {
        width: "20%",
    } as CSSProperties,
    acceptedFile: {
        border: "1px solid #ccc",
        height: 45,
        lineHeight: 2.5,
        paddingLeft: 10,
        width: "80%",
    } as CSSProperties,
    remove: {
        borderRadius: 0,
        padding: "0 20px",
    } as CSSProperties,
    progressBarBackgroundColor: {
        backgroundColor: "red",
    } as CSSProperties,
};
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useCSVReader, usePapaParse } from "react-papaparse";
import { useAppDispatch } from "../hooks/redux";
import { userSlice } from "../store/reducers/UserSlice";
import { IUser } from "../models/IUser";
export let uploadedData: IUser[];
export default function ImportButton() {
    const { readString } = usePapaParse();
    const { CSVReader } = useCSVReader();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useAppDispatch();
    const handleFileSaving = (data: any) => {
        uploadedData = data.data;
    };

    const handleFileDataUpload = () => {
        dispatch(userSlice.actions.usersFromCSVFile(uploadedData));
    }

    return (
        <>
            <Button
                width="150px"
                background={"white"}
                color="black"
                borderRadius={"0px"}
                border="2px solid black"
                _hover={{
                    background: "#C6F6D5",
                    border: "1px white solid",
                }}
                onClick={onOpen}
            >
                <Text fontSize="1.1rem">Import</Text>
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Import your .csv file</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <CSVReader
                            config={{
                                header: true,
                            }}
                            onUploadAccepted={(results: any) => {
                                handleFileSaving(results);
                            }}
                        >
                            {({
                                getRootProps,
                                acceptedFile,
                                ProgressBar,
                                getRemoveFileProps,
                            }: any) => (
                                <>
                                    <div style={styles.csvReader}>
                                        <button
                                            type="button"
                                            {...getRootProps()}
                                            style={styles.browseFile}
                                        >
                                            Browse file
                                        </button>
                                        <div style={styles.acceptedFile}>
                                            {acceptedFile && acceptedFile.name}
                                        </div>
                                        <button
                                            {...getRemoveFileProps()}
                                            style={styles.remove}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <ProgressBar
                                        style={
                                            styles.progressBarBackgroundColor
                                        }
                                    />
                                </>
                            )}
                        </CSVReader>
                        <Button
                            onClick={() => { onClose(); handleFileDataUpload()}}
                            variant="ghost"
                            id="btn"
                        >
                            Submit
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

{
    /* <form onSubmit={handleSubmit(onSubmit)}>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent> 
                        <ModalHeader>Import your .csv file</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <input
                                {...register('csvfile')}
                                type="file"
                                name="csvfile"
                            ></input>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button onClick={onClose} type='submit' variant="ghost">Submit</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </form> */
}
