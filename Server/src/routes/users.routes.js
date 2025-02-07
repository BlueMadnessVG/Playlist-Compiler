import { Router } from "express";

const router = Router();

router.get("/users", (req, res) => {
  res.send("obtaining users");
});

export default router;
