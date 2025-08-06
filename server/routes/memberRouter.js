const express = require('express');
const memberRouter = express.Router();
const { getMembers, createMember, updateMember, getPublicMemberList, deleteMember } = require("../controllers/memberHandler");

memberRouter.get("/", getMembers);
memberRouter.get("/public", getPublicMemberList);
memberRouter.post("/", createMember);
memberRouter.patch("/:id", updateMember);
memberRouter.delete("/:id", deleteMember);


module.exports = memberRouter;