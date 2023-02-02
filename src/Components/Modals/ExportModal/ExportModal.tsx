import {
    Box,
    Button,
    Checkbox,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { useCSVDownloader } from "react-papaparse";
import FilterByStatus from "../../Filters/FilterByStatus";
import FilterByType from "../../Filters/FilterByType";
import useExporting from "./useExporting";

export default function ExportModal() {

    const { downloadData, handleSubmit, onSubmit, register, watch, dataArrangement } = useExporting()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { CSVDownloader, Type } = useCSVDownloader();

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
                onClick={() => {
                    onOpen();
                    dataArrangement();
                }}
            >
                <Text fontSize="1.1rem">Export</Text>
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Export your .csv file</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody textAlign={"center"}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={5} direction="column">
                                <label>
                                    {" "}
                                    <Text as="b">Columns to include</Text>{" "}
                                </label>
                                <Checkbox
                                    colorScheme="teal"
                                    {...register("ClientName")}
                                >
                                    ClientName
                                </Checkbox>
                                <Checkbox
                                    colorScheme="teal"
                                    {...register("Amount")}
                                >
                                    Amount
                                </Checkbox>
                            </Stack>

                            <label>
                                {" "}
                                <Text as="b">Filter by:</Text>{" "}
                            </label>
                            <br />
                            <Wrap spacing={4} direction="row" justify="center">
                                <WrapItem>
                                    {/* FILTER STATUS ========================== */}
                                    <FilterByStatus />
                                </WrapItem>

                                <WrapItem>
                                    {/* FILTER TYPE =============================== */}
                                    <FilterByType />
                                </WrapItem>
                            </Wrap>

                            <br />

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
                                type="submit"
                                disabled={!(watch("Amount") || watch('ClientName') )}
                            >
                                <Text as="b">Submit</Text>
                            </Button>
                        </form>
                        <br />
                        <CSVDownloader
                            type={Type.Button}
                            filename={"filename"}
                            bom={true}
                            config={{
                                delimiter: ";",
                            }}
                            data={downloadData}
                        >
                            <Box
                                onClick={onClose}
                                width="100px"
                                height={"50px"}
                                background="white"
                                paddingTop="10px"
                                border="2px black solid"
                                _hover={{
                                    background: "#FC8181",
                                    border: "1px white solid",
                                    transition: "0.2s",
                                }}
                            >
                                <Text as="b">Download</Text>
                            </Box>
                        </CSVDownloader>
                        
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
