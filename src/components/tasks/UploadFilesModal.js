import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Col, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import { useForm } from "../../hooks/useForm";
import { storage } from "../../firebase/index";

export const UploadFilesModal = (props) => {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleUpload = () => {
    const promises = [];
    images.map((image) => {
      const uploadTask = storage
        .ref(`images/${props.project._id}/${props.task._id}/${image.name}`)
        .put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref(`images/${props.project._id}/${props.task._id}`)
            .child(image.name)
            .getDownloadURL()
            .then((urls) => {
              setUrls((prevState) => [...prevState, urls]);
            });
        }
      );
    });

    Promise.all(promises)
      .then(() => alert("All images uploaded"))
      .catch((err) => console.log(err));
  };

  console.log("images: ", images);
  console.log("urls", urls);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header closeButton onClick={props.onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Subir Archivos
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <progress value={progress} max="100" />
        <input type="file" multiple onChange={handleChange} id="upload-file" />
        <br />
        {urls.map((url, i) => (
          <img
            key={i}
            style={{ height: "200px", margin: "10px"}}
            src={url || "http://via.placeholder.com/300"}
            alt="firebase-image"
          />
        ))}
        <div className="button p-3 mx-5 mb-5">
          <button className="auth_button" onClick={handleUpload}>
            Subir
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};