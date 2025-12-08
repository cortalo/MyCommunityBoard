import Link from "next/link";

function Filter() {
  return (
    <ul className="nav nav-tabs mb-3">
      <li className="nav-item">
        <Link className="nav-link active" href="/">
          New
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/">
          Hot
        </Link>
      </li>
    </ul>
  );
}

export default Filter;
