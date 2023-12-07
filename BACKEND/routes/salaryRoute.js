const router = require("express").Router();
// const Member = require("../models/membersModel");
const Salary = require("../models/salaryModel");
const authMiddleware = require("../middlewares/authMiddleware");

// add 
router.post("/add-salary", authMiddleware, async (req, res) => {
  try {
    const newSalary = new Salary(req.body);
    await newSalary.save();
    return res.send({ success: true, message: "Salary status added successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// update
router.put("/update-salary/:id", authMiddleware, async (req, res) => {
  try {
    await Salary.findByIdAndUpdate(req.params.id, req.body);
    return res.send({ success: true, message: "Salary status updated successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// delete a member
router.delete("/delete-salary/:id", authMiddleware, async (req, res) => {
  try {
    await Salary.findByIdAndDelete(req.params.id);
    return res.send({ success: true, message: "Salary status deleted successfully" });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// get all salaries
router.get("/get-all-salary", authMiddleware, async (req, res) => {
  try {
    const salary = await Salary.find().sort({ createdAt: -1 });
    return res.send({ success: true, data: salary });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

// get a members by id
router.get("/get-salary-by-id/:id", authMiddleware, async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id);
    return res.send({ success: true, data: salary });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

module.exports = router;