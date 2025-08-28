import React from "react";
import { Box, Image, Text, Anchor } from "../elements";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";

import "./internalTasksTable.css"

export default function InternalTasksTable({ thead, tbody }) {
    return (
        <Box className="mc-table-responsive">
            <Table className="mc-table" >
                <Thead className="custom-internal-head-color mc-table-head">
                    <Tr>
                        {thead.map((item, index) => (
                            <Th key={ index }>{ item }</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody className="mc-table-body">
                    {tbody.map((item, index) => (
                        <Tr key={ index }> 
                            <Td>{ item.id }</Td>
                            <Td><Text className={`mc-table-badge ${ item.request.variant }`}>{ item.request.text }</Text></Td>
                            <Td>{item.email}</Td>
                            <Td>
                                <Box className="mc-table-profile">
                                    <Image src={ item.assigned.src }/>
                                    <Text>{ item.assigned.name }</Text>
                                </Box>
                            </Td>
                            <Td><Text className={`mc-table-badge ${ item.status.variant }`}>{ item.status.text }</Text></Td>
                
                            <Td>
                                <Box className="mc-table-action">
                                    <Anchor href="/message" title="Chat" className="material-icons chat">{ item.action.chat }</Anchor>
                                    <Anchor href="/user-profile" title="View" className="material-icons view">{ item.action.view }</Anchor>
                                </Box>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    )
}