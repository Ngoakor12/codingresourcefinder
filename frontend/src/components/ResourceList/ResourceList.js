import React from "react";
import { nanoid } from "nanoid";

import Resource from "../Resource/Resource";

export default function ResourceList({
  resources,
  isBookmarksPage,
  bookmarkGroup,
}) {
  return (
    <div className="resource-list">
      {resources.map((resource) => (
        <Resource
          resource={resource}
          isBookmarksPage={isBookmarksPage}
          key={nanoid()}
          bookmarkGroup={bookmarkGroup}
        />
      ))}
    </div>
  );
}
