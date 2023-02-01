import React from "react";
import groq from "groq";
import Tag from "./../../components/Tag";
import { PortableText } from "@portabletext/react";
import { urlFor } from "./../../lib/sanity";
import { getClient } from "./../../lib/sanity.server";
import Image from 'next/image'
import { getPlaiceholder } from "plaiceholder";

import dynamic from 'next/dynamic'

const Map = dynamic(() => import('../..//components/Map'), {
  ssr: false,
})


/* how we want return our images in PortableText */

const PostComponents = {
  types: {
    image: ({ value }) => {
      return (
        <img
          className="post-image"
          alt={value.alt || " "}
          src={urlFor(value)}
        />
      );
    },
  },
};

const Post = ({ post,imageProps }) => {
  const { title, categories, body, authorImage, username, about, postedAt } =
    post;
   
  return (
    <>
      {post && (
        <article className="post-container">
          <h1>{title}</h1>
          <hr />
          <div className="tag-container">
            {categories &&
              categories.map((cat) => <Tag key={cat.title} title={cat.title} />)}
          </div>
          <PortableText value={body} components={PostComponents} />
          <hr />
          <div className="info-container">
            <div className="author-container">
              <Image
                src={urlFor(authorImage).url() || ""}
                alt={username + " avatar"}
                className="avatar"
               {...imageProps}
               height={50}
               width={55}
                placeholder='blur'
              />
              <h3>
                Author <strong>{username}</strong>
              </h3>
              <p>About Author</p>
              <p>{about}</p>
            </div>
            <div className="map-container">
                <Map longitude={postedAt.lng} latitude={postedAt.lat}/>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

const query = groq`*[_type == "post" && slug.current == $slug][0] {
    title,
    "username":author->username,
    "about":author->bio,
    "categories": categories[]->{id,title},
    "authorImage": author->avatar,
    body,
    publishAt,
    mainImage,
    postedAt
}`;

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
export async function getStaticProps({ params, preview = false }) {
  
  const post = await getClient(preview).fetch(query, { slug: params.slug });
  const { base64, img } = await getPlaiceholder(urlFor(post.authorImage).url() || "");

  return {
    props: {
      post,
      imageProps: {
        ...img,
        blurDataURL: base64,
      },
    },
  };
}

export default Post;
