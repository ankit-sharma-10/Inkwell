import conf from "../conf/conf";
import { Client } from "appwrite";

const client = new Client();
client.setEndpoint(conf.appwriteEndpoint).setProject(conf.appwriteProjectID);

export default client;
