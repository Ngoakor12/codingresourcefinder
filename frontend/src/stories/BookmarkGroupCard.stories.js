import React from "react";
import BookmarkGroupCard from "../components/BookmarkGroupCard/BookmarkGroupCard";

export default {
  title: "components/BookmarkGroupCard",
  component: BookmarkGroupCard,
};

export const Default = (args) => <BookmarkGroupCard {...args} />;

Default.args = {
  bookmarkGroup: {
    name: "A Visual History of Nobel Prize Winners",
    count: "10",
    link: "",
  },
};
