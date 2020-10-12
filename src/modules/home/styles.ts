import {createStyles, makeStyles, Theme} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: theme.mixins.toolbar,

        wrapper: {
            width: '100%',
            minHeight: 100,
            padding: 0,
            margin: 0
        },
        navyBg: {
            backgroundColor: '#1B314E',
            color: '#FFFFFF'
        }
    }))