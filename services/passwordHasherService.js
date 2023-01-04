import bcrypt from 'bcryptjs';


const passwordHasherService = {
  hashPassword : (password) => {
    return bcrypt.hashSync(password, 10);
  },
  validatePassword: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  }
}

export default passwordHasherService;