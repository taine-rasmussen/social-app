import User from '../Models/User.js';

// Read
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const updateNetwork = async () => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const {
      network
    } = req.body;

    console.log(network, user, 'ARE WE GETTING HERE YET???????')

    const updatedNetwork = await user.findByIdAndUpdate(
      id,
      { network: network }
    );

    console.log(updatedNetwork)

    res.status(200).json(updatedNetwork);
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
};

export const updateSocial = async () => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);



  } catch (err) {
    res.status(404).json({ message: err.message })
  }
};

export const getAll = async (req, res) => {
  try {
    const allUsers = await User.find()
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath }
      }
    );
    res.status(200).json(formattedFriends);

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};