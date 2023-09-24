import React, { useEffect, useContext, useState } from "react";

import { Context } from "../../AppContext";
import ResourceList from "../../components/ResourceList/ResourceList";
import GoToTopButton from "../../components/Buttons/GoToTopButton";
import Nav from "../../components/Nav/Nav";
import Header from "../../components/Header/Header";
import BookmarkGroupDetailsHeader from "../../components/BookmarkGroupDetailsHeader/BookmarkGroupDetailsHeader";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

export default function BookmarkGroup() {
  const {
    bookmarks,
    setPageTitle,
    bookmarkGroups,
    clearBookmarkGroup,
    deleteBookmarkGroup,
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

  useEffect(() => {
    setPageTitle("Bookmarks | Coding Resource Finder");
    // eslint-disable-next-line
  }, []);

  function handleClickClearBookmarkGroup(group) {
    clearBookmarkGroup({ bookmarkGroup: group });
  }

  function handleClickDeleteBookmarkGroup() {
    setDeleteBookmarkGroupModalOpen(true);
  }

  function handleClickDeleteConfirmBookmarkGroup() {
    setDeleteBookmarkGroupConfirm(true);
    setDeleteBookmarkGroupModalOpen(false);
  }

  function handleClickDeleteCancelBookmarkGroup() {
    setDeleteBookmarkGroupModalOpen(false);
    setDeleteBookmarkGroupConfirm(false);
  }

  useEffect(() => {
    if (deleteBookmarkGroupConfirm) {
      deleteBookmarkGroup({ bookmarkGroup: foundBookmarkGroup.name });
      navigate(`/bookmarks`);
    }
  }, [deleteBookmarkGroupConfirm]);

  useEffect(() => {
    setFoundBookmarkGroup(() => bookmarkGroups.find((b) => b.link === group));
  }, [group]);

  console.log(foundBookmarkGroup, group);

  return (
    <React.Fragment>
      {deleteBookmarkGroupModalOpen && (
        <ConfirmModal
          confirm={setDeleteBookmarkGroupConfirm}
          prompt={`Are you sure you want to delete "${group}" group?`}
          handleConfirm={handleClickDeleteConfirmBookmarkGroup}
          handleCancel={handleClickDeleteCancelBookmarkGroup}
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
                heading={foundBookmarkGroup.name}
                count={foundBookmarkGroup.count}
                handleClickClearBookmarkGroup={handleClickClearBookmarkGroup}
                handleClickDeleteBookmarkGroup={handleClickDeleteBookmarkGroup}
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
