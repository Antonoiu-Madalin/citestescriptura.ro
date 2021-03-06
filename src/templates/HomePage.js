import React from 'react'
import { Link, graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'
import './BlogIndex.css'
import PostSection from '../components/PostSection'
import Layout from '../components/Layout'
import FaHome from 'react-icons/lib/fa/home';
import FaBook from 'react-icons/lib/fa/book';
import FaBolt from 'react-icons/lib/fa/bolt';
import BlogSearch from '../components/BlogSearch';


const activeStyles  = {
  color: '#1E90FF'
}


/**
 * Filter posts by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {posts} object
 */
export const byDate = posts => {
  const now = Date.now()
  return posts.filter(post => Date.parse(post.date) <= now)
}

/**
 * filter posts by category.
 *
 * @param {posts} object
 * @param {title} string
 * @param {contentType} string
 */

export const byCategory = (posts, title, contentType) => {

  /* Aici adaugam folderele MetaCategoriilor pentru Toate default */
  const isCategory = contentType === 'postCategories metaCategories'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  return isCategory ? posts.filter(byCategory) : posts
}




// Export Template for use in CMS preview
export const HomePageTemplate = ({
  title,
  posts = [],
  enableSearch = true,
  contentType
}) => (

  <Location>
    {({ location }) => {
      let filteredPosts =
        posts && !!posts.length
          ? byCategory(byDate(posts), title, contentType)
          : []

      let queryObj = location.search.replace('?', '')
      queryObj = qs.parse(queryObj)

      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase()
        filteredPosts = filteredPosts.filter(post =>
          post.frontmatter.title.toLowerCase().includes(searchTerm)
        )
      }

      return (


        <main className="Blog">

          {!!posts.length && (
            /* Posts */
                <PostSection posts={posts} />
          )}

              <nav className={`SecondNav stickyNav`}>
                <ul className="Nav--Container container secondNav">
                  <li>
                      <Link exact="true" to={`/`} activeStyle={activeStyles}>
                      <span className="metaIcon"><FaHome /></span><span className="metaTitle">Acasă</span>
                      </Link>
                  </li>

                  <li>

                    <Link exact="true" partiallyActive={true} to={`/studiu-biblic/`} activeStyle={activeStyles}>
                    <span className="metaIcon"><FaBook/></span><span className="metaTitle">Studiu biblic</span>
                    </Link>
                  </li>

                  <li>

                    <Link exact="true" partiallyActive={true} to={`/raspunsuri-rapide/`} activeStyle={activeStyles}>
                    <span className="metaIcon"><FaBolt/></span> <span className="metaTitle">Raspunsuri</span>
                    </Link>
                  </li>

                    <li>
                        <span className="staticSearchIcon"><BlogSearch/></span>
                     </li>


                </ul>
              </nav>
        </main>

      )
    }}
  </Location>

)

// Export Default HomePage for front-end, posts: from query gets defined here!
const HomePage = ({ data: { page, posts, postCategories } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <HomePageTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}

      posts={posts.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields,
      }))}
      postCategories={postCategories.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
query HomePage($id: String!) {
  page: markdownRemark(id: {eq: $id}) {
    ...Meta
    fields {
      contentType
    }
    frontmatter {
      title
      excerpt
      template
      subtitle
      featuredImage
    }
  }
  posts: allMarkdownRemark(filter: {fields: {contentType: {in: ["metacat1posts", "metacat2posts"]}}}, sort: {order: DESC, fields: [frontmatter___date]}) {
    edges {
      node {
        excerpt
        fields {
          slug
          readingTime {
            text
          }
        }
        frontmatter {
          title
          date
          categories {
            category
          }
          featuredImage
        }
      }
    }
  }
  postCategories: allMarkdownRemark(filter: {fields: {contentType: {eq: "postCategories"}}}, sort: {order: ASC, fields: [frontmatter___title]}) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }
}

`
