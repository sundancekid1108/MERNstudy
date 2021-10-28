import React, { useState, useEffect } from "react";
import { withStyles, CircularProgress, Typography } from "@material-ui/core";
import Dashboard from "../../Layouts/Dashboard/Dashboard";
import * as postApi from "../../Api/PostApi/PostApi";

const styles = (theme) => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing(20),
  },
});

const Feed = () => {
  const [postsList, setPostsList] = useState(null);

  useEffect(() => {
    const fetchPostsList = async () => {
      const data = await postApi.getPostList;
      console.log("data : ", data);
      console.log("data type : ", typeof data);
      // setPostsList(data);
      // // console.log(postsList);
      // // null data 받을때 TypeError: Cannot read property 'map' of undefined 관련 에러 처리
    };

    fetchPostsList();
    console.log(postsList);
  }, []);

  return (
    <>
      <Dashboard title="Feed"></Dashboard>
    </>
  );
};

export default withStyles(styles)(Feed);
