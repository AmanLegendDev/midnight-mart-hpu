import bcrypt from "bcryptjs";
import { connectDB } from "./db.js";
import Admin from "../models/Admin.js";

export async function seedAdmin() {

await connectDB();

const exists = await Admin.findOne({
email: "admin@hilaire.com"
});

if (exists) {

await Admin.deleteOne({
email: "admin@hilaire.com"
});

}

const hashedPassword =
await bcrypt.hash(
"Hilaire@2026Admin",
10
);

await Admin.create({
email: "admin@hilaire.com",
password: hashedPassword,
role: "admin"
});

console.log("Admin created successfully");

}