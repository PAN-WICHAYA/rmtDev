import React, { createContext } from 'react';
import { useLocalStorage } from '../lib/hooks';

type BookmarksContext = {
  handleToggleBookmark: (id: number) => void;
  bookmarkIds: number[];
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

  const handleToggleBookmark = (id: number) => {
    if (bookmarkIds.includes(id)) {
      setBookmarkIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarkIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider value={{ handleToggleBookmark, bookmarkIds }}>
      {children}
    </BookmarksContext.Provider>
  );
}
