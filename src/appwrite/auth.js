import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectID);

    this.account = new Account(this.client);
  }

  async createAccount({ userName, email, password }) {
    try {
      const user = await this.account.create({
        userId: ID.unique(),
        name: userName,
        email: email,
        password: password,
      });

      if (user) {
        return await this.login({ email, password });
      } else {
        return user;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({
        email: email,
        password: password,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();

      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      // 401 means there is no active session
      if (error.code === 401) {
        return null;
      }
      console.log(error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
