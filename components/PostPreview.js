import React from "react";
import Link from "next/link";
import redableTime from "../utils/redableTime";

export default function PostPreview({ post, hideExrp, small }) {
  if (small) {
    return (
      <Link href={`/blog/${post.slug}`}>
        <a className={`post-preview${small ? " small" : ""}`}>
          <img src={post.jetpack_featured_media_url} alt="featured image" className="post-preview-image" />
          <h2 className="post-preview-title">{post.title.rendered}</h2>
        </a>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`}>
      <a className={`post-preview${small ? " small" : ""}`}>
        <img src={post.jetpack_featured_media_url} alt="featured image" className="post-preview-image" />
        <div className="post-preview-body">
          <h2 className="post-preview-title">{post.title.rendered}</h2>
          {!hideExrp && <p className="post-preview-excerp" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>}
          <div className="post-preview-date">At {redableTime(post.date)}</div>
        </div>
      </a>
    </Link>
  );
}
