import Link from "next/link";

function Pagination() {
  return (
    <nav className="mt-5">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <Link className="page-link" href="#">
            First
          </Link>
        </li>
        <li className="page-item disabled">
          <Link className="page-link" href="#">
            Prev
          </Link>
        </li>
        <li className="page-item active">
          <Link className="page-link" href="#">
            1
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" href="#">
            Next
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" href="#">
            Last
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
