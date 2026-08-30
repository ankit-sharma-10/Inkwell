import client from "./client";
import { Account, ID } from "appwrite";

export class AuthService {
  account;

  constructor() {
    this.account = new Account(client);
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
      console.error("AuthService.createAccount failed:", error);
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
      console.error("AuthService.login failed:", error);
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
      console.error("AuthService.getCurrentUser failed:", error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("AuthService.logout failed:", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
