import  * as React from  'react';
import { v4 as uuidv4 } from "uuid";

import Button from '../button/button';
import { uploadFile, deleteFile } from "../../utils/firebase/firebase.storage";
import { FullPageSpinner } from '../../utils/lib/lib';

function ImageUploadPreview({
  basePath,
  existingImageUrl,
  handleUploadFinish,
  handleUploadCancel,
}) {
  const [uploadProgress, setUploadProgress] = React.useState(-1);
  const [imageUrl, setImageUrl] = React.useState("");

  const fileInputRef = React.useRef();

  React.useEffect(() => {
    if (existingImageUrl) {
      setImageUrl(existingImageUrl);
    } else {
      setUploadProgress(-1);
      setImageUrl("");
      fileInputRef.current.value = null;
    }
  }, [existingImageUrl]);

  async function handleFileChanged(event) {
    const files = event.target.files;
    const file = files[0];

    if (!file) {
      alert("File Select Failed. Please try again.");
      return;
    }

    const generatedFileId = uuidv4();

    try {
      const downloadUrl = await uploadFile(
        file,
        `${basePath}/${generatedFileId}`,
        setUploadProgress(100)
      );

      setImageUrl(downloadUrl);
      handleUploadFinish(downloadUrl);
    } catch (error) {
      setUploadProgress(-1);
      fileInputRef.current.value = null;
      alert(error.message);
      throw error;
    }
  }

  function handleCancelImageClick() {
    deleteFile(imageUrl);
    fileInputRef.current.value = null;
    setImageUrl("");
    setUploadProgress(-1);
    handleUploadCancel();
  }

  return (
    <div className="imageUploadContainer">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChanged}
        ref={fileInputRef}
        hidden={uploadProgress > -1 || imageUrl}
      />
      {!imageUrl && uploadProgress > -1 ? (
        <div className="imageUploadContainer__progress">
          <label htmlFor="file">Upload Progress:</label>
          <FullPageSpinner />
          {/* <progress id="file" value={uploadProgress} max="100">
            {uploadProgress}%
          </progress>
          <span>{uploadProgress}%</span> */}
        </div>
      ) : null}
      {imageUrl ? (
        <div className="imageUploadContainer__imageBox">
          <img src={imageUrl} alt={imageUrl} className="imageUploadContainer__imageBox__img" />
          <Button
            btnType='cancelImg' 
            onClick={handleCancelImageClick}
          >
            Cancel Image
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default ImageUploadPreview;