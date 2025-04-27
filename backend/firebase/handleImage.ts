import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { analytics } from "./firebase.config";
import fs from "fs/promises";

interface UploadedFile {
  originalname: string;
  mimetype: string;
  path: string;
}
export default async function uploadImg(file: UploadedFile) {
  try {
    const fileRef = ref(analytics, `images/${file.originalname.split(".")[0]}?uploadAt=${new Date().getTime()}`);
    const fileBuffer = await fs.readFile(file.path);

    const metadata = {
      contentType: file.mimetype,
    };

    const upload = await uploadBytes(fileRef, fileBuffer, metadata).then((res) =>
      getDownloadURL(res.ref).then((url) => url)
    );
    return upload;
  } catch (error) {
    return {
      error: true,
      message: "We had a problem trying to upload the image.",
    };
  }
}

export async function deleteImage(url: string) {
  if (url === process.env.DEFAULT_PRODUCT_PHOTO) return { message: "This image can't be deleted" };
  try {
    const fileRef = ref(analytics, url);
    await deleteObject(fileRef);
    return {
      message: "Image deleted with success",
    };
  } catch (error) {
    return {
      error: true,
      message: "we had a problem trying to delete the image",
    };
  }
}
