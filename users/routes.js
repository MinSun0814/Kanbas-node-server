import * as dao from "./dao.js";
import {findUserByCredentials, updateUser} from "./dao.js";
let currentUser = null;
function UserRoutes(app) {

  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const findByUsername = async (req, res) => {
    const username = req.params.username;
    const user = await dao.findUserByUsername(username);
    res.json(user);
  };

  const findUserByCredentials = async (req, res) => {
    const {username, password} = req.params;
    const user = await dao.findUserByCredentials(username, password);
    res.json(user);
  };

  const findUserByRole = async (req, res) => {
    const role= req.params.role;
    const user = await dao.findUserByRole(role);
    res.json(user);
  }

  const createUser = async (req, res) => {
    const {username, password, email, role} = req.params;
    const user = await dao.createUser({username, password, email, role});
    res.json(user);
  }


  const updateUser = async (req, res) => {
    const status = await dao.updateUser(req.params.userId, req.body);
    res.json(status);
  }

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };


  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.get("/api/users/username/:username", findByUsername);
  app.get("/api/users/credentials/:username/:password", findUserByCredentials);
  app.get("/api/users/role/:role", findUserByRole);
  app.get("/api/users/create/:username/:password/:email/:role", createUser);
  app.delete("/api/users/:userId", async (req, res) => {
    try {
      const status = await dao.deleteUser(req.params.userId);
      if (status.deletedCount === 0) {
        return res.status(404).send("User not found");
      }
      res.status(200).send("User deleted successfully");
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send("Error during deletion");
    }
  });
  app.put("/api/users/:userId", updateUser);
  app.post("/api/users/signin", async (req, res) => {
    try {
      const { username, password } = req.body; // Change to req.body
      const user = await dao.findUserByCredentials(username, password);
      if (!user) {
        return res.status(404).send("User not found");
      }
      req.session.currentUser = user; // Store user in session
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  });
  app.post("/api/users/signup", async (req, res) => {
    try {
      const { username, password, email, role } = req.body; // Make sure to get data from req.body
      const existingUser = await dao.findUserByUsername(username);
      if (existingUser) {
        return res.status(409).send("Username already taken");
      }

      const newUser = await dao.createUser({ username, password, email, role });
      req.session.currentUser = newUser; // Store the new user in the session
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).send("Error during signup");
    }
  });




}
export default UserRoutes;