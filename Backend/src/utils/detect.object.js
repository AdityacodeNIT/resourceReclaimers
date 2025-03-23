import axios from "axios";

const detectObjects = async (imageBuffer) => {
    const response = await axios.post("https://api-inference.huggingface.co/models/facebook/detectron2", imageBuffer, {
        headers: {
            "Authorization": `Bearer YOUR_HF_API_KEY`,
            "Content-Type": "application/octet-stream"
        }
    });

    return response.data; // List of detected objects
};

export default detectObjects;
