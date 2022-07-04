import messageService from "../services/messageService.js";

class messageController {
  async get(req, res) {
    try {
      res.json('Works fine!');
    } catch (err) {
      console.log('Some error');
      console.log(err);
      res.status(500).json('Some error');
    }
  }

  async postMessage(req, res) {
    try {
      await messageService.saveMessage(req.body);
      res.status(201).json('Message was saved');
    } catch (err) {
      console.log('Some error');
      console.log(err);
      res.status(500).json('Some error');
    }
  }

  async getLastMessage() {
    try {
      const message = await messageService.getLastMessage();
      res.json(message);
    } catch (err) {
      console.log('Some error');
      console.log(err);
      res.status(500).json('Some error');
    }
  }
};

export default new messageController();