import React, { useState, useEffect, useRef } from "react";
import config from "../config";
import axios from "axios";
import Pagination from "rc-pagination";
import dynamic from "next/dynamic";
const PostPreview = dynamic(() => import("../components/PostPreview"), { ssr: false });

export default function Blog({ noConfig, posts, pages, categories }) {
  const [noOfPages, setNoOfPages] = useState(pages);
  const [currentPage, setCurrentPage] = useState(1);
  const [thisPagePosts, setThisPagePosts] = useState(posts);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
    loadPosts();
    return () => {};
  }, [category]);

  useEffect(() => {
    loadPosts();
    return () => {};
  }, [currentPage]);

  const loadPosts = async () => {
    setLoading(true);
    const wproot = `${config.wordpressRoot}/wp-json/wp/v2`;
    const params = new URLSearchParams({
      order: "asc",
      orderBy: "date",
      per_page: config.postsPerPage,
      page: currentPage,
      categories: category || "",
    });

    const postsQuery = await axios.get(`${wproot}/posts?${params.toString()}`);

    setThisPagePosts(postsQuery.data);
    setNoOfPages(postsQuery.headers["x-wp-totalpages"]);
    setLoading(false);
  };

  if (noConfig) {
    return <h1 style={{ textAlign: "center" }}>Blog not configured.</h1>;
  }

  return (
    <div className="blog">
      <h1 style={{ textAlign: "center" }}>{config.blogTitle}</h1>
      {categories && (
        <ul className="categories-selector">
          <li className={`categories-item${category === null ? " active" : ""}`} onClick={() => setCategory(null)} title="All blogs">
            All
          </li>
          {categories.map((cat) => (
            <li
              className={`categories-item${category === cat.id ? " active" : ""}`}
              onClick={() => setCategory(cat.id)}
              key={cat.id}
              title={cat.description}
            >
              {cat.name} ({cat.count})
            </li>
          ))}
        </ul>
      )}
      <Pagination
        locale="en-US"
        current={currentPage}
        total={noOfPages}
        onChange={(no) => setCurrentPage(no)}
        nextIcon={<ion-icon name="chevron-forward-outline" />}
        prevIcon={<ion-icon name="chevron-back-outline" />}
        jumpNextIcon={<ion-icon name="ellipsis-horizontal" />}
        jumpPrevIcon={<ion-icon name="ellipsis-horizontal" />}
      />
      <div className="posts-wrapper">
        {loading ? (
          <div className="loader" style={{ margin: "auto" }} />
        ) : (
          thisPagePosts.map((post) => <PostPreview key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  if (!config.wordpressRoot) return { props: { noConfig: true } };

  const wproot = `${config.wordpressRoot}/wp-json/wp/v2`;
  const params = new URLSearchParams({
    order: "asc",
    orderBy: "date",
    per_page: config.postsPerPage,
    page: 1,
  });

  const [postsQuery, categoriesQuery] = await Promise.all([
    axios.get(`${wproot}/posts?${params.toString()}`),
    axios.get(`${wproot}/categories?per_page=100`),
  ]);

  return {
    props: {
      posts: postsQuery.data,
      pages: postsQuery.headers["x-wp-totalpages"],
      categories: categoriesQuery.data.filter((cat) => cat.count !== 0).sort((a, b) => b.count - a.count),
    },
  };
}
