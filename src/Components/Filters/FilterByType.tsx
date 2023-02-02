import { Select } from "@chakra-ui/react";
import useFilter from "./useFilter";

export default function () {
    const { val, filterOptions } = useFilter();

    return (
        <Select
            width="150px"
            display="inline-block"
            variant="outline"
            borderRadius="0px"
            border="2px black solid"
            name="type"
            onChange={(e) => val(e)}
        >
            {Array.isArray(filterOptions.type)
                ? filterOptions.type.map((type, index) => (
                      <option key={index} value={type}>
                          {type}
                      </option>
                  ))
                : ""}
        </Select>
    );
}
