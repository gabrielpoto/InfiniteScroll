export  interface TableProps {
    columns: readonly Column<Person>[];
    data: Person[];
    update: () => void;
}

export interface Column<D extends object = {}> {
    Header: string;
    accessor: keyof D;
    isSorted?: boolean;
    isSortedDesc?: boolean;
}


export interface Person {
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    progress: number;
    status: string;
}