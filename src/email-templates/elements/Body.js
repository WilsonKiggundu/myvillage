import React from 'react';

import Grid from '../layout/Grid';

const style = {

  content: {
    backgroundColor: 'white',
    padding: '20px',
  },

};

export const Body = ({ children }) => {
  return (
    <Grid>
      <Grid.Cell style={style.content}>
        {children}
      </Grid.Cell>
    </Grid>
  );
}

