import { router } from "express";

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

export default router