import React, { useState, useEffect } from "react";
import firebase from "../utils/firebase";
import NewsPaper from "../components/Newspaper";
import DateInput from "../components/DateInput";
import getDate from "../utils/getDate";
import config from "../config";
import axios from "axios";
import PostPreview from "../components/PostPreview";

function Index({ latest, posts }) {
  const defaultDate = getDate();
  const [date, setDate] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categoriesPost, setCategoriesPost] = useState(null);

  useEffect(() => {
    if (!config.wordpressRoot) {
      setCategoriesPost([]);
      return;
    }
    const wproot = `${config.wordpressRoot}/wp-json/wp/v2`;

    (async () => {
      const cats = config.WPcategories.slice(1, config.WPcategories.length);
      const categoriesPosts = await Promise.all(
        cats.map((catId) => {
          const params = new URLSearchParams({
            categories: catId,
            per_page: 8,
            page: 1,
          });
          return axios.get(`${wproot}/posts?${params.toString()}`).then((val) => val.data);
        })
      );
      setCategoriesPost(categoriesPosts);
    })();

    return () => {};
  }, []);

  const searchDate = async (ev) => {
    if (ev) ev.preventDefault();
    setLoading(true);
    try {
      const query = await firebase
        .database()
        .ref("/papers")
        .orderByChild("date")
        .equalTo(date || defaultDate)
        .limitToFirst(2)
        .once("value")
        .then((data) => data.val());
      if (!query) {
        setError("No results found.");
      } else {
        setResult(Object.entries(query).map((val) => val[1]));
      }
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="home">
      {posts && (
        <div className="home-blog">
          <div className="posts-wrapper">
            {posts.map((post) => (
              <PostPreview post={post} key={post.id} hideExrp={true} small={true} />
            ))}
          </div>
        </div>
      )}
      <div className="login-card" style={{ boxShadow: "none", marginTop: 12 }}>
        <div className="login-card-content">
          <form onSubmit={searchDate}>
            <DateInput id="date" name="date" label="Pick a date" value={date || defaultDate} onChangeValue={setDate} required />
            <div className="card-action">
              <button className={`btn${loading ? " loading" : ""}`} disabled={loading} type="submit">
                Get paper
              </button>
            </div>
          </form>
        </div>
      </div>
      {result ? (
        <div style={{ marginTop: "24px" }}>
          {error && <div style={{ marginTop: "12px", color: "red", textAlign: "center" }}>{error}</div>}
          {result && result.map((data, i) => <NewsPaper key={i} data={data} />)}
        </div>
      ) : latest ? (
        <div style={{ marginTop: "24px" }}>
          <NewsPaper data={latest} />
        </div>
      ) : (
        <h3 style={{ textAlign: "center" }}>No newspaper uploaded yet</h3>
      )}
      <div className="home-blog">
        {categoriesPost ? (
          categoriesPost.map((catPosts, i) => (
            <div className="posts-wrapper" key={i}>
              {catPosts.map((post) => (
                <PostPreview post={post} key={post.id} hideExrp={true} />
              ))}
            </div>
          ))
        ) : (
          <div className="loader" />
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  let latest = null;
  const query = await firebase
    .database()
    .ref("/papers")
    .orderByChild("date")
    .limitToLast(1)
    .once("value")
    .then((data) => data.val());
  if (query) {
    latest = Object.entries(query).map((val) => val[1])[0];
  }

  if (!config.wordpressRoot) {
    return {
      props: { latest },
    };
  }

  const wproot = `${config.wordpressRoot}/wp-json/wp/v2`;
  const params = config.WPcategories
    ? new URLSearchParams({
        categories: config.WPcategories[0],
        per_page: 8,
        page: 1,
      })
    : new URLSearchParams({
        orderBy: "relevance",
        per_page: 8,
        page: 1,
      });

  const postsQuery = await axios.get(`${wproot}/posts?${params.toString()}`);

  return {
    props: {
      latest,
      posts: postsQuery.data,
    },
  };
}

export default Index;
