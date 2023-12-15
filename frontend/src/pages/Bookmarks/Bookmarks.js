import React, { useEffect, useContext, useState, useRef } from "react";

import { Context } from "../../AppContext";
import ClearBookmarksButton from "../../components/Buttons/ClearBookmarksButton";
import ResourceList from "../../components/ResourceList/ResourceList";
import GoToTopButton from "../../components/Buttons/GoToTopButton";
import Nav from "../../components/Nav/Nav";
import Header from "../../components/Header/Header";
import BookmarkGroupCard from "../../components/BookmarkGroupCard/BookmarkGroupCard";
import AddBookmarkGroupButton from "../../components/Buttons/AddBookmarkGroupButton";
import NewBookmarkGroupModal from "../../components/NewBookmarkGroupModal/NewBookmarkGroupModal";

export default function Bookmarks() {
  const { bookmarks, setPageTitle, bookmarkGroups, addBookmarkGroupReusable } =
    useContext(Context);
  const [newBookmarkGroupModalOpen, setNewBookmarkGroupModalOpen] =
    useState(false);
  const [bookmarkGroupInput, setBookmarkGroupInput] = useState("");

  useEffect(() => {
    setPageTitle("Bookmarks | Coding Resource Finder");
    // eslint-disable-next-line
  }, []);

  function handleClickNewBookmarkGroupOpen() {
    console.log("clicked!");
    setNewBookmarkGroupModalOpen(true);
  }

  function handleClickNewBookmarkGroupClose(e) {
    const eventTarget = e.target;
    console.log("clicked cancel!", e);
    // close modal on specific clicks - cancel button and outer modal click
    if (
      eventTarget.innerText === "Cancel" ||
      eventTarget.className === "base-modal-container"
    )
      setNewBookmarkGroupModalOpen(false);
  }

  function handleClickNewBookmarkGroupSubmit(e) {
    e.preventDefault();
    console.log("clicked submit!", e);
    console.log("group", bookmarkGroupInput);
    if (!bookmarkGroups.includes(bookmarkGroupInput.trim())) {
      addBookmarkGroupReusable({ bookmarkGroup: bookmarkGroupInput });
      console.log(
        "successfully added bookmark group",
        bookmarkGroupInput,
        bookmarkGroups
      );
    } else {
      console.log(
        "failed adding bookmark group",
        bookmarkGroupInput,
        bookmarkGroups
      );
    }
    setNewBookmarkGroupModalOpen(false);
  }

  function handleChangeBookmarkGroup(e) {
    setBookmarkGroupInput(e.target.value);
  }

  return (
    <React.Fragment>
      <GoToTopButton />
      <Header />
      {newBookmarkGroupModalOpen && (
        <NewBookmarkGroupModal
          handleClickCancel={(e) => handleClickNewBookmarkGroupClose(e)}
          handleClickSubmit={(e) => handleClickNewBookmarkGroupSubmit(e)}
          open={newBookmarkGroupModalOpen}
          input={bookmarkGroupInput}
          handleChangeInput={handleChangeBookmarkGroup}
        />
      )}
      <main className="main">
        <aside className="aside-nav">
          <Nav />
        </aside>
        <section className="main-content">
          <section className="resource-list">
            <React.Fragment>
              <AddBookmarkGroupButton
                handleClick={handleClickNewBookmarkGroupOpen}
              />
              {bookmarkGroups.length ? (
                bookmarkGroups.map((group) => (
                  <BookmarkGroupCard bookmarkGroup={group} />
                ))
              ) : (
                <h2 className="content-placeholder">No bookmarks yet...</h2>
              )}
            </React.Fragment>
          </section>
        </section>
      </main>
    </React.Fragment>
  );
}
