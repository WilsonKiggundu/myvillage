import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

interface IProps {
    rating: number | null
}

export default function ProfileRating(props: IProps) {
    const [value, setValue] = React.useState<number | null>(props.rating);

    return (
            <Box component="fieldset" mb={1} mt={1} borderColor="transparent">
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
            </Box>
    );
}
