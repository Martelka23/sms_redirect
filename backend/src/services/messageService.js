import strftime from 'strftime';

import messageDal from "../dal/messageDal.js";

class messageService {
  async saveMessage({ from, text, password }) {
      if (password === 'supersecretsmspassword') {
        const datetime = strftime('%F %T', new Date());
        // const text = `Получено в ${datetime}. Содержание: ${message}`;
        const result = await messageDal.insert(datetime, from, text);

        if (!result) {
          throw new Error('Save error');
        }

        // fs.appendFile('messages.txt', text + '\n', () => {
        //   console.log('New message was added!');
        //   res.json('New message was added!');
        // });
      }
  }

  async getLastMessage() {
    const result = await messageDal.selectLastMessage();

    return result;
  }
};

export default new messageService();