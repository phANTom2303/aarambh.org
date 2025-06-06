const mongoose = require('mongoose');
const Member = require("../models/memberModel");

async function getMembers(req, res) {
    const allMembers = await Member.find({});
    return res.json(allMembers);
}

async function createMember(req, res) {
    const { name, email, phoneNum, dateOfJoin } = req.body;
    try {
        await Member.create({
            name,
            email,
            phoneNum,
            dateOfJoin, // Make sure this matches the schema, it was dateOfJoining previously
        });
        return res.status(201).json({ "msg": `Member ${name} created` });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            // You can inspect error.keyValue to see which field caused the error
            let duplicateField = Object.keys(error.keyValue)[0];
            return res.status(400).json({ "msg": `Error: A member with this ${duplicateField} already exists.` });
        }
        // Other errors
        console.error("Error creating member:", error);
        return res.status(500).json({ "msg": "Error creating member. Please try again." });
    }
}

async function updateMember(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedMember = await Member.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true },
        );

        if (!updatedMember) {
            return res.status(404).json({ "msg": "Member not found." });
        }

        return res.json({ "msg": `Member ${updatedMember.name} updated successfully.`, "member": updatedMember });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            let duplicateField = Object.keys(error.keyValue)[0];
            return res.status(400).json({ "msg": `Error: A member with this ${duplicateField} already exists.` });
        }
        console.error("Error updating member:", error);
        return res.status(500).json({ "msg": "Error updating member. Please try again." });
    }
}

async function deleteMember(req, res) {
    const { id } = req.params;
    try {
        const deletedMember = await Member.findByIdAndDelete(id);

        if (!deletedMember) {
            return res.status(404).json({ "msg": "Member not found." });
        }

        return res.json({ "msg": `Member ${deletedMember.name} deleted successfully.`, "member": deletedMember });
    } catch (error) {
        console.error("Error deleting member:", error);
        return res.status(500).json({ "msg": "Error deleting member. Please try again." });
    }
}

module.exports = {
    getMembers,
    createMember,
    updateMember,
    deleteMember,
}