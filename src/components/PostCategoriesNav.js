import React from 'react'
import { Link } from 'gatsby'
import Collapsible from 'react-collapsible';
import BlogSearch from './BlogSearch'
import './PostCategoriesNav.css'

const PostCategoriesNav = ({ categories, enableSearch }) => (
  <Collapsible trigger="$;" className="collapSible">
    <div className="PostCategoriesNav">
      <Link className="NavLink" exact="true" to={`/blog/`}>
        All
      </Link>
      {categories.map((category, index) => (
        <Link
          exact="true"
          className="NavLink"
          key={category.title + index}
          to={category.slug}
        >
          {category.title}
        </Link>
      ))}

      {enableSearch && <BlogSearch />}
    </div>
    </Collapsible>
)

export default PostCategoriesNav
