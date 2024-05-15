exports.getPosts = (req, res, next) => {
  // return array of existing posts
  Post.find().then(foundPosts => {
    res.json({
      message: "All posts",
      posts: foundPosts
    });
  });
}
exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
 
  // create a new Post instance
  const post = new Post({
    title: title,
    content: content
  });
 
  // save the instance to the database
  post
  .save()
  .then(postSaved => {
    res.status(201).json({
      message: 'Post created successfully!',
      post: postSaved
    });
  })
  .catch(err => console.log('err', err));
}