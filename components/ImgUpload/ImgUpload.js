import { useState } from "react";
import { API_URL } from "@/config/index";

export default function ImgUpload({ eventId, imageUploaded }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "festivals");
    formData.append("refId", eventId);
    formData.append("field", "image");

    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="upload">
      <h1>Festival Bild Hochladen</h1>
      <form className="upload__form" onSubmit={handleSubmit}>
        <div className="upload__file">
          <input type="file" onChange={handleFileChange} />
          <input type="submit" value="Hochladen" className="upload__btn" />
        </div>
      </form>
    </div>
  );
}
