"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function Header({ session, initialUnreadCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount || 0);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchUnreadCount = async () => {
      const response = await fetch("/api/unread-count");
      const data = await response.json();
      setUnreadCount(data.count);
    };

    fetchUnreadCount();

    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [session?.user?.email]);

  return (
    <header className="bg-dark sticky-top">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link className="navbar-brand" href="/"></Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item ml-3 btn-group-vertical">
                <Link className="nav-link" href="/">
                  Home
                </Link>
              </li>
              {session && (
                <li className="nav-item ml-3 btn-group-vertical">
                  <Link className="nav-link" href="/letter">
                    Msgs
                    {unreadCount > 0 && (
                      <span className="badge badge-danger">{unreadCount}</span>
                    )}
                  </Link>
                </li>
              )}
              {!session && (
                <li className="nav-item ml-3 btn-group-vertical">
                  <Link className="nav-link" href="/api/auth/signin">
                    Login
                  </Link>
                </li>
              )}
              {session && (
                <li className="nav-item ml-3 btn-group-vertical">
                  <Link className="nav-link" href="/">
                    {session.user.name}
                  </Link>
                </li>
              )}
              {session && (
                <li className="nav-item ml-3 btn-group-vertical">
                  <Link className="nav-link" href="/api/auth/signout">
                    Logout
                  </Link>
                </li>
              )}
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
