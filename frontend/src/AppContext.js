import React, { createContext, useEffect, useState } from "react";

import { ALL_RESOURCES_URL, FIRST_PAGE_RESOURCES_URL } from "./constants";

export const Context = createContext();

export function slugify(text) {
  return text.toLowerCase().replaceAll(/\s/g, "-");
}

export function ContextProvider({ children }) {
  const [allResources, setAllResources] = useState([]);
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("bookmarks");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [bookmarkGroups, setBookmarkGroups] = useState(() => {
    const saved = localStorage.getItem("bookmarkGroups");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [pageTitle, setPageTitle] = useState("Coding Resource Finder");
  const [renderedResources, setRenderedResources] = useState([]);
  const [hasFetchError, setHasFetchError] = useState(false);
  const [resourceFilter, setResourceFilter] = useState("all");

  useEffect(() => {
    updateBookmarksLocalStorage();
  }, [bookmarks]);

  useEffect(() => {
    updateBookmarkGroupsLocalStorage();
  }, [bookmarkGroups]);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  useEffect(() => {
    getAndSetInitialResources();
    // eslint-disable-next-line
  }, []);

  async function getAndSetInitialResources() {
    const responseData = await Promise.all([
      getFirstPageOfResources(FIRST_PAGE_RESOURCES_URL),
      getAllResources(ALL_RESOURCES_URL),
    ]);
    const [firstPageResourcesResponse, allResourcesResponse] = responseData;
    setRenderedResources(firstPageResourcesResponse);
    setAllResources(allResourcesResponse);
  }

  async function getAllResources(url) {
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      const allResources = await responseData.data;
      return allResources;
    } catch (error) {
      setHasFetchError(true);
      console.log(error);
    }
  }

  async function getFirstPageOfResources(url) {
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      const firstPageResources = await responseData.data;
      return firstPageResources;
    } catch (error) {
      setHasFetchError(true);
      console.log(error);
    }
  }

  function addBookmarkGroupReusable({ bookmarkGroup }) {
    const foundBookmarkGroup = bookmarkGroups.find(
      (group) => group.name === bookmarkGroup
    );
    const isInitialBookmarkGroup = window.location.pathname === "/bookmarks";
    setBookmarkGroups((prevBookmarkGroups) => {
      if (!foundBookmarkGroup) {
        return [
          ...prevBookmarkGroups,
          {
            name: bookmarkGroup,
            count: isInitialBookmarkGroup ? 0 : 1,
            link: slugify(bookmarkGroup),
          },
        ];
      } else {
        return prevBookmarkGroups.map((prevBookmarkGroup) => {
          if (prevBookmarkGroup.name === bookmarkGroup) {
            return {
              name: bookmarkGroup,
              count: prevBookmarkGroup.count + 1,
              link: slugify(bookmarkGroup),
            };
          } else {
            return prevBookmarkGroup;
          }
        });
      }
    });
  }

  function addBookmark({ resource, bookmarkGroup = "super" }) {
    // if bookmark does not exist
    // - add bookmark to bookmarks
    // - add that bookmarkGroup to resource's groups
    // - add bookmarkGroup to bookmarkGroups
    // if bookmark does exist
    // - if resource's groups don't have bookmarkGroup
    //  - add that bookmarkGroup to resource's groups
    //  - add bookmarkGroup to bookmarkGroups

    const foundBookmark = bookmarks.find(
      (bookmark) => bookmark.url === resource.url
    );

    if (!foundBookmark) {
      const newBookmark = resource;
      newBookmark.groups = [...newBookmark.groups, bookmarkGroup];

      setBookmarks((prevBookmarks) => [...prevBookmarks, newBookmark]);

      addBookmarkGroupReusable({ bookmarkGroup });
    } else {
      if (!foundBookmark.groups.includes(bookmarkGroup)) {
        foundBookmark.groups = [...foundBookmark.groups, bookmarkGroup];
        setBookmarks((prevBookmarks) => {
          const newBookmarks = prevBookmarks.filter(
            (prevBookmark) => prevBookmark.url !== foundBookmark.url
          );
          return [...newBookmarks, foundBookmark];
        });

        addBookmarkGroupReusable({ bookmarkGroup });
      }
    }
  }

  function removeBookmarkGroupReusable({ bookmarkGroup }) {
    const foundBookmarkGroup = bookmarkGroups.find(
      (group) => group.name === bookmarkGroup
    );

    setBookmarkGroups((prevBookmarkGroups) => {
      if (foundBookmarkGroup.count > 0) {
        return prevBookmarkGroups.map((prevBookmarkGroup) => {
          if (prevBookmarkGroup.name === bookmarkGroup) {
            return {
              name: bookmarkGroup,
              count: prevBookmarkGroup.count - 1,
            };
          } else {
            return prevBookmarkGroup;
          }
        });
      } else {
        return prevBookmarkGroups;
      }
    });
  }

  function removeBookmark({ bookmark, bookmarkGroup = "bookmarks" }) {
    // - if bookmark groups includes bookmarkGroup
    //  - remove that bookmarkGroup to bookmark's groups
    //  - remove bookmark from bookmarks
    //  - remove bookmarkGroup to bookmarkGroups

    if (bookmark.groups.includes(bookmarkGroup)) {
      bookmark.groups = bookmark.groups.filter(
        (group) => group !== bookmarkGroup
      );

      setBookmarks((prevBookmarks) => {
        if (bookmark.groups.length > 0) {
          return prevBookmarks.map((prevBookmark) => {
            if (prevBookmark.url === bookmark.url) {
              return bookmark;
            } else {
              return prevBookmark;
            }
          });
        } else {
          return prevBookmarks.filter(
            (prevBookmark) => prevBookmark.url !== bookmark.url
          );
        }
      });

      removeBookmarkGroupReusable({ bookmarkGroup });
    }
  }

  function clearBookmarkGroup({ bookmarkGroup }) {
    // - reset bookmarkGroup count in bookmarkGroups
    // - filter out bookgroup in groups of all bookmarks

    setBookmarkGroups((prevBookmarkGroups) => {
      return prevBookmarkGroups.map((group) => {
        console.log(group);
        if (group.name === bookmarkGroup) {
          return { ...group, count: 0, link: slugify(group.name) };
        }
        return group;
      });
    });

    setBookmarks((prevBookmarks) => {
      const newBookmarks = [];
      prevBookmarks.forEach((bookmark) => {
        if (bookmark.groups.includes(bookmarkGroup)) {
          bookmark.groups = bookmark.groups.filter((b) => b !== bookmarkGroup);
          if (bookmark?.groups.length) {
            newBookmarks.push(bookmark);
          }
        } else {
          if (bookmark?.groups.length) {
            newBookmarks.push(bookmark);
          }
        }
      });
      return newBookmarks;
    });
  }
  function deleteBookmarkGroup({ bookmarkGroup }) {
    // - clearBookmarkGroup(...)
    // - remove bookmarkGroup from bookmarkGroups

    clearBookmarkGroup({ bookmarkGroup });

    setBookmarkGroups((prevBookmarkGroups) => {
      return prevBookmarkGroups.filter((group) => group.name !== bookmarkGroup);
    });
  }

  function editBookmarkGroup({ oldBookmarkGroup, newBookmarkGroup }) {
    // - update all bookmarks groups with oldBookmarkGroup to newBookmarkGroup
    // - update oldBookmarkGroup in bookmarkGroups with newBookmarkGroup

    setBookmarks((prevBookmarks) => {
      return prevBookmarks.map((bookmark) => {
        if (bookmark.groups.includes(oldBookmarkGroup)) {
          bookmark.groups = bookmark.groups.filter(
            (g) => g !== oldBookmarkGroup
          );
          bookmark.groups.push(newBookmarkGroup);
          return bookmark;
        }
        return bookmark;
      });
    });

    setBookmarkGroups((prevBookmarkGroups) => {
      return prevBookmarkGroups.map((bookmarkGroup) => {
        if (bookmarkGroup.name === oldBookmarkGroup) {
          return {
            ...bookmarkGroup,
            name: newBookmarkGroup,
            link: slugify(newBookmarkGroup),
          };
        }
        return bookmarkGroup;
      });
    });
  }

  function updateBookmarksLocalStorage() {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  function updateBookmarkGroupsLocalStorage() {
    localStorage.setItem("bookmarkGroups", JSON.stringify(bookmarkGroups));
  }

  return (
    <Context.Provider
      value={{
        allResources,
        setAllResources,
        getAllResources,
        renderedResources,
        setRenderedResources,
        bookmarks,
        addBookmark,
        setBookmarks,
        removeBookmark,
        searchTerm,
        setSearchTerm,
        setPageTitle,
        hasFetchError,
        resourceFilter,
        setResourceFilter,
        bookmarkGroups,
        addBookmarkGroupReusable,
        clearBookmarkGroup,
        deleteBookmarkGroup,
        editBookmarkGroup,
      }}
    >
      {children}
    </Context.Provider>
  );
}
