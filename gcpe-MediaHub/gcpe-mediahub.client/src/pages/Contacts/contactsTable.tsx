import {
    FolderRegular,
    EditRegular,
    OpenRegular,
    DocumentRegular,
    PeopleRegular,
    DocumentPdfRegular,
    VideoRegular,
} from "@fluentui/react-icons";

import {
    TableBody,
    TableCell,
    TableRow,
    Table,
    TableHeader,
    TableHeaderCell,
    TableCellLayout,
    PresenceBadgeStatus,
    Avatar,
    Tag,
    makeStyles,
    TagGroup,
} from "@fluentui/react-components";

import MediaContact from "../../models/mediaContact";
import React from "react";

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

interface TableProps {

    items: MediaContact[],
}

const ContactsTable = ({ items }) => {
    const styles = useStyles();
 //   console.log(items);
    const dateOptions: Intl.DateTimeFormatOptions = {
        day: "numeric", month: "numeric", year: "numeric",
        hour: "2-digit", minute: "2-digit"
    };
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
                {items.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            <TableCellLayout>
                                {item.firstName} {item.lastName}
                            </TableCellLayout>
                        </TableCell>
                        <TableCell>
                            {item.outlets.map((outlet, index) => (
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