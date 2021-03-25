import React from 'react';

import Grid from '../layout/Grid';

const style = {

  footer: {
    margin: '20px 0',
  },

  p: {
    fontSize: '14px',
    lineHeight: '1.5',
    margin: 0,
    color: '#607D8B',
    textAlign: 'center',
  },

  a: {
    color: '#00a1ef',
  },

};

export const Footer = () => (
    <Grid style={style.footer}>
      <Grid.Cell style={style.content}>
        <p style={style.p}>
          This is an auto-generated email sent from an unmonitored emailing list. You may not reply to it directly.
        </p>
        <p style={style.p}>
          <a style={style.a} href="https://myvillage.africa">My Village</a>
        </p>
      </Grid.Cell>
    </Grid>
)

