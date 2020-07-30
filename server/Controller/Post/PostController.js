exports.getPostList = (req, res) => {
  res.send({ response: 'Server is running' }).status(200);
};

exports.createPost = (req, res) => {
  const { title, author, contents } = req.body;
  const post = new Post({
    title,
    author,
    contents,
  });

  try {
    post.save();
    res.body = post;
  } catch (e) {
    res.send({ response: 'Error!' }).status(500);
  }
};

exports.editPost = (req, res) => {
  res.send({ response: 'editpost' }).status(200);
};

exports.deletePost = (req, res) => {
  res.send({ response: 'deletepost' }).status(200);
};

exports.viewPostDetail = () => {};
