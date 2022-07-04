import userDal from "../dal/userDal";

class UserService {

  async get() {
    const users = await userDal.selectAll();

    return users;
  }

  async getIds() {
    const ids = await userDal.selectIds();

    return ids;
  }

  async check(id) {
    const candidate = await userDal.check(id);
    let status = 'Not found';

    if (candidate && candidate.isActivated) {
      status = 'Activated';
    } else if (candidate && !candidate.isActivated) {
      status = 'Not activated';
    }

    return status;
  }

  async create({ userId, firstname, lastname, nickname, isActived }) {
    
  }

  async activate() {

  }
};

export default new UserService();