import Post from '../../Database/Model/Post/Post';

//get PostList
exports.getPostList = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (e) {
    console.log(e);
    res.send({ response: 'getPostList Error' });
  }
};

//create new post
exports.createPost = async (req, res) => {
  console.log(req);
  console.log(req.body);
  console.log(req.params);
  const post = new Post({
    title: req.body.title,
    author: req.body.author,
    contents: req.body.contents,
  });

  await post
    .save()
    .then((result) => {
      res.json(result).status(201);
    })
    .catch((err) => {
      res.send({ response: 'getPostList Error' });
    });
};

//edit post
exports.editPost = (req, res) => {
  console.log(req.body);
  console.log(req.params);
  Post.updateOne({
    _id: req.params.id,
    title: req.body.title,
    contents: req.body.contents,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
};

//delete post
exports.deletePost = async (req, res) => {
  await Post.remove({ _id: req.params.id })
    .then((result) => {
      res.json(result).status(201);
    })
    .catch((err) => {
      res.send({ response: 'delete Error' }).json(err);
    });
};

//get post detail
exports.viewPostDetail = (req, res) => {
  res.send({ response: 'viewPostDetail' }).status(200);
};
