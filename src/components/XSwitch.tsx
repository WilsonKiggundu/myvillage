import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default (props: any) => {
    const [state, setState] = useState({checked: false});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    return (
        <FormGroup row>
            <FormControlLabel
                control={<Switch checked={state.checked} onChange={handleChange} name="checked"/>}
                labelPlacement={"start"}
                style={{marginLeft: 0}}
                label={`${state.checked ? "Hide " : "Show"} filter`}
            />
        </FormGroup>
    );
}
