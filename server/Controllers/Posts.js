import Post from '../Models/Posts.js'
import User from '../Models/User.js';

// Create
export const createPost = async (req, res) => {
  try{
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      firstname: user.firstName,
      lastname: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: []
    });

    await newPost.save();
    const post = await Post.find();
    res.status(201).json(post)

    // Save new post and return all posts including new post to display
  } catch (err){
    res.status(409).json({ message: err.message})
  }
};