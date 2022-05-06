import { ChangeEvent, useState, useContext } from 'react';
import { Box, TextField, Button } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
    const { addNewEntry } = useContext(EntriesContext);
    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

    const [inputValue, setInputValue] = useState<string>('');
    const [touched, setTouched] = useState<boolean>(false);

    const onTextFieldChanges = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setInputValue(e.target.value);
    };

    const onSave = () => {
        if (inputValue.length === 0) return;

        addNewEntry(inputValue);

        // limpiar el input
        setIsAddingEntry(false);
        setTouched(false);
        setInputValue('');
    };

    return (
        <Box
            sx={{
                marginBottom: 2,
                paddingX: 2,
            }}>
            {isAddingEntry ? (
                <>
                    <TextField
                        fullWidth
                        sx={{
                            marginTop: 2,
                            marginBottom: 1,
                        }}
                        placeholder='Nueva entrada'
                        autoFocus
                        multiline
                        error={inputValue.length <= 0 && touched}
                        value={inputValue}
                        onChange={onTextFieldChanges}
                        label='Nueva entrada'
                        helperText={
                            inputValue.length <= 0 &&
                            touched &&
                            'Ingrese un valor'
                        }
                        onBlur={() => setTouched(true)}
                    />
                    <Box display='flex' justifyContent='space-between'>
                        <Button
                            variant='text'
                            onClick={() => setIsAddingEntry(false)}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={onSave}
                            variant='outlined'
                            color='secondary'
                            endIcon={<SaveOutlinedIcon />}>
                            Guardar
                        </Button>
                    </Box>
                </>
            ) : (
                <Button
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    fullWidth
                    onClick={() => setIsAddingEntry(true)}
                    variant='outlined'>
                    Agregar Tarea
                </Button>
            )}
        </Box>
    );
};
