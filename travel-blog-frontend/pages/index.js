import { getClient } from "../lib/sanity.server";
import groq from "groq";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";


const Card = dynamic(() => import("../components/Card"), {
  ssr: false,
});

const Home = ({ posts }) => {
  return (
    <div className="dashboard">
      <Head>
        <title>Nomad Travel Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="posts-container">
        {posts &&
          posts?.map((post, i) => (
            <Link
              key={post._id}
              href="/posts/[slug]"
              as={`/posts/${post.slug.current}`}
              passHref
            >
              <Card post={post}  />
            </Link>
          ))}
      </div>
    </div>
  );
};
export async function getStaticProps({ preview = false }) {
  const posts = await getClient(preview).fetch(groq`
  *[ _type == "post" && publishAt < now()] | order(publishAt desc) {
    _id,
    title,
    "username" : author->username,
    "categories": categories[]->{id, title},
    "authorImage": author->avatar,
     body,
     slug,
    mainImage,
     publishAt  
  }
`);

  return {
    props: {
      posts
    },
  };
}
export default Home;
