import { Select } from "@chakra-ui/react";
import useFilter from "./useFilter";

export default function FilterByStatus() {
    const { filterOptions, val } = useFilter();
    
    return (
        <Select
            width="150px"
            display="inline-block"
            variant="outline"
            borderRadius="0px"
            border="2px black solid"
            name="status"
            onChange={(e) => val(e)}
        >
            {Array.isArray(filterOptions.status)
                ? filterOptions.status.map((status, index) => (
                      <option key={index} value={status}>
                          {status}
                      </option>
                  ))
                : ""}
        </Select>
    );
}
