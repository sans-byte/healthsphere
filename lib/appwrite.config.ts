import * as sdk from "node-appwrite";
import { API_KEY, ENDPOINT, PROJECT_ID } from "./config";

const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const storage = new sdk.Storage(client);
export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
