import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import palette from "../../styles/palette";

import { useSelector } from "../../store";
import RegisterRoomFooter from "./RegisterRoomFooter";
import Button from "../common/button/Button";
import UploadIcon from "../../public/static/svg/button/upload.svg";
import { uploadFileAPI } from "../../lib/api/file";
import { registerRoomActions } from "../../store/registerRoom";
import RegisterRoomPhotoCardList from "./RegisterRoomPhotoCardList";

const Container = styled.div`
  padding: 62px 30px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  .register-room-step-info {
    margin-top: 6px;
    margin-bottom: 32px;
  }
  .register-room-upload-photo-wrapper {
    width: 858px;
    height: 433px;
    margin: auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed ${palette.gray_bb};

    input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    img {
      width: 100%;
      max-height: 100%;
    }
  }
`;

const RegisterRoomPhoto: React.FC = () => {
  const dispatch = useDispatch();

  const photos = useSelector((state) => state.registerRoom.photos);

  const uploadImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const file = files[0];
      const formdata = new FormData();
      formdata.append("file", file);
      try {
        const { data } = await uploadFileAPI(formdata);
        if (data) {
          dispatch(registerRoomActions.setPhotos([...photos, data]));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Container>
      <h2>숙소 사진 올리기</h2>
      <h3>7단계</h3>
      <p className="register-room-step-info">
        게스트가 사진을 보고 숙소의 느낌을 생생히 떠올려볼 수 있도록 해주세요.
        우선 사진 1장을 업로드하고 숙소를 등록한 후에 추가할 수 있습니다.
      </p>
      {isEmpty(photos) && (
        <div className="register-room-upload-photo-wrapper">
          <>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={uploadImages}
            />
            <Button icon={<UploadIcon />}>사진 업로드</Button>
          </>
        </div>
      )}
      {!isEmpty(photos) && <RegisterRoomPhotoCardList photos={photos} />}
      <RegisterRoomFooter
        prevHref="/room/register/conveniences"
        nextHref="/room/register/description"
        isAllValueFilled
      />
    </Container>
  );
};

export default RegisterRoomPhoto;
