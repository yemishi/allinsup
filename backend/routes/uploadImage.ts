import express from "express";
import uploadImg, { deleteImage } from "../firebase/handleImage";
import multer from "multer";
const router = express();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.json({ error: true, message: "File is required" });
    const url = await uploadImg(file);
    return res.json({ url });
  } catch (error) {
    return res.json({ error: true, message: "We had a problem" });
  }
});

router.post("/many", upload.array("files[]"), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files) return res.json({ error: true, message: "Files is required" });
    const urlsPromise = files.map(async (file) => await uploadImg(file));
    const urls = await Promise.all(urlsPromise);
    return res.json({ urls });
  } catch (error) {
    return res.json({ error: true, message: "We had a problem" });
  }
});
router.delete("/", async (req, res) => {
  try {
    const { url } = req.body;
    await deleteImage(url);

    return res.json({ message: "image deleted with success" });
  } catch (error) {
    return res.json({ error: true, message: "We had a problem" });
  }
});

router.delete("/many", async (req, res) => {
  try {
    const { urls } = req.body as { urls: string[] };
    const PromiseDelete = urls.map(async (url) => {
      await deleteImage(url);
    });
    await Promise.all(PromiseDelete);
    return res.json({ message: "Images deleted with success" });
  } catch (error) {
    return res.json({ error: true, message: "We had a problem" });
  }
});

export default router;
