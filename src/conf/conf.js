const conf = {
  appwriteEndpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDbID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteTableID: String(import.meta.env.VITE_APPWRITE_TABLE_ID),
  appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  tinyMCEAPIKey: String(import.meta.env.VITE_TINY_MCE_API_KEY),
};

export default conf;
