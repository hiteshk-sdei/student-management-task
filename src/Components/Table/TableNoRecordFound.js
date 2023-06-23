import React from 'react';
import {TableRow, TableCell, CircularProgress} from '@mui/material';

const TableNoRecordFound = ({loading, colSpan}) => {
    return(
        <TableRow>
            <TableCell colSpan={colSpan} align='center'>
                {loading ? <CircularProgress size={22}/> : 'No record found'}
            </TableCell>
        </TableRow>
    )
}
export default TableNoRecordFound;