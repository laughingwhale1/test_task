import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Wrap,
    WrapItem,
    Box,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useAppSelector } from "../hooks/redux";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import Pagination from "./Pagination";

let PageSize: number = 5;

export default function Dashboard() {
    const { error, isLoading, users } = useAppSelector(
        (state) => state.userReducer
    );

    // ================================================================
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return users.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, users]);
    // ====================================================================

    return (
        <TableContainer>
            <Table colorScheme="gray" border="4px solid black" >
                <Thead background="#CBD5E0">
                    <Tr>
                        <Th
                            borderRight="2px solid black"
                            borderBottom={"2px solid black"}
                        >
                            Id
                        </Th>
                        <Th
                            borderRight="2px solid black"
                            borderBottom={"2px solid black"}
                        >
                            Status
                        </Th>
                        <Th
                            borderRight="2px solid black"
                            borderBottom={"2px solid black"}
                        >
                            Type
                        </Th>
                        <Th
                            borderRight="2px solid black"
                            borderBottom={"2px solid black"}
                        >
                            Client name
                        </Th>
                        <Th
                            width={"150px"}
                            borderRight="2px solid black"
                            borderBottom={"2px solid black"}
                        >
                            Amount
                        </Th>
                        <Th width={"220px"} borderBottom={"2px solid black"}>
                            Action
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {Array.isArray(currentTableData) ? (
                        currentTableData.map((user, index) => (
                            <Tr key={index} >
                                <Td
                                    borderRight="2px solid black"
                                    borderBottom={"2px solid black"}
                                >
                                    {user.TransactionId}
                                </Td>
                                <Td
                                    borderRight="2px solid black"
                                    borderBottom={"2px solid black"}
                                >
                                    {user.Status}
                                </Td>
                                <Td
                                    borderRight="2px solid black"
                                    borderBottom={"2px solid black"}
                                >
                                    {user.Type}
                                </Td>
                                <Td
                                    borderRight="2px solid black"
                                    borderBottom={"2px solid black"}
                                >
                                    {user.ClientName}
                                </Td>
                                <Td
                                    borderRight="2px solid black"
                                    borderBottom={"2px solid black"}
                                >
                                    {user.Amount}
                                </Td>
                                <Td borderBottom={"2px solid black"}>
                                    <Wrap spacing={4}>
                                        <WrapItem>
                                            <EditButton index={index} />
                                        </WrapItem>
                                        <WrapItem>
                                            <DeleteButton index={index} />
                                        </WrapItem>
                                    </Wrap>
                                </Td>
                            </Tr>
                        ))
                    ) : (
                        <h1>{error}</h1>
                    )}
                </Tbody>
            </Table>
            <Box as='div' padding='20px' textAlign={'center'}>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={users.length}
                    pageSize={PageSize}
                    onPageChange={(page: number) => setCurrentPage(page)}
                />
            </Box>
        </TableContainer>
    );
}
