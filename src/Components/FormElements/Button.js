import React, {forwardRef} from 'react';
import {
    Button as ButtonElement,
} from '@mui/material';

const Button = forwardRef((props, ref) => {
    const {label, loading} = props
    return(
        <ButtonElement
            disabled={loading ? true : undefined}
            ref={ref}
            {...props}
        >
            {label}
        </ButtonElement>
    )
})
export default Button;