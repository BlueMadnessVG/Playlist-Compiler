import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "",
  user: "",
  password: "",
  port: "",
  database: "",
});
