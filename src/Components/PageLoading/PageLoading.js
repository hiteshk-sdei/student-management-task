import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import './PageLoading.scss';

const PageLoading = ({loading}) => {
    return(
        loading &&
        <div className='page-loading'>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress size={35}/>
            </Box>
        </div>
    )
}
export default PageLoading;