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
import PaginationControls from './PaginationControls';
import SortingControls from './SortingControls';
import { useJobItems } from '../lib/hooks';

function App() {
  const [searchText, setSearchText] = useState('');
  const [jobItems, isLoading] = useJobItems(searchText);

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
            <ResultsCount />
            <SortingControls />
          </SidebarTop>
          <JobList jobItems={jobItems} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
