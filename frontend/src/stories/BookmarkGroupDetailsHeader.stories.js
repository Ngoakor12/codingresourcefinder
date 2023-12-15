import React from "react";
import BookmarkGroupDetailsHeader from "../components/BookmarkGroupDetailsHeader/BookmarkGroupDetailsHeader";

export default {
  title: "components/BookmarkGroupDetailsHeader",
  component: BookmarkGroupDetailsHeader,
};

export const Default = (args) => <BookmarkGroupDetailsHeader {...args} />;

Default.args = {
  heading: "All bookmarks",
  bookmarkGroups: [
    {
      name: "All bookmarks",
      count: 10,
      link: "",
    },
    {
      name: "Frontend revision",
      count: 4,
      link: "",
    },
    {
      name: "React native",
      count: 7,
      link: "",
    },
  ],
};
