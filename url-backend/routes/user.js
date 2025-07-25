const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/user");

// Authentication routes
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);

// User profile routes
userRouter.get("/:userId", userController.getUserProfile);
userRouter.put("/:userId", userController.updateUserProfile);
userRouter.delete("/:userId", userController.deleteUser);

// User URLs route
userRouter.get("/:userId/urls", userController.getUserUrls);

module.exports = userRouter;