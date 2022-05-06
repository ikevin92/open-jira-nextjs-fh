/* eslint-disable react-hooks/exhaustive-deps */
import { DragEvent, FC, useContext, useMemo } from 'react';
import { List, Paper } from '@mui/material';
import { EntryStatus } from '../../interfaces';
import { EntryCard } from './';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UIContext);

    // evitamos los renderizados innecesarios
    const entriesByStatus = useMemo(
        () => entries.filter((entry) => entry.status === status),
        [entries],
    );

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text');

        const entry = entries.find((e) => e._id === id)!;
        entry.status = status;
        updateEntry(entry);
        endDragging();
    };

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <div
            className={isDragging ? styles.dragging : ''}
            onDrop={onDropEntry}
            onDragOver={allowDrop}
        >
            <Paper
                sx={{
                    height: 'calc(100vh - 180px)',
                    overflowY: 'scroll',
                    backgroundColor: 'transparent',
                    padding: '3px 5px',
                    // '&::-webkit-scrollbar': { display: 'none' },
                }}
            >
                <List
                    sx={{
                        opacity: isDragging ? 0.2 : 1,
                        transition: 'all .3s',
                    }}
                >
                    {entriesByStatus.map((entry) => (
                        <EntryCard key={entry._id} entry={entry} />
                    ))}
                </List>
            </Paper>
        </div>
    );
};
