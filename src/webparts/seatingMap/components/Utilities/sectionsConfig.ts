export interface SectionConfigProps {
    section: number;
    hasMeetingRoom: string | boolean;
    desksPerColumn: number[];
    bossRoom: boolean;
    highlightedColumns: { column: number; rows: number[] }[];
}

export const sectionsConfig: SectionConfigProps[] = [
    {
        section: 1,
        hasMeetingRoom: 'left',
        desksPerColumn: [3, 3, 5, 5],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 2,
        hasMeetingRoom: 'left',
        desksPerColumn: [3, 3, 5, 5],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 3,
        hasMeetingRoom: 'left',
        desksPerColumn: [3, 3, 5, 5],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 4,
        hasMeetingRoom: 'left',
        desksPerColumn: [3, 3, 5, 5],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 5,
        hasMeetingRoom: 'left',
        desksPerColumn: [3, 3, 5, 5],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 6,
        hasMeetingRoom: 'right',
        desksPerColumn: [4, 4, 2, 3],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 7,
        hasMeetingRoom: false,
        desksPerColumn: [4, 4, 4, 5],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 8,
        hasMeetingRoom: 'false',
        desksPerColumn: [2, 2],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 9,
        hasMeetingRoom: 'false',
        desksPerColumn: [0, 0],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 10,
        hasMeetingRoom: 'false',
        desksPerColumn: [0, 0],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 11,
        hasMeetingRoom: 'false',
        desksPerColumn: [0, 0],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 12,
        hasMeetingRoom: 'false',
        desksPerColumn: [1],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 13,
        hasMeetingRoom: 'bottom',
        desksPerColumn: [0, 0, 2],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 14,
        hasMeetingRoom: false,
        desksPerColumn: [0, 0],
        bossRoom: true,
        highlightedColumns: [],
    },
    // Floor 2
    {
        section: 15,
        hasMeetingRoom: false,
        desksPerColumn: [4, 5, 5, 5],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 16,
        hasMeetingRoom: false,
        desksPerColumn: [5, 5, 5, 5],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 17,
        hasMeetingRoom: false,
        desksPerColumn: [2, 5, 5, 5],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 18,
        hasMeetingRoom: false,
        desksPerColumn: [1, 5, 5, 5],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 19,
        hasMeetingRoom: false,
        desksPerColumn: [0, 5, 5, 4],
        bossRoom: false,
        highlightedColumns: [],
    },
    {
        section: 20,
        hasMeetingRoom: false,
        desksPerColumn: [0, 0],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 21,
        hasMeetingRoom: false,
        desksPerColumn: [0, 0],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 22,
        hasMeetingRoom: false,
        desksPerColumn: [0, 0],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 23,
        hasMeetingRoom: false,
        desksPerColumn: [0, 0],
        bossRoom: true,
        highlightedColumns: [],
    },
    {
        section: 24,
        hasMeetingRoom: false,
        desksPerColumn: [0, 0],
        bossRoom: true,
        highlightedColumns: [],
    },
];
