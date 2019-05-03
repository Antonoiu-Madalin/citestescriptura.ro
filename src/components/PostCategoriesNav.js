import React from 'react'
import { Link } from 'gatsby'
import Collapsible from './Collapsible';
import './PostCategoriesNav.css'
import { FaTags } from 'react-icons/fa';
import BlogSearch from './BlogSearch';


const activeStyles  = {
  color: 'white',
  background:'#459c98',
}

const PostCategoriesNav = ({ categories}) => (
  

  <div id="collapsibleContainer">
  
    {/*The proper search! Do not remove */}
      <div className="properSearch"> 
        <BlogSearch />
      </div>
 

    <div id="innerCollapsible">
    
    
      <div className="PostCategoriesNav">
        <Link className="NavLink" exact="true" to={`/`} activeStyle={activeStyles}>
          Toate
        </Link>

        {categories.map((category, index) => (
          <Link
            exact="true"
            className="NavLink"
            key={category.title + index}
            to={category.slug}
            activeStyle={activeStyles}
          >
            {category.title}
          </Link>
        ))}

      </div>
      </div>
      </div>
   
)


export default PostCategoriesNav
