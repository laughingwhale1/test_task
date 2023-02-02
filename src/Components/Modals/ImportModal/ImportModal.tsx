import React from "react";
import styles from "./styles";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useCSVReader } from "react-papaparse";
import useImporting from "./useImporting";

export default function ImportModal () {
    const { CSVReader } = useCSVReader();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { handleFileDataUpload, handleFileSaving } = useImporting();

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
