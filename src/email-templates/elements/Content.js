import React from 'react';
import format from 'date-fns/format';

import Grid from '../layout/Grid';
import Img from './Img';

const style = {
  container: {
    color: '#333',
  },
}

export const Content = ({ content }) => {
  return (
    <Grid style={style.container}>
      <Grid.Cell>
        <Grid.Row>
            {content}
        </Grid.Row>
      </Grid.Cell>
    </Grid>
  )
}
