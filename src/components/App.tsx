import { useState } from 'react';
import Background from './Background';
import Container from './Container';
import Footer from './Footer';
import Header, { HeaderTop } from './Header';
import Logo from './Logo';
import BookmarksButton from './BookmarksButton';
import SearchForm from './SearchForm';
import JobItemContent from './JobItemContent';
import Sidebar, { SidebarTop } from './Sidebar';
import ResultsCount from './ResultsCount';
import JobList from './JobList';

import SortingControls from './SortingControls';
import { useDebounce, useJobItems } from '../lib/hooks';
import { Toaster } from 'react-hot-toast';
import PaginationControls from './PaginationControls';

function App() {
  // State
  const [searchText, setSearchText] = useState('');
  const deBounceSearchText = useDebounce(searchText, 250);
  const { jobItems, isLoading } = useJobItems(deBounceSearchText);
  const [currentPage, setCurrentPage] = useState(1);

  // derived state
  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResults / 7;
  const jobItemsSliced =
    jobItems?.slice(7 * currentPage - 7, currentPage * 7) || [];

  // event handlers
  const handleChangePage = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === 'previous') {
      setCurrentPage((prev) => prev - 1);
    }
  };
  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm
          searchText={searchText}
          onSearchTextChange={setSearchText}
        />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfResults={totalNumberOfResults} />
            <SortingControls />
          </SidebarTop>
          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />
          <PaginationControls
            onClick={handleChangePage}
            currentPage={currentPage}
            totalNumberOfPages={totalNumberOfPages}
          />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
