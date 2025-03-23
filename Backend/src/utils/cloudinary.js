import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
        cloud_name: "adityaop",
        api_key: "799151416882437",
        api_secret: "MI3tTgB4LHwUMwsffXKP6wn3jvo",
});
const uploadOnCloudinary = async (localFilePath) => {
        try {
                if (!localFilePath) {
                        return null;
                }

                const response = await cloudinary.uploader.upload(
                        localFilePath,
                        {
                                resource_type: "auto",
                        },
                );
                // console("cloudinary response  : ", response)
                fs.unlinkSync(localFilePath);
                return response;

                // file has been succesfully uploaded on cloudnary
        } catch (error) {
                fs.unlinkSync(localFilePath);
                return null;
                // remove the unploaded locally saved temporary file as the upload operation got failed
        }
};

const deleteFromCloudinary = async (localFilePath) => {
        try {
                if (!localFilePath) {
                        return null;
                }
                const deleate =
                        await cloudinary.uploader.destroy(localFilePath);
                return deleate;
        } catch (error) {
                return null;
        }
};

export { uploadOnCloudinary, deleteFromCloudinary };
