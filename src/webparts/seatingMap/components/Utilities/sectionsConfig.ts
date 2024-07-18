export interface SectionConfigProps {
    section: number;
    hasMeetingRoom: string | boolean;
    desks: { column: number; rows: number[] }[];
    bossRoom: boolean;
    highlightedColumns: { column: number; rows: number[] }[];
}

export const sectionsConfig: SectionConfigProps[] = [
    {
        section: 1,
        hasMeetingRoom: 'left',
        desks: [
            { column: 1, rows: [3, 4, 5] },
            { column: 2, rows: [3, 4, 5] },
            { column: 3, rows: [1, 2, 3, 4, 5] },
            { column: 4, rows: [1, 2, 3, 4, 5] },
        ],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 2,
        hasMeetingRoom: 'left',
        desks: [
            { column: 1, rows: [3, 4, 5] },
            { column: 2, rows: [3, 4, 5] },
            { column: 3, rows: [1, 2, 3, 4, 5] },
            { column: 4, rows: [1, 2, 3, 4, 5] },
        ],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 3,
        hasMeetingRoom: 'left',
        desks: [
            { column: 1, rows: [3, 4, 5] },
            { column: 2, rows: [3, 4, 5] },
            { column: 3, rows: [1, 2, 3, 4, 5] },
            { column: 4, rows: [1, 2, 3, 4, 5] },
        ],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 4,
        hasMeetingRoom: 'left',
        desks: [
            { column: 1, rows: [3, 4, 5] },
            { column: 2, rows: [3, 4, 5] },
            { column: 3, rows: [1, 2, 3, 4, 5] },
            { column: 4, rows: [1, 2, 3, 4, 5] },
        ],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 5,
        hasMeetingRoom: 'left',
        desks: [
            { column: 1, rows: [3, 4, 5] },
            { column: 2, rows: [3, 4, 5] },
            { column: 3, rows: [1, 2, 3, 4, 5] },
            { column: 4, rows: [1, 2, 3, 4, 5] },
        ],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 6,
        hasMeetingRoom: 'right',
        desks: [
            { column: 1, rows: [1, 2, 3, 4 ] },
            { column: 2, rows: [1, 2, 3, 4] },
            { column: 3, rows: [3, 4] },
            { column: 4, rows: [3, 4] },
        ],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 7,
        hasMeetingRoom: false,
        desks: [
            { column: 1, rows: [1, 2, 3, 4 ] },
            { column: 2, rows: [1, 2, 3, 4] },
            { column: 3, rows: [1, 2, 3, 4 ] },
            { column: 4, rows: [1, 2, 3, 4] },
        ],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 8,
        hasMeetingRoom: 'false',
        desks: [
            { column: 1, rows: [2, 3] },
            { column: 2, rows: [2, 3] },
        ],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 9,
        hasMeetingRoom: 'false',
        desks: [],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 10,
        hasMeetingRoom: 'false',
        desks: [],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 11,
        hasMeetingRoom: 'false',
        desks: [],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 12,
        hasMeetingRoom: 'false',
        desks: [
            { column: 1, rows: [3] },
        ],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 13,
        hasMeetingRoom: 'bottom',
        desks: [
            { column: 3, rows: [1, 2] },
        ],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 14,
        hasMeetingRoom: false,
        desks: [],
        bossRoom: true,
        highlightedColumns: [],
    },
    // Floor 2
    {
        section: 15,
        hasMeetingRoom: false,
        desks: [
            { column: 1, rows: [ 2, 3, 4, 5] },
            { column: 2, rows: [1, 2, 3, 4, 5] },
            { column: 3, rows: [1, 2, 3, 4, 5] },
            { column: 4, rows: [1, 2, 3, 4, 5] },
        ],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 16,
        hasMeetingRoom: false,
        desks: [
            { column: 1, rows: [1, 2, 3, 4, 5] },
            { column: 2, rows: [1, 2, 3, 4, 5] },
            { column: 3, rows: [1, 2, 3, 4, 5] },
            { column: 4, rows: [1, 2, 3, 4, 5] },
        ],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 17,
        hasMeetingRoom: false,
        desks: [
            { column: 1, rows: [4, 5] },
            { column: 2, rows: [1, 2, 3, 4, 5] },
            { column: 3, rows: [1, 2, 3, 4, 5] },
            { column: 4, rows: [1, 2, 3, 4, 5] },
        ],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 18,
        hasMeetingRoom: false,
        desks: [
            { column: 1, rows: [1] },
            { column: 2, rows: [1, 2, 3, 4, 5] },
            { column: 3, rows: [1, 2, 3, 4, 5] },
            { column: 4, rows: [1, 2, 3, 4, 5] },
            { column: 5, rows: [1, 2, 3, 4, 5] }
        ],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 19,
        hasMeetingRoom: false,
        desks: [
            { column: 2, rows: [1, 2, 3, 4, 5] },
            { column: 3, rows: [1, 2, 3, 4, 5] },
            { column: 4, rows: [1, 2, 3, 4, 5] },
            { column: 5, rows: [2, 3, 4, 5] },
        ],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 20,
        hasMeetingRoom: false,
        desks: [],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 21,
        hasMeetingRoom: false,
        desks: [],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 22,
        hasMeetingRoom: false,
        desks: [],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 23,
        hasMeetingRoom: false,
        desks: [],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 24,
        hasMeetingRoom: false,
        desks: [],
        bossRoom: true,
        highlightedColumns: [],
    },
];
