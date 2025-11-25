import mongoose from "mongoose";


beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/", {
    dbName: "voiceowl_test",
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
