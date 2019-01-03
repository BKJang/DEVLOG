import React from 'react'
import Post from '../Post'

class TagTemplateDetails extends React.Component {
  render() {
    const items = []
    const tagTitle = this.props.pageContext.tag
    console.log(this.props.data.allMarkdownRemark)
    const posts = this.props.data.allMarkdownRemark ? this.props.data.allMarkdownRemark.edges : null
    posts && posts.forEach(post => {
      items.push(<Post data={post} key={post.node.fields.slug} />)
    })

    return (
      <div className="content">
        <div className="content__inner">
          <div className="page">
            <h1 className="page__title">
              All Posts tagged as &quot;
              {tagTitle}
              &quot;
            </h1>
            <div className="page__body">{items}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default TagTemplateDetails
