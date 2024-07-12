import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

type PaginationControlProps = {
  currentPage: number;
  onClick: (direction: 'next' | 'previous') => void;
  totalNumberOfPages: number;
};

export default function PaginationControls({
  onClick,
  currentPage,
  totalNumberOfPages,
}: PaginationControlProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PageinationButton
          direction={'previous'}
          currentPage={currentPage}
          onClick={() => onClick('previous')}
        />
      )}
      {currentPage < totalNumberOfPages && (
        <PageinationButton
          direction={'next'}
          currentPage={currentPage}
          onClick={() => onClick('next')}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: 'next' | 'previous';
  currentPage: number;
  onClick: () => void;
};

function PageinationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === 'previous' && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}
      {direction === 'next' && (
        <>
          <ArrowRightIcon />
          Page {currentPage + 1}
        </>
      )}
    </button>
  );
}
