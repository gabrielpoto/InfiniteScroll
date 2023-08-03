import { faker } from '@faker-js/faker';

const range = (len: number): number[] => {
    const arr: number[] = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

interface Person {
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    progress: number;
    status: "relationship" | "complicated" | "single";
}

const newPerson = (): Person => {
    const statusChance = Math.random();
    return {
        firstName: faker.name.firstName(), // Utiliser faker pour générer un prénom aléatoire
        lastName: faker.name.lastName(), // Utiliser faker pour générer un nom de famille aléatoire
        age: Math.floor(Math.random() * 30),
        visits: Math.floor(Math.random() * 100),
        progress: Math.floor(Math.random() * 100),
        status:
            statusChance > 0.66
                ? "relationship"
                : statusChance > 0.33
                    ? "complicated"
                    : "single",
    };
};

export default function makeData(...lens: number[]): Person[] {
    const makeDataLevel = (depth: number = 0): Person[] => {
        const len = lens[depth];
        return range(len).map((d) => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            };
        });
    };

    return makeDataLevel();
}
