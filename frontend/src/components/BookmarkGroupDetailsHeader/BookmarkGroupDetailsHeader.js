import React from "react";
import { backArrowIcon } from "../../svgs";
import { Link } from "react-router-dom";
import { CLIENT_BASE_URL } from "../../constants";
import { slugify } from "../../AppContext";

export default function BookmarkGroupDetailsHeader({
  heading,
  bookmarkGroups,
  handleClickClearBookmarkGroup,
  handleClickDeleteBookmarkGroup,
  handleClickEditBookmarkGroup,
  count,
}) {
  return (
    <div className="bookmark-group-details-header">
      <div className="bookmark-group-details-header-first-row">
        <div className="bookmark-group-details-header-left">
          <Link
            to={`${CLIENT_BASE_URL}/bookmarks`}
            className="bookmark-group-details-header-back"
          >
            {backArrowIcon}
          </Link>
          <h2 className="bookmark-group-details-header-heading">{heading}</h2>
        </div>
        <div className="bookmark-group-details-header-right">
          <button
            className="bookmark-group-details-header-edit"
            onClick={handleClickEditBookmarkGroup}
          >
            Edit
          </button>
          <button
            className="bookmark-group-details-header-clear"
            onClick={handleClickClearBookmarkGroup}
            disabled={!count}
          >
            Clear
          </button>
          <button
            className="bookmark-group-details-header-delete"
            onClick={handleClickDeleteBookmarkGroup}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="bookmark-group-details-header-second-row">
        {bookmarkGroups.map((group) => {
          return (
            <Link
              to={`${CLIENT_BASE_URL}/bookmarks/${slugify(group.name)}`}
              style={{ textDecoration: "none", color: "#f1f1f1" }}
              className={`chip ${group.name.includes(heading) ? "active" : ""}`}
            >
              {`${group.name}(${group.count})`}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
