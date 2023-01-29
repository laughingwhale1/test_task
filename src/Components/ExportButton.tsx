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
    Select,
    Stack,
    Text,
    useDisclosure,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCSVDownloader } from "react-papaparse";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { downloadData } from "../models/IUser";
import { fetchedTestData, userSlice } from "../store/reducers/UserSlice";

type Inputs = {
    ClientName: boolean;
    Amount: boolean;
};

let dataToDownload: downloadData[] = [];

export default function ExportButton() {
    const dispatch = useAppDispatch();
    const {downloadData} = useAppSelector(state => state.userReducer)
    const {
        register,
        handleSubmit,
        watch
    } = useForm<Inputs>();
    // const [dataToDownload, setDataToDownload] = useState<downloadData[]>([])

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        dispatch(userSlice.actions.usersFromCSVFile(fetchedTestData))
        if (!data.Amount || !data.ClientName) {
            if (!data.Amount && !data.ClientName) {
                dispatch(userSlice.actions.setDownloadData(users.map(item => (({Type, TransactionId, Status}) => ({Type, TransactionId, Status}))(item))))
                return;
            }

            if (data.Amount === false) {
                dispatch(userSlice.actions.setDownloadData(users.map(item => (({Type, TransactionId, Status, ClientName}) => ({Type, ClientName, TransactionId, Status}))(item))))
                return;
            } 
            
            if (data.ClientName === false) {
                dispatch(userSlice.actions.setDownloadData(users.map(item => (({Type, TransactionId, Status, Amount}) => ({Type, Amount, TransactionId, Status}))(item))))
                return;
            }
            
        } 
    };

    const val = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(
            userSlice.actions.filterData({
                name: e.target.name,
                filterBy: e.target.value,
            })
        );
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { CSVDownloader, Type } = useCSVDownloader();
    const { users, filterOptions } = useAppSelector(
        (state) => state.userReducer
    );
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
                                    <Select
                                        width="150px"
                                        display="inline-block"
                                        variant="outline"
                                        borderRadius="0px"
                                        border="2px black solid"
                                        name="Status"
                                        onChange={(e) => val(e)}
                                    >
                                        {Array.isArray(filterOptions.status)
                                            ? filterOptions.status.map(
                                                  (status, index) => (
                                                      <option
                                                          key={index}
                                                          value={status}
                                                      >
                                                          {status}
                                                      </option>
                                                  )
                                              )
                                            : ""}
                                    </Select>
                                </WrapItem>

                                <WrapItem>
                                    <Select
                                        width="150px"
                                        display="inline-block"
                                        variant="outline"
                                        borderRadius="0px"
                                        border="2px black solid"
                                        name="Type"
                                        onChange={(e) => val(e)}
                                    >
                                        {Array.isArray(filterOptions.type)
                                            ? filterOptions.type.map(
                                                  (type, index) => (
                                                      <option
                                                          key={index}
                                                          value={type}
                                                      >
                                                          {type}
                                                      </option>
                                                  )
                                              )
                                            : ""}
                                    </Select>
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
