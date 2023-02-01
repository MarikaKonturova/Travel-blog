import Image from "next/image";
import React, { forwardRef } from "react";
import { urlFor } from "./../lib/sanity";
import Tag from "./Tag";


const Card = forwardRef(({onClick, href, post }, ref) => {
  return (
    <>
      <div className="card-container" href={href} onClick={onClick} ref={ref}>
        <h2>{post.title}</h2>
        <p>Published on: {new Date(post.publishAt).toLocaleDateString()}</p>

        <Image
          src={urlFor(post.mainImage).url()}
          alt={post.title + " image"}
          className="main-image"
          height={220}
          width={390}
          placeholder='blur'
          blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8uH17HAAHfwKv2X/CawAAAABJRU5ErkJggg=="}

        />
        <hr />
        <div className="info-container">
          <p>Posted by: {post.username}</p>
          <Image
            src={urlFor(post.authorImage).url()}
            alt={post.username + " avatar"}
            className="avatar"
            height={50}
            width={55}
            placeholder='blur'
            blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8uH17HAAHfwKv2X/CawAAAABJRU5ErkJggg=="}

          />
        </div>
        <div className="tag-container">
          {post.categories.map((cat) => (
            <>{cat && <Tag key={cat?.id} title={cat?.title} />}</>
          ))}
        </div>
      </div>
    </>
  );
});


export default Card;
