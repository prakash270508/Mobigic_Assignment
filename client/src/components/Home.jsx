import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
  const [file, setFile] = useState(null);
  const [token, setToken] = useState("");
  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const getImages = async () => {
    try {
      const response = await axios.get("http://localhost:4000/auth/images", {
        headers: {
          Authorization: token,
        },
      });
      setImages(response.data.image);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      await axios.post("http://localhost:4000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      toast.success("File uploaded successfully.")
      console.log("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      getImages();
    }
  }, [token, handleUpload]);

  const downloadFile = async (fileName, code) => {
    const givenCode = prompt("Give the code");

    if (givenCode != code) {
      return toast.error("Code not matched");
    }

    try {
      const response = await axios.get(
        `http://localhost:4000/download/${fileName}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = ()=>{
    localStorage.removeItem('token')
    toast.success("Logged out")
    window.location.reload()
  }

  const deleteImage = async (id) => {
    const filterImage = images.filter((image) => image._id != id);

    setImages(filterImage);

    try {
      await axios.get(`http://localhost:4000/auth/delete/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      toast.success("Image deleted")
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="container my-5 text-center">

      <button className="btn btn-danger" style={{float:"right"}} onClick={handleLogout}>Logout</button>

      <h2>File Upload</h2>

      <input
        type="file"
        className="form-control w-100"
        onChange={handleFileChange}
      />
      <span>
        <button className="btn btn-secondary w-100 my-3" onClick={handleUpload}>
          Upload
        </button>
      </span>

      <h2>
        <b>Your files</b>
      </h2>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">sr no.</th>
            <th scope="col">File Name</th>
            <th scope="col">Code</th>
            <th scope="col">Download</th>
            <th scope="col">View</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {images &&
            images.map((image, index) => (
              <tr key={image._id}>
                <th scope="row">{index + 1}</th>
                <td>{image.imageName}</td>
                <td>{image.code}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => downloadFile(image.imageName, image.code)}
                  >
                    Download
                  </button>
                </td>
                <td>
                  <a
                    href={`http://localhost:4000/image/${image.imageName}`}
                    target="_blank"
                  >
                    <button className="btn btn-secondary">View</button>
                  </a>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteImage(image._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
