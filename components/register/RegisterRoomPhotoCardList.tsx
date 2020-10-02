import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { uploadFileAPI } from "../../lib/api/file";
import PencilIcon from "../../public/static/svg/register/photo/pencil.svg";
import TrashCanIcon from "../../public/static/svg/register/photo/trash_can.svg";
import GrayPlusIcon from "../../public/static/svg/register/photo/gray_plus.svg";
import palette from "../../styles/palette";
import { registerRoomActions } from "../../store/registerRoom";

const Container = styled.ul`
  width: 858px;
  margin: auto;
  .register-room-first-photo-wrapper {
    width: 858px;
    height: 433px;
    margin: 0 auto 24px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    overflow: hidden;
    &:hover {
      .register-room-photo-interaction-buttons {
        display: flex;
      }
    }
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

  li:nth-child(3n + 1) {
    margin-right: 0;
  }
  .register-room-photo-card {
    position: relative;
    display: inline-block;
    width: calc((100% - 48px) / 3);
    height: 180px;
    border-radius: 6px;

    overflow: hidden;
    margin-right: 24px;
    margin-bottom: 24px;

    &:hover {
      .register-room-photo-interaction-buttons {
        display: flex;
      }
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  /** 사진 추가하기 카드 */
  .register-room-add-more-photo-card {
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 2px dashed ${palette.gray_bb};
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    margin-right: 24px;
    margin-bottom: 24px;
    display: flex;

    svg {
      margin-bottom: 12px;
    }
  }
  /** 수정,삭제 버튼 */
  .register-room-photo-interaction-buttons {
    display: none;
    position: absolute;
    top: 8px;
    right: 8px;
    button {
      width: 48px;
      height: 48px;
      background-color: white;
      border-radius: 50%;
      cursor: pointer;
      border: 0;
      outline: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
      &:first-child {
        margin-right: 8px;
      }
    }
  }
`;
interface IProps {
  photos: string[];
}

const RegisterRoomPhotoCardList: React.FC<IProps> = ({ photos }) => {
  const dispatch = useDispatch();

  //* 사진 삭제하기
  const editPhoto = (index: number) => {
    const el = document.createElement("input");
    el.type = "file";

    el.onchange = (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        uploadFileAPI(formData)
          .then(({ data }) => {
            const newPhotos = [...photos];
            newPhotos[index] = data;
            dispatch(registerRoomActions.setPhotos(newPhotos));
          })
          .catch((e) => console.log(e.message));
      }
    };
    el.click();
  };

  //* 사진 삭제하기
  const deletePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    dispatch(registerRoomActions.setPhotos(newPhotos));
  };

  //* 사진 추가하기
  const addPhoto = () => {
    const el = document.createElement("input");
    el.type = "file";
    el.accept = "image/*";
    el.onchange = (event) => {
      const { files } = event.target as HTMLInputElement;
      if (files && files.length > 0) {
        const file = files[0];
        const formData = new FormData();
        formData.append("file", file);
        uploadFileAPI(formData)
          .then(({ data }) => {
            dispatch(registerRoomActions.setPhotos([...photos, data]));
          })
          .catch((e) => console.log(e));
      }
    };

    el.click();
  };

  return (
    <Container>
      {photos.map((photo, index) => (
        <React.Fragment key={index}>
          {index === 0 && (
            <li className="register-room-first-photo-wrapper">
              <img src={photo} alt="" />
              <div className="register-room-photo-interaction-buttons">
                <button
                  type="button"
                  onClick={() => {
                    deletePhoto(index);
                  }}
                >
                  <TrashCanIcon />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editPhoto(index);
                  }}
                >
                  <PencilIcon />
                </button>
              </div>
            </li>
          )}
          {index !== 0 && (
            <li className="register-room-photo-card">
              <img src={photo} alt="" />
              <div className="register-room-photo-interaction-buttons">
                <button
                  type="button"
                  onClick={() => {
                    deletePhoto(index);
                  }}
                >
                  <TrashCanIcon />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editPhoto(index);
                  }}
                >
                  <PencilIcon />
                </button>
              </div>
            </li>
          )}
        </React.Fragment>
      ))}
      <li
        className="register-room-photo-card"
        role="presentation"
        onClick={addPhoto}
      >
        <div className="register-room-add-more-photo-card">
          <GrayPlusIcon />
          추가하기
        </div>
      </li>
    </Container>
  );
};

export default RegisterRoomPhotoCardList;
