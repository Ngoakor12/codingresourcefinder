import React from "react";
import { Link } from "react-router-dom";

import Card from "../Card/Card";
import { slugify } from "../../AppContext";

export default function BookmarkGroupCard({ bookmarkGroup }) {
  const { name, count } = bookmarkGroup;
  return (
    <Link to={`/bookmarks/${slugify(name)}`} className={"bookmark-group-card"}>
      <Card fullWidth={true}>
        <p className="bookmark-group-card-title">{name}</p>
        <p className="bookmark-group-card-count">{count}</p>
      </Card>
    </Link>
  );
}
