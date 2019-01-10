import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Post from '../components/Post'
import Sidebar from '../components/Sidebar'
import favicon from './favicon.ico'

class IndexRoute extends React.Component {
  render() {
    const items = []
    const { title, subtitle, searchConsole } = this.props.data.site.siteMetadata
    const posts = this.props.data.allMarkdownRemark.edges
    posts.forEach(post => {
      items.push(<Post data={post} key={post.node.fields.slug} />)
    })
    console.log(posts);
    return (
      <Layout>
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={subtitle} />
            <meta name="google-site-verification" content={searchConsole} />
            <meta name="robots" content="index,follow" />
            <link rel="shortcut icon" href={favicon} />
          </Helmet>
          <Sidebar {...this.props} />
          <div className="content">
            <div className="content__inner">{items}</div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexRoute

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        searchConsole
        menu {
          label
          path
          subItem { 
            label
            path
          }
        }
        author {
          name
          email
          facebook
          github
        }
      }
    }
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
            tags
          }
        }
      }
    }
  }
`
