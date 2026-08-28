import conf from "../conf/conf";
import { Client, ID, Databases, Query } from "appwrite";

export class DBService {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectID);

    this.database = new Databases(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const result = await this.databases.createDocument({
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

      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deletePost({ slug }) {
    try {
      const result = await this.databases.deleteDocument({
        databaseId: conf.appwriteDbID,
        collectionId: conf.appwriteTableID,
        documentId: slug,
      });

      console.log(result);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPost({ slug }) {
    try {
      const result = await this.databases.getDocument({
        databaseId: conf.appwriteDbID,
        collectionId: conf.appwriteTableID,
        documentId: slug,
      });

      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      const result = await this.databases.getDocument({
        databaseId: conf.appwriteDbID,
        collectionId: conf.appwriteTableID,
        queries: queries,
      });

      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const result = await this.databases.updateDocument({
        databaseId: conf.appwriteDbID,
        collectionId: conf.appwriteTableID,
        documentId: slug,
        data: {
          title,
          slug,
          content,
          featuredImage,
          status,
        },
      });

      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const dbService = new DBService();

export default dbService;
