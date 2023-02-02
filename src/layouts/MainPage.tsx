import { Box, Grid, GridItem, Heading, Spinner, Wrap, WrapItem, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import Dashboard from "../Components/Dashboard/Dashboard";
import FilterByStatus from "../Components/Filters/FilterByStatus";
import FilterByType from "../Components/Filters/FilterByType";
import ExportModal from "../Components/Modals/ExportModal/ExportModal";
import ImportModal from "../Components/Modals/ImportModal/ImportModal";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { userSlice } from "../store/reducers/UserSlice";


export default function MainPage () {
    const dispatch = useAppDispatch();

    const { isLoading } = useAppSelector(
        (state) => state.userReducer
    );

    useEffect(() => {
        dispatch(userSlice.actions.usersFetching());
    }, []);

    return (
        <>
        <Box
            as="div"
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
                            {/* FILTER BY STATUS =========================== */}
                            <FilterByStatus />
                        </WrapItem>
                        <WrapItem>
                            {/* FILTER BY TYPE =========================== */}
                            <FilterByType />
                        </WrapItem>
                    </Wrap>
                </GridItem>
                <GridItem colSpan={2}>
                    <Wrap spacing={4} justify="right">
                        <WrapItem>
                            {/* Export button ================================================================================= */}
                            <ExportModal />
                        </WrapItem>
                        <WrapItem>
                            {/* Import button ================================================================================= */}
                            <ImportModal />
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
                        // DASHBOARD ==================================================
                        <Dashboard />
                    )}
                </GridItem>
            </Grid>
        </Box>
    </>
    )
}