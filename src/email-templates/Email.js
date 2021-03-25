import React from 'react';

import Grid from './layout/Grid';
import {Header} from './elements/Header';
import Title from './elements/Title';
import {Body} from './elements/Body';
import {Content} from './elements/Content';
import {Footer} from './elements/Footer';

const style = {

  container: {
    backgroundColor: '#efefef',
    padding: '20px 0',
    fontFamily: 'sans-serif',
    textAlign: "center"
  },

  main: {
    maxWidth: '500px',
    width: '100%',
  },

};

export const Email = ({ data }) => {
  return (
    <div style={style.container}>
      <Grid style={style.main}>
        <Header />
        <Body>
          <Content content={data.content} />
        </Body>
        <Footer />
      </Grid>
    </div>
  );
}

