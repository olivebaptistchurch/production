import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import download from "downloadjs";

require("downloadjs");

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.name}
        videoUrl={post.frontmatter.video}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.name}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section>
          <h3>Congrats!</h3>
          <p>We are so excited for your journey! We are looking forward to coming alongside every step of the way. For more information about what to do next, <a href="https://www.olivebaptist.org/growth-track" target="_blank">click here</a>.</p>
          <button onClick={window ? download(post.frontmatter.video) : ''}>Download Baptism Video</button>
        </section>
        <video width="100%" controls>
          <source src={post.frontmatter.video ? post.frontmatter.video : ''} />
        </video>
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        name
        date(formatString: "MMMM DD, YYYY")
        video
      }
    }
  }
`
