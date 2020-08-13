import React, { useState, useEffect } from "react";
import * as postApi from "../../Api/PostApi/PostApi";

const Feed = () => {
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    const fetchPostsList = async () => {
      const data = await postApi.getPostList;
      console.log("data", data);
      setPostsList(data);
    };

    fetchPostsList();
  }, []);

  return (
    <>
      <div>feed</div>
      <div>
        <ul>
          {postsList.map((post) => (
            <div key={post._id}>
              <li>{post.title}</li>
              <li>{post.contents}</li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default React.memo(Feed);
