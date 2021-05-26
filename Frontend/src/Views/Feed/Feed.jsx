import React, { useState, useEffect } from "react";
import * as postApi from "../../Api/PostApi/PostApi";
import {
  Container,
  Grid,
  Button,
  TextField,
  Paper,
  Typography,
  Link,
} from "@material-ui/core";
const Feed = () => {
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    const fetchPostsList = async () => {
      const data = await postApi.getPostList;
      console.log("data", data);
      setPostsList(data || []);
      // null data 받을때 TypeError: Cannot read property 'map' of undefined 관련 에러 처리
    };

    fetchPostsList();
  }, []);

  return (
    <>
      <div>
        {postsList?.map((post) => (
          <Paper>
            <div key={post._id}>
              <div>{post.title}</div>
              <div>{post.username}</div>
              <div>{post.contents}</div>
            </div>
          </Paper>
        ))}
      </div>
    </>
  );
};

export default React.memo(Feed);
