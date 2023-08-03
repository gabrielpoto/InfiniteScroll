"use client"

import React, { useState } from "react";
import styled from "styled-components";
import { useTable, useSortBy } from "react-table";

import InfiniteScroll from "react-infinite-scroll-component";
import Table from "./components/datatable"

import makeData from "./makeData";

import {Column, Person } from "./interface"


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;




function App() {
    const [items, setItems] = useState(makeData(40));

    const columns: readonly Column<Person>[] = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "firstName",
            },
            {
                Header: "Last Name",
                accessor: "lastName",
            },
            {
                Header: "Age",
                accessor: "age",
            },
            {
                Header: "Visits",
                accessor: "visits",
            },
            {
                Header: "Status",
                accessor: "status",
            },
            {
                Header: "Profile Progress",
                accessor: "progress",
            },
        ],
        []
    );

    const fetchMoreData = () => {
        setTimeout(() => {
            setItems(items.concat(makeData(1)));
        }, 1500);
    };

    const data: Person[] = React.useMemo(() => items, [items]);

    return (
        <Styles>
            <Table columns={columns} data={data} update={fetchMoreData} />
        </Styles>
    );
}

export default App;
