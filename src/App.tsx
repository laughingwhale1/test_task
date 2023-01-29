import React, { useEffect } from "react";
import Dashboard from "./Components/Dashboard";
import {
    Box,
    Heading,
    Grid,
    GridItem,
    Text,
    Select,
    WrapItem,
    Wrap,
    Spinner,
    Button,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { userSlice } from "./store/reducers/UserSlice";
import ExportButton from "./Components/ExportButton";
import ImportButton from "./Components/ImportButton";

let PageSize = 5;

function App() {
    const dispatch = useAppDispatch();
    const { error, isLoading, users, filterOptions } = useAppSelector(
        (state) => state.userReducer
    );

    const val = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(userSlice.actions.filterData({name: e.target.name, filterBy: e.target.value}))
    };

    useEffect(() => {
        dispatch(userSlice.actions.usersFetching());
    }, []);
    return (
        <>
            <Box
                as="div"
                // padding="20px"
                margin="50px"
                height="800px"
            >
                <Box borderWidth={"4px"} borderColor="black" as="div">
                    <Heading
                        as="h2"
                        margin="5px"
                        size="xl"
                        textAlign="center"
                        letterSpacing={"0.5rem"}
                    >
                        MONITOR YOUR EXPENSES
                    </Heading>
                </Box>
                <Grid
                    h="200px"
                    templateRows="repeat(2, 1fr)"
                    templateColumns="repeat(5, 1fr)"
                    gap={4}
                    margin="20px"
                >
                    <GridItem rowSpan={2} colSpan={1}>
                        {" "}
                        <Box
                            width="100%"
                            height="300px"
                            border={"4px solid black"}
                        >
                            <Box
                                as="div"
                                background="#90CDF4"
                                width="100%"
                                height="40px"
                                borderBottom={"4px solid black"}
                                textAlign={"center"}
                            >
                                <Text as="b" fontSize="xl">
                                    Transactions
                                </Text>
                            </Box>
                        </Box>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Wrap spacing={4}>
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
                                                  <option key={index} value={status}>
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
                                                  <option key={index} value={type}>
                                                      {type}
                                                  </option>
                                              )
                                          )
                                        : ""}
                                </Select>
                            </WrapItem>
                        </Wrap>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Wrap spacing={4} justify="right">
                            <WrapItem>
                                {/* Export button ================================================================================= */}
                                <ExportButton />
                            </WrapItem>
                            <WrapItem>
                                {/* Import button ================================================================================= */}
                                <ImportButton />
                            </WrapItem>
                        </Wrap>
                    </GridItem>
                    <GridItem colSpan={4}>
                        {isLoading ? (
                            <Box as="div" textAlign={"center"} marginTop="10%">
                                <Spinner
                                    thickness="4px"
                                    speed="0.65s"
                                    emptyColor="gray.200"
                                    color="blue.500"
                                    size="xl"
                                />
                            </Box>
                        ) : (
                            <Dashboard />
                        )}
                    </GridItem>
                </Grid>
            </Box>
        </>
    );
}

export default App;
