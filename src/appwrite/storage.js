import conf from "../conf/conf";
import { Client, Storage, ID } from "appwrite";

export class StorageService {
  client = new Client();
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectID);

    this.bucket = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      const result = await this.storage.createFile({
        bucketId: conf.appwriteBucketID,
        fileId: ID.unique(),
        file: file,
      });
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getFile(fileId) {
    try {
      const result = await this.storage.getFile({
        bucketId: conf.appwriteBucketID,
        fileId: fileId,
      });
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  getFilePreview(fileId) {
    try {
      const result = this.storage.getFilePreview({
        bucketId: conf.appwriteBucketID,
        fileId: fileId,
        width: 800,
        quality: 80,
      });
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  async deleteFile(fileId) {
    try {
      const result = await this.storage.deleteFile({
        bucketId: conf.appwriteBucketID,
        fileId: fileId,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const storageService = new StorageService();

export default storageService;
