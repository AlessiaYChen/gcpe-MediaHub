import React, { useState } from "react";
import { Input } from "@fluentui/react-components";
import { useQuery } from "@tanstack/react-query";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { MediaRequest } from "../../api/apiClient";
import { requestService } from "../../services/requestService";
import styles from "./requestsCardView.module.css";

const RequestsCardView: React.FC = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: requests = [], isLoading, error } = useQuery<MediaRequest[], Error>({
    queryKey: ["requests"],
    queryFn: requestService.getRequests,
  });

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "requestTitle",
        header: "Request Title",
      },
      {
        accessorKey: "requestedBy",
        header: "Requested By",
      },
      {
        accessorKey: "deadline",
        header: "Deadline",
        cell: (info: any) => new Date(info.getValue()).toLocaleDateString(),
      },
      {
        accessorKey: "leadMinistry",
        header: "Lead Ministry",
      },
      {
        accessorKey: "additionalMinistry",
        header: "Additional Ministry",
      },
    ],
    []
  );

  const filteredRequests = React.useMemo(() => {
    if (!globalFilter) return requests;
    const filterLower = globalFilter.toLowerCase();
    return requests.filter(request =>
      request.requestTitle.toLowerCase().includes(filterLower) ||
      request.requestedBy.toLowerCase().includes(filterLower) ||
      request.leadMinistry.toLowerCase().includes(filterLower) ||
      (request.additionalMinistry && request.additionalMinistry.toLowerCase().includes(filterLower))
    );
  }, [requests, globalFilter]);

  const table = useReactTable({
    data: filteredRequests,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading requests: {error.message}</div>;

  return (
    <div className={styles.layoutWrapper}>
      <h1 className={styles.title}>Media Request</h1>
      <div className={styles.controls}>
        <Input
          placeholder="Search requests"
          className={styles.searchInput}
          value={globalFilter}
          onChange={(_, data) => setGlobalFilter(data.value || "")}
        />
      </div>
      <div className={styles.container}>
        {table.getRowModel().rows.map((row) => (
          <div key={row.id} className={styles.card}>
            <h3>{row.getValue("requestTitle")}</h3>
            <p><strong>Requested By:</strong> {row.getValue("requestedBy")}</p>
            <p><strong>Deadline:</strong> {row.getValue("deadline")}</p>
            <p><strong>Lead Ministry:</strong> {row.getValue("leadMinistry")}</p>
            <p><strong>Additional Ministry:</strong> {row.getValue("additionalMinistry") || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsCardView;