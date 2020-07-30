exports.getPostList = (req, res) => {
  res.send({ response: 'Server is running' }).status(200);
};

exports.createPost = (req, res) => {};

exports.editPost = (req, res) => {
  res.send({ response: 'editpost' }).status(200);
};

exports.deletePost = (req, res) => {
  res.send({ response: 'deletepost' }).status(200);
};

exports.viewPostDetail = () => {};
