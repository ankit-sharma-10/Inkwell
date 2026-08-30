import conf from "../conf/conf";
import client from "./client";
import { Storage, ID } from "appwrite";

export class StorageService {
  bucket;

  constructor() {
    this.bucket = new Storage(client);
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketID,
        fileId: ID.unique(),
        file: file,
      });
    } catch (error) {
      console.error("StorageService.uploadFile failed:", error);
      throw error;
    }
  }

  async getFile(fileId) {
    try {
      return await this.bucket.getFile({
        bucketId: conf.appwriteBucketID,
        fileId: fileId,
      });
    } catch (error) {
      console.error("StorageService.getFile failed:", error);
      throw error;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview({
        bucketId: conf.appwriteBucketID,
        fileId: fileId,
        width: 800,
        quality: 80,
      });
    } catch (error) {
      console.error("StorageService.getFilePreview failed:", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile({
        bucketId: conf.appwriteBucketID,
        fileId: fileId,
      });
      return true;
    } catch (error) {
      console.error("StorageService.deleteFile failed:", error);
      return false;
    }
  }
}

const storageService = new StorageService();

export default storageService;
