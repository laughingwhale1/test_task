import { Td, Tr, Wrap, WrapItem } from "@chakra-ui/react";
import { TableContentsProps } from "../../../models/IUser";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import EditModal from "../../Modals/EditModal/EditModal";

export default function TableContents(props: TableContentsProps) {
    
    return (
        <>
            {Array.isArray(props.data) ? (
                props.data.map((user, index) => (
                    <Tr key={index}>
                        <Td
                        >
                            {user.TransactionId}
                        </Td>
                        <Td
                        >
                            {user.Status}
                        </Td>
                        <Td
                        >
                            {user.Type}
                        </Td>
                        <Td
                        >
                            {user.ClientName}
                        </Td>
                        <Td
                        >
                            {user.Amount}
                        </Td>
                        <Td >
                            <Wrap spacing={4}>
                                <WrapItem>
                                    <EditModal index={index} />
                                </WrapItem>
                                <WrapItem>
                                    <DeleteModal index={index} />
                                </WrapItem>
                            </Wrap>
                        </Td>
                    </Tr>
                ))
            ) : (
                <h1>{props.error}</h1>
            )}
        </>
    );
}
