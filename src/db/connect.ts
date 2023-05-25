import mongoose from "mongoose";
import { DB_NAME, DB_URL } from "../config/config";

const connectDatabase = async () => {
  // return MODE === 'dev'
  //   ? await mongoose.connect(DB_LOCAL_CONTAINER, { dbName: 'db-rss-posts', socketTimeoutMS: 60 * 1000 })
  // : await mongoose.connect(DB_URL, { dbName: DB_NAME, socketTimeoutMS: 60 * 1000 });
  await mongoose.connect(DB_URL as string, { dbName: DB_NAME, socketTimeoutMS: 60 * 1000 });
};

const closeDbConnection = async () => {
  const res = await mongoose.connection.close(true);
  console.log("closeDbConnection", res);

  console.log("DB disconnected on app termination");
};

export { connectDatabase, closeDbConnection };
