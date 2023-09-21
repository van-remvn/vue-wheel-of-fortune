import AuthRepository from "./AuthRepository";

const repositories = {
  auth: AuthRepository,
};
export default {
  get: (name) => repositories[name],
};