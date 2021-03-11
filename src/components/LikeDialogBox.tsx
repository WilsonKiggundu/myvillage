import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';

const people = ['Isaac Komezusenge', 'Jean Pierre Imanirumva', 'Gerard Niyiragira', 'Wilson Kiggundu', 'Regina', 'Isaac Komezusenge', 'Jean Pierre Imanirumva', 'Gerard Niyiragira', 'Isaac Komezusenge', 'Jean Pierre Imanirumva', 'Gerard Niyiragira'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

interface LProps {
    onClose?: () => any
}


export default function LikeDialogBox(props: LProps) {
    const classes = useStyles();

  return (
      <List>
        {people.map((person) => (
          <ListItem button key={person}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={person} />
          </ListItem>
        ))}
      </List>
  );
}
