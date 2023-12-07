const router = require("express").Router();
const Member = require("../models/membersModel");
const authMiddleware = require("../middlewares/authMiddleware");


// add a member
router.post("/add-member", authMiddleware, async (req, res) => {
  try {
    const newMember = new Member(req.body);
    await newMember.save();
    return res.send({ success: true, message: "Member added successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// update a member
router.put("/update-member/:id", authMiddleware, async (req, res) => {
  try {
    await Member.findByIdAndUpdate(req.params.id, req.body);
    return res.send({ success: true, message: "Member updated successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// delete a member
router.delete("/delete-member/:id", authMiddleware, async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    return res.send({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// get all members
router.get("/get-all-members", authMiddleware, async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    return res.send({ success: true, data: members });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// get a members by id
router.get("/get-members-by-id/:id", authMiddleware, async (req, res) => {
  try {
    const members = await Member.findById(req.params.id);
    return res.send({ success: true, data: members });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

module.exports = router;
