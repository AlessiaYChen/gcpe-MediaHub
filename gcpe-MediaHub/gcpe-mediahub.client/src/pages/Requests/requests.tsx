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
import { PressGalleryBadge } from '../../components/PressGalleryBadge';
import { Search24Regular, Filter24Regular, Add24Regular } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
import { MediaRequest } from '../../api/apiClient';
import { requestService } from '../../services/requestService';
import styles from './requests.module.css';

const columnHelper = createColumnHelper<MediaRequest>();

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
            const status = info.getValue();
            return <Tag shape="circular" appearance="outline">{status}</Tag>;
        },
        size: 80,
    }),
    columnHelper.accessor('requestedBy', {
        header: () => 'Requested By',
        cell: info => (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>{info.getValue()}</span>
                {info.row.original.isPressGallery && <PressGalleryBadge />}
            </div>
        ),
        size: 150,
    }),
    columnHelper.accessor('leadMinistry', {
        header: () => 'Lead Ministry',
        cell: info => {
            const ministry = info.getValue();
            return <Tag shape="circular" appearance="outline">{ministry}</Tag>;
        },
        size: 100,
    }),
    columnHelper.accessor('additionalMinistry', {
        header: () => 'Additional Ministry',
        cell: info => {
            const ministry = info.getValue();
            return ministry ? <Tag shape="circular" appearance="outline">{ministry}</Tag> : null;
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

    const { data: requests = [], isLoading, error } = useQuery<MediaRequest[], Error>({
        queryKey: ['requests'],
        queryFn: requestService.getRequests,
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
                request.status,
                request.leadMinistry,
                request.additionalMinistry,
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
                    <Link
                        key={page}
                        onClick={() => table.setPageIndex(page - 1)}
                        className={table.getState().pagination.pageIndex === page - 1 ? styles.activePage : styles.pageLink}
                        style={{ padding: "0 4px", cursor: "pointer" }}
                    >
                        {page}
                    </Link>
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
