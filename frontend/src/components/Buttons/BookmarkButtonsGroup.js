import React, { useContext } from "react";
import { expandIcon } from "../../svgs";
import { Context } from "../../AppContext";
import { bookmarkIcon } from "../../svgs";

export default function BookmarkButtonsGroup() {
  const { addBookmark } = useContext(Context);

  // function handleClick() {
  //   addBookmark(resource.url);
  // }
  return (
    <div className="bookmark-buttons-group">
      <button
        type="button"
        className={"bookmark-buttons-group-bookmark"}
        // onClick={handleClick}
        title="add bookmark"
      >
        {bookmarkIcon}
      </button>
      <button
        type="button"
        className={"bookmark-buttons-group-expand"}
        title="add bookmark to group"
      >
        {expandIcon}
      </button>
    </div>
  );
}
