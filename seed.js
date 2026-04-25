import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import { seedAdmin } from "./lib/seedAdmin.js";

await seedAdmin();

process.exit();