import axios from "axios";

//* 파일 업로드 하기
export const uploadFileAPI = (file: FormData) =>
  axios.post<string>("/api/file", file, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
