import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Title1, Input, Button, TabList, Tab, Tag, Avatar, Link } from '@fluentui/react-components';
import { Search24Regular, Filter24Regular, Add24Regular } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
import styles from './requests.module.css';

// Enums based on backend model
export enum RequestStatus {
    New,
    Pending,
    Rejected,
    Reviewed,
    Scheduled,
    Unavailable,
    Approved,
    Completed
}

export enum LeadMinistry {
    ENV,
    FIN,
    FOR,
    HLTH,
    HOUS
}

// Interface based on backend model
interface Request {
    requestId: string;
    status: RequestStatus;
    requestTitle: string;
    requestedBy: string;
    deadline: string;
    leadMinistry: LeadMinistry;
    additionalMinistry: LeadMinistry;
    assignedTo: string;
}

const columnHelper = createColumnHelper<Request>();

const columns = [
    columnHelper.accessor('requestTitle', {
        header: () => 'Request Title',
        cell: info => info.getValue(),
        size: 400,
        minSize: 300,
        maxSize: 600,
    }),
    columnHelper.accessor('deadline', {
        header: () => 'Deadline',
        cell: info => new Date(info.getValue()).toLocaleDateString(),
        size: 120,
    }),
    columnHelper.accessor('status', {
        header: () => 'Status',
        cell: info => {
            const statusValue = info.getValue();
            const statusName = RequestStatus[statusValue] || 'Unknown';
            return <Tag shape="circular" appearance="outline">{statusName}</Tag>;
        },
        size: 80,
    }),
    columnHelper.accessor('requestedBy', {
        header: () => 'Requested By',
        cell: info => info.getValue(),
        size: 150,
    }),
    columnHelper.accessor('leadMinistry', {
        header: () => 'Lead Ministry',
        cell: info => {
            const ministryValue = info.getValue();
            const ministryName = LeadMinistry[ministryValue] || 'Unknown';
            return <Tag shape="circular" appearance="outline">{ministryName}</Tag>;
        },
        size: 100,
    }),
    columnHelper.accessor('additionalMinistry', {
        header: () => 'Additional Ministry',
        cell: info => {
            const ministryValue = info.getValue();
            const ministryName = LeadMinistry[ministryValue] || 'Unknown';
            return <Tag shape="circular" appearance="outline">{ministryName}</Tag>;
        },
        size: 100,
    }),
    columnHelper.accessor('assignedTo', {
        header: () => 'Assigned To',
        cell: info => {
            const name = info.getValue();
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Avatar name={name} size={24} />
                    <span>{name}</span>
                </div>
            );
        },
        size: 200,
    }),
];

const RequestsPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTab, setSelectedTab] = useState<string>("all");

    const fetchRequests = async (): Promise<Request[]> => {
        const response = await fetch('http://localhost:5020/api/requests');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    };

    const { data: requests = [], isLoading, error } = useQuery<Request[], Error>({
        queryKey: ['requests'],
        queryFn: fetchRequests,
    });

    const filteredRequests = useMemo(() => {
        if (!searchQuery.trim()) {
            return requests;
        }
        const query = searchQuery.toLowerCase();
        return requests.filter((request) => {
            const searchableFields = [
                request.requestTitle,
                request.requestedBy,
                request.assignedTo,
                RequestStatus[request.status],
                LeadMinistry[request.leadMinistry],
                LeadMinistry[request.additionalMinistry],
                new Date(request.deadline).toLocaleDateString()
            ];
            return searchableFields.some(field =>
                String(field).toLowerCase().includes(query)
            );
        });
    }, [requests, searchQuery]);

    const table = useReactTable({
        data: filteredRequests,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    const handleNewRequest = () => {
        navigate('/requests/new');
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading requests: {error.message}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Title1>Requests</Title1>
                <Button
                    icon={<Add24Regular />}
                    appearance="primary"
                    onClick={handleNewRequest}
                >
                    Create
                </Button>
            </div>

            <div className={styles.controls}>
                <TabList selectedValue={selectedTab} onTabSelect={(_, data) => setSelectedTab(data.value as string)}>
                    <Tab value="all">All</Tab>
                </TabList>
                <div className={styles.searchAndFilterContainer}>
                    <Input
                        contentBefore={<Search24Regular />}
                        placeholder="Search requests..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <Button
                        icon={<Filter24Regular />}
                        appearance="outline"
                        className={styles.filterButton}
                    >
                        Filter
                    </Button>
                </div>
            </div>

            <div>
                <table className={styles.requestTable}>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.paginationControls}>
                {table.getCanPreviousPage() ? (
                    <Link onClick={() => table.previousPage()} className={styles.paginationLink}>
                        {"< Prev"}
                    </Link>
                ) : (
                    <span className={styles.paginationLinkDisabled}>{"< Prev"}</span>
                )}

                {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map(page => (
                    <Button
                        key={page}
                        onClick={() => table.setPageIndex(page - 1)}
                        className={table.getState().pagination.pageIndex === page - 1 ? styles.activePage : styles.pageLink}
                    >
                        {page}
                    </Button>
                ))}

                {table.getCanNextPage() ? (
                    <Link onClick={() => table.nextPage()} className={styles.paginationLink}>
                        {"Next >"}
                    </Link>
                ) : (
                    <span className={styles.paginationLinkDisabled}>{"Next >"}</span>
                )}
            </div>
        </div>
    );
};

export default RequestsPage;
