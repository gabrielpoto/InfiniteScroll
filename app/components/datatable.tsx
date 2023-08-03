import React from "react";
import {useSortBy, useTable} from "react-table";
import InfiniteScroll from "react-infinite-scroll-component";
import {TableProps } from "../interface"


const Table: React.FC<TableProps> = ({ columns, data, update }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { sortBy },
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    );

    React.useEffect(() => {
        console.log("sort");
    }, [sortBy]);

    return (
        <InfiniteScroll
            dataLength={rows.length}
            next={update}
            hasMore={true}
            loader={<h4>Loading more 2 items...</h4>}
        >
            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200 bg-white shadow overflow-hidden sm:rounded-lg">
                <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {column.render("Header")}
                                <span className="ml-1">
                    {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                  </span>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} className="bg-white">
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </InfiniteScroll>
    );
};

export default Table;