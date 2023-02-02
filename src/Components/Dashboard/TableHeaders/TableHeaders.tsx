import { Td } from "@chakra-ui/react";
import { tableHeaders } from "./helper";

export default function TableHeaders() {
    return (
        <>
            {Array.isArray(tableHeaders) ? (
                tableHeaders.map((item, index) => (
                    <Td
                        borderRight="2px solid black"
                        borderBottom="2px solid black"
                        key={index}
                        width={`${
                            index === 2 ? "210px" : index === 5 ? "230px" : ""
                        }`}
                    >
                        {item}
                    </Td>
                ))
            ) : (
                <h1>No table headers to show</h1>
            )}
        </>
    );
}
