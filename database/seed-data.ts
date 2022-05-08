interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description:
                'Pendiente: Do commodo adipisicing dolore cillum nisi consectetur esse magna aliquip.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description:
                'En-progreso: Do commodo adipisicing dolore cillum nisi consectetur esse magna aliquip.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description:
                'Terminadas: Ea ad officia amet laboris Lorem id eu sunt.',
            status: 'finished',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'Ad sint veniam dolore anim.',
            status: 'pending',
            createdAt: Date.now() - 100000,
        },
    ],
};
