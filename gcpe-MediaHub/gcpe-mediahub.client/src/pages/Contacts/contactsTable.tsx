
import {
    makeStyles,
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

import MediaContact from "../../models/mediaContact";
import MediaOutlet from "../../models/mediaOutlet";

const useStyles = makeStyles({
    table: {
        midWidth: "510px",
        tableLayout: "auto",

    },
    tableHeader: {
        fontWeight: "font-weight-bold",
    }
});

const columns = [
    { columnKey: "name", label: "Name" },

    { columnKey: "mediaOutlets", label: "Outlets" },
    { columnKey: "email", label: "Email" },
    { columnKey: "phone", label: "Phone" },
    { columnKey: "location", label: "Location" },
    { columnKey: "mediaRequests", label: "Requests" },
    { columnKey: "lastActive", label: "Last Active" },
];


interface ContactsTableProps {
    items: MediaContact[];
}

const ContactsTable = ({ items }: ContactsTableProps) => {
    const styles = useStyles();
 //   console.log(items);
    return (
        <Table arial-label="Default table" className={styles.table}>

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
                {items.map((item: MediaContact) => (
                    <TableRow key={item.id.toString()}>
                        <TableCell>
                            <TableCellLayout>
                                {item.firstName} {item.lastName}
                            </TableCellLayout>
                        </TableCell>
                        <TableCell>
                            {item.mediaOutlets.map((outlet: MediaOutlet, index: number) => (
                                <TableCellLayout key={index}>
                                    <TagGroup>
                                        <Tag shape="circular" appearance="outline"> {outlet.name} </Tag>
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
                                {item.mediaRequests.length > 0 &&
                                    <TagGroup>
                                        <Tag shape="circular" appearance="outline">{item.mediaRequests.length} active</Tag>
                                    </TagGroup>
                                }
                            </TableCellLayout>
                        </TableCell>
                        <TableCell>
                            <TableCellLayout>
                                {item.lastActive.toLocaleDateString(undefined, {
                                    day: "numeric",
                                    month: "numeric",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })}
                            </TableCellLayout>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default ContactsTable;