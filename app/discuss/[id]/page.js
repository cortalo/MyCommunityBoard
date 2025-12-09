import Image from "next/image";
import styles from "./page.module.css";
import { selectDiscussPostById } from "@/app/_lib/DiscussPostMapper";
import { selectUserById } from "@/app/_lib/UserMapper";

async function page({ params }) {
  let { id } = await params;
  let post = await selectDiscussPostById(id);
  let user = await selectUserById(post.userId);
  return (
    <div className="main">
      {/* discuss post detail */}
      <div className="container">
        {/* title */}
        <h6 className="mb-4">
          <Image
            src="http://static.nowcoder.com/images/img/icons/ico-discuss.png"
            alt="discuss icon"
            height={22}
            width={25}
          />
          <span>{post.title}</span>
          <div className="float-right">
            <button type="button" className="btn btn-danger btn-sm">
              pin
            </button>
            <button type="button" className="btn btn-danger btn-sm">
              feature
            </button>
            <button type="button" className="btn btn-danger btn-sm">
              delete
            </button>
          </div>
        </h6>

        {/* author */}
        <div className="media pb-3 border-bottom">
          <a href="profile.html">
            <Image
              src={user[0].image}
              className="align-self-start mr-4 rounded-circle user-header"
              alt="profile photo"
              width={50}
              height={50}
            />
          </a>
          <div className="media-body">
            <div className="mt-0 text-warning">{user[0].name}</div>
            <div className="text-muted mt-3">
              published at{" "}
              <b>{new Date(post.created_at).toLocaleDateString()}</b>
              <ul className="d-inline float-right">
                <li className="d-inline ml-2">
                  <a href="#" className="text-primary">
                    like 11
                  </a>
                </li>
                <li className="d-inline ml-2">|</li>
                <li className="d-inline ml-2">
                  <a href="#replyform" className="text-primary">
                    comment 7
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* discuss post content */}
        <div className={`mt-4 mb-3 ${styles.content}`}>{post.content}</div>
      </div>

      {/* comment */}
      <div className="container mt-3">
        {/* number of comments */}
        <div className="row">
          <div className="col-8">
            <h6>
              <b className="square"></b> <i>30</i> comments
            </h6>
          </div>
          <div className="col-4 text-right">
            <a href="#replyform" className="btn btn-primary btn-sm">
              Comment
            </a>
          </div>
        </div>

        {/* comment list */}
        <ul className="list-unstyled mt-4">
          <li className="media pb-3 pt-3 mb-3 border-bottom">
            <a href="profile.html">
              <Image
                src="http://images.nowcoder.com/head/2t.png"
                className="align-self-start mr-4 rounded-circle user-header"
                alt="profile photo"
                width={50}
                height={50}
              />
            </a>
            <div className="media-body">
              <div className="mt-0">
                <span className="font-size-12 text-success">Jane Smith</span>
                <span
                  className={`badge badge-secondary float-right ${styles.floor}`}
                >
                  1#
                </span>
              </div>
              <div className="mt-2">
                I recommend starting with the official Spring Boot
                documentation. It is well-structured and beginner-friendly.
                Also, try building small projects along the way!
              </div>
              <div className="mt-4 text-muted font-size-12">
                <span>
                  published at <b>2019-04-15 15:32:18</b>
                </span>
                <ul className="d-inline float-right">
                  <li className="d-inline ml-2">
                    <a href="#" className="text-primary">
                      like(1)
                    </a>
                  </li>
                  <li className="d-inline ml-2">|</li>
                  <li className="d-inline ml-2">
                    <a href="#" className="text-primary">
                      comment(2)
                    </a>
                  </li>
                </ul>
              </div>

              {/* reply list */}
              <ul className="list-unstyled mt-4 bg-gray p-3 font-size-12 text-muted">
                <li className="pb-3 pt-3 mb-3 border-bottom">
                  <div>
                    <span>
                      <b className="text-info">Mike Johnson</b>:&nbsp;&nbsp;
                    </span>
                    <span>
                      Great advice! I would also add that Spring in Action book
                      is excellent.
                    </span>
                  </div>
                  <div className="mt-3">
                    <span>2019-04-15 15:32:18</span>
                    <ul className="d-inline float-right">
                      <li className="d-inline ml-2">
                        <a href="#" className="text-primary">
                          like(1)
                        </a>
                      </li>
                      <li className="d-inline ml-2">|</li>
                      <li className="d-inline ml-2">
                        <a
                          href="#huifu01"
                          data-toggle="collapse"
                          className="text-primary"
                        >
                          reply
                        </a>
                      </li>
                    </ul>
                    <div id="huifu01" className="mt-4 collapse">
                      <div>
                        <input
                          type="text"
                          className={styles.inputsize}
                          placeholder="reply to Mike Johnson"
                        />
                      </div>
                      <div className="text-right mt-2">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                        >
                          reply
                        </button>
                      </div>
                    </div>
                  </div>
                </li>

                {/* reply enter box */}
                <li className="pb-3 pt-3">
                  <div>
                    <input
                      type="text"
                      className={styles.inputsize}
                      placeholder="please enter your reply."
                    />
                  </div>
                  <div className="text-right mt-2">
                    <button type="button" className="btn btn-primary btn-sm">
                      reply
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      {/* comment enter box */}
      <div className="container mt-3">
        <div className={styles.replyform}>
          <p className="mt-3">
            <a name={styles.replyform}></a>
            <textarea placeholder="Please enter your comment."></textarea>
          </p>
          <p className="text-right">
            <button type="submit" className="btn btn-primary btn-sm">
              Comment
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
