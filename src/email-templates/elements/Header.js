import React from 'react';

import Grid from '../layout/Grid';
import Img from './Img';

const logoSrc = 'https://s3-eu-west-1.amazonaws.com/sentisis-images/github_public/react-emails/logo.png';

const style = {

  header: {
    margin: '10px auto 20px auto',
    width: 'auto',
    backgroundColor: '#1c1c1c',
    color: "#ffffff"
  },

  img: {
    height: '35px',
  },

};

export const Header = ({title}) => (
    <Grid style={style.header}>
      {/*<Img style={style.img} src={logoSrc} alt="logo" />*/}
      {title}
    </Grid>
)

