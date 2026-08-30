import conf from "../conf/conf";
import client from "./client";
import { ID, Databases, Query } from "appwrite";

export class DBService {
  database;

  constructor() {
    this.database = new Databases(client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.database.createDocument({
        databaseId: conf.appwriteDbID,
        collectionId: conf.appwriteTableID,
        documentId: slug,
        data: {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.error("DBService.createPost failed:", error);
      throw error;
    }
  }

  async deletePost({ slug }) {
    try {
      await this.database.deleteDocument({
        databaseId: conf.appwriteDbID,
        collectionId: conf.appwriteTableID,
        documentId: slug,
      });
      return true;
    } catch (error) {
      console.error("DBService.deletePost failed:", error);
      return false;
    }
  }

  async getPost({ slug }) {
    try {
      return await this.database.getDocument({
        databaseId: conf.appwriteDbID,
        collectionId: conf.appwriteTableID,
        documentId: slug,
      });
    } catch (error) {
      console.error("DBService.getPost failed:", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments({
        databaseId: conf.appwriteDbID,
        collectionId: conf.appwriteTableID,
        queries: queries,
      });
    } catch (error) {
      console.error("DBService.getPosts failed:", error);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.database.updateDocument({
        databaseId: conf.appwriteDbID,
        collectionId: conf.appwriteTableID,
        documentId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
        },
      });
    } catch (error) {
      console.error("DBService.updatePost failed:", error);
      throw error;
    }
  }
}

const dbService = new DBService();

export default dbService;
