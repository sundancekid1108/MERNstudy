import Post from '../../Database/Model/Post/Post';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

//post list 받기
exports.getPostList = async (req, res) => {
  try {
    const posts = await Post.find({}, null, { sort: { _id: -1 } });
    res.json(posts).status(200);
  } catch (e) {
    console.log(e);
    res.send({ response: 'getPostList Error' });
  }
};

//Post 검색
exports.searchPost = (req, res) => {
  res.send({ response: 'searching Post' }).status(200);
};

// post detail 받기
exports.getPostDetail = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.json('400 bad request').status = 400;
    }

    const post = await Post.findById(req.params.id);
    res.json(post).status(200);
  } catch (e) {
    console.log(e);
    res.send({ response: 'getPostDetail Error' }).status(500);
  }
};

//create new post
exports.createPost = async (req, res) => {
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    creator: req.body.creator,
    contents: req.body.contents,
  });

  await post
    .save()
    .then((result) => {
      res.json(result).status(201);
    })
    .catch((err) => {
      res.send({ response: 'createPost Error' }).status(500);
    });
};

//edit post
exports.editPost = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.json('400 bad request').status = 400; // Bad Request
    }
    const post = await Post.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        title: req.body.title,
        contents: req.body.contents,
      },
      { multi: true, new: true },
    );

    if (!post) {
      res.send({ response: '404 Error' }).status(404);
    }

    res.json(post).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
};

//delete post
exports.deletePost = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.json('400 bad request').status = 400; // Bad Request
    }
    const post = await Post.findByIdAndDelete({
      _id: req.params.id,
    });

    if (!post) {
      res.send({ response: '404 Error' }).status(404);
    }

    res.send({ response: 'delete Post successfully' }).status(200);
  } catch (e) {
    res.json(e);
  }
};
