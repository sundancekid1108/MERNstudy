import Post from '../../Database/Model/Post/Post';

//post list 받기
exports.getPostList = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts).status(200);
  } catch (e) {
    console.log(e);
    res.send({ response: 'getPostList Error' });
  }
};

// post detail 받기
exports.getPostDetail = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    res.json(post).status(200);
  } catch (e) {
    console.log(e);
    res.send({ response: 'getPostDetail Error' });
  }
};

//create new post
exports.createPost = async (req, res) => {
  // console.log(req);
  // console.log(req.body);
  // console.log(req.params);

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
exports.editPost = async (req, res) => {
  console.log(req);
  await Post.updateOne(
    {
      _id: req.params.id,
    },
    {
      title: req.body.title,
      contents: req.body.contents,
    },
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
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
