import React from "react";
import {
  Container,
  Grid,
  Button,
  TextField,
  Paper,
  Typography,
  Link,
} from "@material-ui/core";
import * as userApi from '../../Api/UserApi/UserApi';


const UserProfile = () => {
  const currentUserProfile = userApi.getCurrentUserInfo();
  return (
    <>
      <Container>
        <Grid container justify="center" wrap="wrap">

          <div>UserProfile</div>
          <div>{currentUserProfile.id}</div>
          <div>{currentUserProfile.email}</div>
        </Grid>
      </Container>
    </>
  );
};

export default UserProfile;
