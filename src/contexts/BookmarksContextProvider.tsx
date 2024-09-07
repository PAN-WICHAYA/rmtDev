import React, { createContext } from 'react';
import { useJobItems, useLocalStorage } from '../lib/hooks';
import { JobItemExpanded } from '../lib/types';

type BookmarksContext = {
  handleToggleBookmark: (id: number) => void;
  bookmarkIds: number[];
  bookmarkedJobItems: JobItemExpanded[];
  isLoading: boolean;
};

export const BookmarksContext = createContext<BookmarksContext | null>(null);

export default function BookmarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookmarkIds, setBookmarkIds] = useLocalStorage<number[]>(
    'bookmarkIds',
    []
  );
  const { jobItems: bookmarkedJobItems, isLoading } = useJobItems(bookmarkIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkIds.includes(id)) {
      setBookmarkIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        handleToggleBookmark,
        bookmarkIds,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
