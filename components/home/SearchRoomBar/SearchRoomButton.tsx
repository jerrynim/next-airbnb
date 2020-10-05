import React from "react";
import Link from "next/link";
import { makeQueryString } from "../../../lib/utils";
import { useSelector } from "../../../store";
import Button from "../../common/button/Button";
import SearchIcon from "../../../public/static/svg/button/white_search.svg";

const SearchRoomButton: React.FC = () => {
  const searchRoom = useSelector((state) => state.searchRoom);

  const roomListHref = makeQueryString("/room", searchRoom);

  return (
    <Link href={roomListHref}>
      <a>
        <Button icon={<SearchIcon />}>검색</Button>
      </a>
    </Link>
  );
};

export default SearchRoomButton;
