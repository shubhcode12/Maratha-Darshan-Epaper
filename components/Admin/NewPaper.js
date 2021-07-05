import React, { useState } from "react";
import RegionSelect from "react-region-select";
import TextInput from "../TextInput";
import DateInput from "../DateInput";
import ImageInput from "../ImageInput";
import getDate from "../../utils/getDate";
import firebase from "../../utils/firebase";
import { CSSTransition } from "react-transition-group";

export default function NewPaper() {
  const defaultDate = getDate();
  const [date, setDate] = useState("");
  const [pages, setPages] = useState([]);
  const [uploadingPaper, setUploadingPaper] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [pageTitle, setPageTitle] = useState("");
  const [pageImg, setPageImg] = useState("");
  const [pageLinks, setPageLinks] = useState([]);
  const [pageImgSelected, setPageImgSelected] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const addPaper = async () => {
    setUploadingPaper(true);
    try {
      if (pages.length === 0) throw new Error("No pages added");
      const key = firebase.database().ref("/papers").push().key;
      await firebase
        .database()
        .ref(`/papers/${key}`)
        .set({ date: date || defaultDate, pages, addedOn: Date.now(), pdfDownload: "" });
      setDate("");
      setPages([]);
      setError("");
      setSuccess(true);
    } catch (e) {
      setError(e.message);
    }
    setUploadingPaper(false);
  };

  const uploadImage = async () => {
    setUploadingImage(true);
    try {
      const path = `/papers/${date || defaultDate}-${Date.now()}`;
      const ref = firebase.storage().ref(`/papers/${date || defaultDate}-${Date.now()}`);
      const uploadTask = ref.put(pageImgSelected);

      const uploadSuccess = () => {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          setPageImg(downloadURL);
          setUploadingImage(false);
        });
      };
      const uploadError = (error) => {
        setError(error.message);
        setUploadingImage(false);
      };

      uploadTask.on("state_changed", () => {}, uploadError, uploadSuccess);
    } catch (e) {
      console.log(e);
      setUploadingImage(false);
    }
  };

  const addPage = (ev) => {
    if (ev) ev.preventDefault();
    const currPages = pages;
    const links = pageLinks.map(({ x, y, width, height }) => {
      return { style: { x: y, y: x, width, height } };
    });
    currPages.push({ title: pageTitle, img: pageImg, links });
    setPages(currPages);
    setPageTitle("");
    setPageImg("");
    setPageLinks([]);
  };

  return (
    <>
      <div className="new-paper">
        <h2>New paper</h2>
        <div className="form-horiz">
          <DateInput id="date" name="date" label="Pick a date" value={date || defaultDate} onChangeValue={setDate} required />
          <button className={`btn${uploadingPaper ? " loading" : ""}`} disabled={uploadingPaper} onClick={addPaper}>
            Upload Paper
          </button>
        </div>

        {error && <div style={{ margin: "24px 0px", textAlign: "center", color: "red" }}>{error}</div>}

        <h3>Pages</h3>
        {pages.length === 0 && <div className="page">No page added</div>}
        {pages.map((page, i) => (
          <div className="page" key={i}>
            <h3>
              {i + 1}: {page.title}
            </h3>
          </div>
        ))}
        <div style={{ width: "100%", borderBottom: "1px solid #eaeaea", margin: "6px 0px" }} />

        <div className="form-horiz">
          <TextInput label="Page title" id="pageTitle" name="pageTitle" value={pageTitle} onChangeValue={setPageTitle} />
          <button className="btn" disabled={!pageTitle || !pageImg} onClick={addPage}>
            Add page
          </button>
        </div>

        <div className="form-horiz">
          <ImageInput label="Page Image" id="pageImg" name="pageImg" onChangeValue={setPageImgSelected} />
          <button className={`btn${uploadingImage ? " loading" : ""}`} disabled={uploadingImage} onClick={uploadImage}>
            Upload Image
          </button>
        </div>

        {/* <TextInput label="Page image URL" id="pageImg" name="pageImg" value={pageImg} onChangeValue={setPageImg} /> */}

        <RegionSelect maxRegions={15} regions={pageLinks} onChange={setPageLinks} className="selection-region">
          <div className="newspaper-page">
            <div className="newspaper-img">{pageImg && <img src={pageImg} alt="newspaper page" />}</div>
          </div>
        </RegionSelect>
      </div>
      <div className="success-noti-container">
        <CSSTransition in={success} timeout={5000} classNames="success-noti">
          <div className="success-noti">
            <div className="success-noti-content">
              <ion-icon name="checkmark-circle" />
              <span>Successfully submitted!</span>
            </div>
          </div>
        </CSSTransition>
      </div>
    </>
  );
}
