// import React from 'react'
// import "../styles.css";
// import filter_outline from "../assets/filter_outline.png";
// import { useState } from 'react';

// const [filter, setFilter] = useState([])

// const selectHandler = (event) => {
//     setFilter(event.target.value)
//   }

// function FilterBar() {
//   return (
//     <div className='filter-container'>
//         <form className='filter-flexbox'>
//             <img src={filter_outline} alt='Filter Icon'></img>            
//             value={filter} onChange={selectHandler}
//             <select className="filterDropdown" >
//                 <option value="" hidden>Content Type</option>
//                 <option value="Digital Media">Digital Media</option>
//                 <option value="Visual Arts">Visual Arts</option>
//                 <option value="Photography">Photography</option>
//                 <option value="3D Sculpture">3D Sculpture</option>
//                 <option value="Mixed Media">Mixed Media</option>
//             </select>

//             <select className="filterDropdown" >
//                 <option value="" hidden>Artists</option>
//                 <option value="following">Artists I Follow</option>
//                 <option value="featured">Featured Artists</option>
//             </select>

//             <select className="filterDropdown" >
//                 <option value="" hidden>Maturity</option>
//                 <option value="mature">Mature Content</option>
//                 <option value="pg">Safe For Work</option>
//             </select>

//             <select className="filterDropdown" >
//                 <option value="" hidden>Theme</option>
//                 <option value="Nature">Nature</option>
//                 <option value="Technology">Technology</option>
//                 <option value="Sports">Sports</option>
//                 <option value="Optical_Illusion">Optical Illusion</option>
//             </select>
//         </form>
//     </div>
//   )
// }

// export default FilterBar