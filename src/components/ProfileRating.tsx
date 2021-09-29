import React from 'react';
import Rating, {RatingProps} from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

interface IProps {
    rating: number | null
    readonly?: boolean
    size?: "small" | "medium" | "large"
}

export default function ProfileRating(props: IProps) {
    const [value, setValue] = React.useState<number | null>(props.rating);

    return (
        <Box component="fieldset" mb={1} mt={1} borderColor="transparent">
            <Rating
                size={props.size}
                readOnly={props.readonly}
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </Box>
    );
}
