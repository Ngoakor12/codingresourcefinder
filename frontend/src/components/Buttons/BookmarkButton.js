import React from "react";
import { useContext } from "react";

import { Context } from "../../AppContext";
import { bookmarkIcon } from "../../svgs";

export default function BookmarkButton({ resource, bookmarkGroup }) {
  const { addBookmark } = useContext(Context);

  function handleClick() {
    addBookmark({ resource, bookmarkGroup });
  }

  return (
    <button
      type="button"
      className={"bookmark-button"}
      onClick={handleClick}
      title="add bookmark"
    >
      {bookmarkIcon}
    </button>
  );
}
