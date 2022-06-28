import fs from 'fs';

import strftime from 'strftime';
import { Router } from 'express';


const router = Router();

router.get('/', async (req, res) => {
  try {
    res.json('Works fine!');
  } catch (err) {
    console.log('Some error');
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { message, password } = req.body;
    if (password === 'supersecretsmspassword') {
      const datetime = strftime('%F %T', new Date());
      const text = `Получено в ${datetime}. Содержание: ${message}`;
      fs.appendFile('messages.txt', text + '\n', () => {
        console.log('New message was added!');
        res.json('New message was added!');
      });
    }
  } catch (err) {
    console.log('Some error');
    console.log(err);
  }
});

export default router;