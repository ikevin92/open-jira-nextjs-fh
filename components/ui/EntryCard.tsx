import { DragEvent, FC, useContext } from 'react';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material';
import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
    const { startDragging, endDragging } = useContext(UIContext);

    const onDragStart = (event: DragEvent<Element>) => {
        event.dataTransfer.setData('text', entry._id);
        // todo: modificar el estado para indentificar que estoy haciendo drag
        startDragging();
    };

    const onDragEnd = () => {
        endDragging();
    };

    return (
        <Card
            sx={{
                marginBottom: 1,
            }}
            // eventos drag and drop
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>
                        {entry.description}
                    </Typography>
                </CardContent>

                <CardActions
                    sx={{
                        paddingRight: 2,
                        display: 'flex',
                        justifyContent: 'end',
                    }}
                >
                    <Typography variant='body2'>hace 30 minutos</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};
