
import {
    TableBody,
    TableCell,
    TableRow,
    Table,
    TableHeader,
    TableHeaderCell,
    TableCellLayout,
    Tag,
    TagGroup,
} from "@fluentui/react-components";


const columns = [
    { columnKey: "name", label: "Name" },

    { columnKey: "mediaOutlets", label: "Outlets" },
    { columnKey: "email", label: "Email" },
    { columnKey: "phone", label: "Phone" },
    { columnKey: "location", label: "Location" },
    { columnKey: "mediaRequests", label: "Requests" },
    { columnKey: "lastActive", label: "Last Active" },
];


const ContactsTable = ({ items }: { items: Array<{ id: string; firstName: string; lastName: string; outlets: string[]; email: string; phone: string; location: string; requests: any[]; lastActive: string }> }) => {
    console.log(items);
    return (
        <Table arial-label="Default table" style={{ minWidth: "510px" }}>

            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHeaderCell key={column.columnKey} style={{ fontWeight: "900" }}>
                            {column.label}
                        </TableHeaderCell>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item: { id: string; firstName: string; lastName: string; outlets: string[]; email: string; phone: string; location: string; requests: any[]; lastActive: string }) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <TableCellLayout>
                                {item.firstName} {item.lastName}
                            </TableCellLayout>
                        </TableCell>
                        <TableCell>
                            {item.outlets.map((outlet: string, index: number) => (
                                <TableCellLayout key={index}>
                                    <TagGroup>
                                        <Tag shape="circular" appearance="outline"> {outlet} </Tag>
                                    </TagGroup>
                                </TableCellLayout>
                            ))}
                        </TableCell>
                        <TableCell>
                            <TableCellLayout>
                                {item.email}
                            </TableCellLayout>
                        </TableCell>
                        <TableCell>
                            <TableCellLayout>
                                {item.phone}
                            </TableCellLayout>
                        </TableCell>
                        <TableCell>
                            <TableCellLayout>
                                <TagGroup>
                                    <Tag shape="circular" appearance="outline">{item.location}</Tag>
                                </TagGroup>
                            </TableCellLayout>
                        </TableCell>
                        <TableCell>
                            <TableCellLayout>
                                {item.requests.length > 0 &&
                                    <TagGroup>
                                        <Tag shape="circular" appearance="outline">{item.requests.length} active</Tag> 
                                    </TagGroup>
                                }
                            </TableCellLayout>
                        </TableCell>
                        <TableCell>
                            <TableCellLayout>
                                {item.lastActive}
                            </TableCellLayout>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default ContactsTable;