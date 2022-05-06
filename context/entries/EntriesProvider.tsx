import { FC, useReducer } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { v4 as uuidv4 } from 'uuid';

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description:
                'Pendiente: Do commodo adipisicing dolore cillum nisi consectetur esse magna aliquip.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description:
                'En-progreso: Do commodo adipisicing dolore cillum nisi consectetur esse magna aliquip.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            _id: uuidv4(),
            description:
                'Terminadas: Ea ad officia amet laboris Lorem id eu sunt.',
            status: 'finished',
            createdAt: Date.now() - 1000000,
        },
        {
            _id: uuidv4(),
            description: 'Ad sint veniam dolore anim.',
            status: 'pending',
            createdAt: Date.now() - 100000,
        },
    ],
};

interface EntriesProviderProps {
    children: JSX.Element | JSX.Element[];
}

export const EntriesProvider: FC<EntriesProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            createdAt: Date.now(),
            description,
            status: 'pending',
        };

        dispatch({ type: '[Entry] - Add-Entry', payload: newEntry });
    };

    const updateEntry = (entry: Entry) => {
        dispatch({ type: '[Entry] - Entry-Updated', payload: entry });
    };

    return (
        <EntriesContext.Provider
            value={{
                ...state,
                //Methods
                addNewEntry,
                updateEntry,
            }}
        >
            {children}
        </EntriesContext.Provider>
    );
};
