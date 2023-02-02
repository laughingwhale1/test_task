import {
    Table,
    Thead,
    Tbody,
    Tr,
    TableContainer,
    Box,
} from "@chakra-ui/react";
import Pagination from "./Pagination/Pagination";
import { pageSize } from "./TableContents/helper";
import TableContents from "./TableContents/TableContents";
import useContents from "./TableContents/useContents";
import TableHeaders from "./TableHeaders/TableHeaders";


export default function Dashboard() {
    const {currentPage, setCurrentPage, users, currentTableData, error} = useContents()
    
    return (
        <TableContainer>
            <Table colorScheme="gray" variant='striped' border="4px solid black">
                <Thead background="#CBD5E0">
                    <Tr>
                        <TableHeaders />
                    </Tr>
                </Thead>
                <Tbody>
                    <TableContents data={currentTableData} error={error} />
                </Tbody>
            </Table>
            <Box as="div" padding="20px" textAlign={"center"}>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={users.length}
                    pageSize={pageSize}
                    onPageChange={(page: number) => setCurrentPage(page)}
                />
            </Box>
        </TableContainer>
    );
}
