import Link from "next/link";

async function Header() {
  return (
    <header className="bg-dark sticky-top">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link className="navbar-brand" href="/"></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item ml-3 btn-group-vertical">
                <Link className="nav-link" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item ml-3 btn-group-vertical">
                <Link className="nav-link" href="/">
                  Msgs<span className="badge badge-danger">12</span>
                </Link>
              </li>
              <li className="nav-item ml-3 btn-group-vertical">
                <Link className="nav-link" href="/">
                  Register
                </Link>
              </li>
              <li className="nav-item ml-3 btn-group-vertical">
                <Link className="nav-link" href="/">
                  Login
                </Link>
              </li>
              <li className="nav-item ml-3 btn-group-vertical">
                <Link className="nav-link" href="/">
                  Profile
                </Link>
              </li>
              <li className="nav-item ml-3 btn-group-vertical">
                <Link className="nav-link" href="/">
                  Logout
                </Link>
              </li>
            </ul>
            <form
              className="form-inline my-2 my-lg-0"
              action="site/search.html"
            >
              <input
                className="form-control mr-sm-2"
                type="search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
