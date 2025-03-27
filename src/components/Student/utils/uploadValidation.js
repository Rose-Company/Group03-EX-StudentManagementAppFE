export const validateFile = (file, setUploadStatus, setErrorMessage) => {
  const validExtensions = ["csv", "json"];
  const fileExtension = file.name.split(".").pop().toLowerCase();

  if (!validExtensions.includes(fileExtension)) {
    setUploadStatus("error");
    setErrorMessage(
      "File không đúng định dạng. Chỉ chấp nhận file .CSV hoặc .JSON"
    );
    return false;
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    setUploadStatus("error");
    setErrorMessage(
      "Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB"
    );
    return false;
  }

  setUploadStatus("success");
  setErrorMessage("");
  return true;
}; 