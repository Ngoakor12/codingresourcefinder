import React, { useEffect, useContext, useState } from "react";

import { Context, slugify } from "../../AppContext";
import ResourceList from "../../components/ResourceList/ResourceList";
import GoToTopButton from "../../components/Buttons/GoToTopButton";
import Nav from "../../components/Nav/Nav";
import Header from "../../components/Header/Header";
import BookmarkGroupDetailsHeader from "../../components/BookmarkGroupDetailsHeader/BookmarkGroupDetailsHeader";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import EditBookmarkGroupModal from "../../components/EditBookmarkGroupModal/EditBookmarkGroupModal";

// TODO: be able to dismiss confirm modals by pressing "esc" key
// TODO: disable keyboard navigation for elements under modal overlay
// TODO: be able focus on the modal after opening it

export default function BookmarkGroup() {
  const {
    bookmarks,
    setPageTitle,
    bookmarkGroups,
    clearBookmarkGroup,
    deleteBookmarkGroup,
    editBookmarkGroup,
  } = useContext(Context);
  const { group } = useParams();
  const [foundBookmarkGroup, setFoundBookmarkGroup] = useState(() => {
    return (
      bookmarkGroups.find((b) => b.link === group) || {
        name: "",
        count: 0,
        link: "link",
      }
    );
  });
  const navigate = useNavigate();
  const [deleteBookmarkGroupModalOpen, setDeleteBookmarkGroupModalOpen] =
    useState(false);
  const [deleteBookmarkGroupConfirm, setDeleteBookmarkGroupConfirm] =
    useState(false);
  const [clearBookmarkGroupModalOpen, setClearBookmarkGroupModalOpen] =
    useState(false);
  const [clearBookmarkGroupConfirm, setClearBookmarkGroupConfirm] =
    useState(false);
  const [editBookmarkGroupModalOpen, setEditBookmarkGroupModalOpen] =
    useState(false);
  const [bookmarkGroupInput, setBookmarkGroupInput] = useState(
    foundBookmarkGroup?.name
  );

  useEffect(() => {
    setPageTitle("Bookmarks | Coding Resource Finder");
    // eslint-disable-next-line
  }, []);

  // delete bookmark group bookmarks
  function handleClickDeleteBookmarkGroup() {
    setDeleteBookmarkGroupModalOpen(true);
  }

  function handleClickDeleteConfirmBookmarkGroup() {
    setDeleteBookmarkGroupConfirm(true);
    setDeleteBookmarkGroupModalOpen(false);
  }

  function handleClickDeleteCancelBookmarkGroup(e) {
    const eventTarget = e.target;

    // close modal on specific clicks - cancel button and outer modal click
    if (
      eventTarget.innerText === "Cancel" ||
      eventTarget.className === "prompt-modal-container"
    ) {
      setDeleteBookmarkGroupModalOpen(false);
      setDeleteBookmarkGroupConfirm(false);
    }
  }

  // clear bookmark group
  function handleClickClearBookmarkGroup() {
    setClearBookmarkGroupModalOpen(true);
  }

  function handleClickClearConfirmBookmarkGroup() {
    setClearBookmarkGroupConfirm(true);
    setClearBookmarkGroupModalOpen(false);
  }

  function handleClickClearCancelBookmarkGroup(e) {
    const eventTarget = e.target;

    // close modal on specific clicks - cancel button and outer modal click
    if (
      eventTarget.innerText === "Cancel" ||
      eventTarget.className === "prompt-modal-container"
    ) {
      setClearBookmarkGroupModalOpen(false);
      setClearBookmarkGroupConfirm(false);
    }
  }

  // edit bookmark group name
  function handleClickEditBookmarkGroupOpen() {
    console.log("clicked!");
    setEditBookmarkGroupModalOpen(true);
  }

  function handleClickEditBookmarkGroupClose(e) {
    const eventTarget = e.target;

    // close modal on specific clicks - cancel button and outer modal click
    if (
      eventTarget.innerText === "Cancel" ||
      eventTarget.className === "base-modal-container"
    )
      setEditBookmarkGroupModalOpen(false);
  }

  function handleClickEditBookmarkGroupSubmit(e) {
    e.preventDefault();

    if (bookmarkGroupInput.trim() !== foundBookmarkGroup.name) {
      editBookmarkGroup({
        oldBookmarkGroup: foundBookmarkGroup.name,
        newBookmarkGroup: bookmarkGroupInput,
      });
      setEditBookmarkGroupModalOpen(false);
      navigate(`/bookmarks/${slugify(bookmarkGroupInput)}`);
    }
  }

  function handleChangeBookmarkGroup(e) {
    setBookmarkGroupInput(e.target.value);
  }

  useEffect(() => {
    if (deleteBookmarkGroupConfirm) {
      deleteBookmarkGroup({ bookmarkGroup: foundBookmarkGroup.name });
      navigate(`/bookmarks`);
    }
  }, [deleteBookmarkGroupConfirm]);

  useEffect(() => {
    if (clearBookmarkGroupConfirm) {
      clearBookmarkGroup({ bookmarkGroup: foundBookmarkGroup.name });
    }
  }, [clearBookmarkGroupConfirm]);

  useEffect(() => {
    setFoundBookmarkGroup(() => bookmarkGroups.find((b) => b.link === group));
  }, [group]);

  if (!foundBookmarkGroup) return <p>loading...</p>;

  return (
    <React.Fragment>
      {deleteBookmarkGroupModalOpen && (
        <ConfirmModal
          prompt={`Are you sure you want to delete "${group}" group?`}
          handleConfirm={handleClickDeleteConfirmBookmarkGroup}
          handleCancel={(e) => handleClickDeleteCancelBookmarkGroup(e)}
        />
      )}
      {clearBookmarkGroupModalOpen && (
        <ConfirmModal
          prompt={`Are you sure you want to clear "${group}" group?`}
          handleConfirm={handleClickClearConfirmBookmarkGroup}
          handleCancel={(e) => handleClickClearCancelBookmarkGroup(e)}
        />
      )}
      {editBookmarkGroupModalOpen && (
        <EditBookmarkGroupModal
          handleClickCancel={(e) => handleClickEditBookmarkGroupClose(e)}
          handleClickSubmit={(e) => handleClickEditBookmarkGroupSubmit(e)}
          open={editBookmarkGroupModalOpen}
          input={bookmarkGroupInput}
          handleChangeInput={handleChangeBookmarkGroup}
        />
      )}
      <GoToTopButton />
      <Header />
      <main className="main">
        <aside className="aside-nav">
          <Nav />
        </aside>
        <section className="main-content">
          <section className="resource-list">
            <React.Fragment>
              <BookmarkGroupDetailsHeader
                bookmarkGroups={bookmarkGroups}
                heading={foundBookmarkGroup?.name}
                count={foundBookmarkGroup?.count}
                handleClickClearBookmarkGroup={handleClickClearBookmarkGroup}
                handleClickDeleteBookmarkGroup={handleClickDeleteBookmarkGroup}
                handleClickEditBookmarkGroup={handleClickEditBookmarkGroupOpen}
              />
              <div className="resources-list">
                {bookmarks.length ? (
                  <ResourceList
                    resources={bookmarks.filter((b) =>
                      b.groups.includes(foundBookmarkGroup.name)
                    )}
                    isBookmarksPage={true}
                    bookmarkGroup={foundBookmarkGroup.name}
                  />
                ) : (
                  <h2 className="content-placeholder">No bookmarks yet...</h2>
                )}
              </div>
            </React.Fragment>
          </section>
        </section>
      </main>
    </React.Fragment>
  );
}
