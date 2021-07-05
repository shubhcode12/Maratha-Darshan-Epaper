import React from "react";
import config from "../../config";
import redableTime from "../../utils/redableTime";
import axios from "axios";
import PostPreview from "../../components/PostPreview";

export default function BlogPost({ post, relevance }) {
  return (
    <>
      <div className="blog-post">
        <img className="blog-post-image" src={post.jetpack_featured_media_url} alt="Featured image" />
        <h1 className="blog-post-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
        <article dangerouslySetInnerHTML={{ __html: post.content.rendered }}></article>
        <hr />
        <div className="blog-post-info">
          <div className="blog-post-date">
            <ion-icon name="calendar-outline" />
            <span>At {redableTime(post.date)}</span>
          </div>
        </div>
      </div>
      {relevance && (
        <div className="home-blog">
          <h2>{config.homeBlogTitle}</h2>
          <div className="posts-wrapper">
            {relevance.map((post) => (
              <PostPreview post={post} key={post.id} hideExrp={true} />
            ))}
          </div>
          <a href="/blog" className="btn" style={{ display: "block", margin: "0px auto", textDecoration: "none" }}>
            See more news{" "}
            <span>
              <ion-icon name="chevron-forward-outline" />
            </span>
          </a>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(ctx) {
  if (!config.wordpressRoot) return { props: { noConfig: true } };

  const { slug } = ctx.query;

  const wproot = `${config.wordpressRoot}/wp-json/wp/v2`;
  const params = new URLSearchParams({
    order: "asc",
    orderBy: "date",
    per_page: config.postsPerPage,
    slug,
    page: 1,
  });

  const relevanceParams = new URLSearchParams({
    orderBy: "relevance",
    per_page: 5,
    page: 1,
  });

  const [postsQuery, relevanceQuery] = await Promise.all([
    axios.get(`${wproot}/posts?${params.toString()}`),
    axios.get(`${wproot}/posts?${relevanceParams.toString()}`),
  ]);

  return {
    props: { post: postsQuery.data.length > 0 ? postsQuery.data[0] : null, relevance: relevanceQuery.data },
  };
}
