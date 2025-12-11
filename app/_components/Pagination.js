import Link from "next/link";
/**
 * Generate pagination page numbers centered around current page
 * @param {number} postCount - total number of posts
 * @param {number} limit - posts per page
 * @param {number} current - current page (0-indexed)
 * @return {Array<number>} array of page numbers to display
 */
function getPaginationPages(postCount, limit, current) {
  const totalPages = Math.max(1, Math.ceil(postCount / limit));
  const maxPagesToShow = 5; // current + 3 left + 3 right

  // If total pages is less than max, show all pages
  if (totalPages <= maxPagesToShow) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  // Calculate initial range
  let start = Math.max(0, current - 3);
  let end = Math.min(totalPages - 1, current + 3);

  // Adjust to maintain window size of 7 pages when possible
  const currentRange = end - start + 1;
  if (currentRange < maxPagesToShow) {
    if (start === 0) {
      // At the beginning, extend to the right
      end = Math.min(totalPages - 1, start + maxPagesToShow - 1);
    } else if (end === totalPages - 1) {
      // At the end, extend to the left
      start = Math.max(0, end - maxPagesToShow + 1);
    }
  }

  // Generate array of page numbers
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function Pagination({ path, postCount, limit, current }) {
  const last = Math.max(0, Math.floor((postCount + limit - 1) / limit) - 1);
  return (
    <nav className="mt-5">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <Link className="page-link" href={path + "/0"}>
            First
          </Link>
        </li>
        <li className={current == 0 ? "page-item disabled" : "page-item"}>
          <Link className="page-link" href={path + "/" + (Number(current) - 1)}>
            &larr;
          </Link>
        </li>
        {getPaginationPages(postCount, limit, current).map((num) => (
          <li
            className={current == num ? "page-item active" : "page-item"}
            key={num}
          >
            <Link className="page-link" href={path + "/" + num}>
              {num + 1}
            </Link>
          </li>
        ))}
        <li className={current == last ? "page-item disabled" : "page-item"}>
          <Link className="page-link" href={path + "/" + (Number(current) + 1)}>
            &rarr;
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" href={path + "/" + last}>
            Last
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
