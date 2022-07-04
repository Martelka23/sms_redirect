import userService from "../services/userService";

class UserController {
  async get(req, res) {
    try {
      
    } catch (err) {
      console.log(err);
      res.status(500).json('Error');
    }
  }

  async getIds(req, res) {
    try {

    } catch (err) {
      console.log(err);
      res.status(500).json('Error');
    }
  }

  async check(req, res) {
    try {

    } catch (err) {
      console.log(err);
      res.status(500).json('Error');
    }
  }

  async create(req, res) {
    try {

    } catch (err) {
      console.log(err);
      res.status(500).json('Error');
    }
  }

  async activate(req, res) {
    try {

    } catch (err) {
      console.log(err);
      res.status(500).json('Error');
    }
  }
};

export default new UserController();