import User from "../model/userModel.js";

// Create user API
export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    const savedData = await userData.save();
    res.status(200).json({ msg: "User added successfully",  data: savedData });
  } catch (error) {
    return res.status(500).json({  msg: "Error occurred while saving user", error: error.message });
  }
};

//fetch all user api
export const getAllUser = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(404).json({ msg: "Users data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
//fetch one user api
export const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
//data update api
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User data not found" });
    }
    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ msg: "User updated successfully",  data: updatedData });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
//delete user by id

export const deleteUser=async(req,res)=>{
    try {
        const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
        return res.status(404).json({ msg: "User data not found" });
    }
    const deletedUser=await User.findByIdAndDelete(id);
    res.status(200).json({msg:"User deleted successfully!"});
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}
