const express = require('express');
const memberRouter = express.Router();
const { getMembers, createMember, updateMember, getPublicMemberList, deleteMember } = require("../controllers/memberHandler");
const { onlyAllowAuthenticatedAdmins } = require('../middlewares/authenticationCheck');

memberRouter.get("/", onlyAllowAuthenticatedAdmins, getMembers);
memberRouter.get("/public", getPublicMemberList);
memberRouter.post("/", onlyAllowAuthenticatedAdmins, createMember);
memberRouter.patch("/:id", onlyAllowAuthenticatedAdmins, updateMember);
memberRouter.delete("/:id", onlyAllowAuthenticatedAdmins, deleteMember);


module.exports = memberRouter;