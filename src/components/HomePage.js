import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router,Link,Route,Routes} from 'react-router-dom';

import axios from 'axios';
import _ from 'lodash';


const pageSize=100;
const HomePage = () => {
  const [post,setPosts]=useState([]);
  const [search,SetSearch]=useState('');
  const [paginate,setPaginate]=useState([]);
  const [currentPage,setCurrentPage]=useState(1);
  const [order,setOrder]=useState("ASC");


const getApi = async ()=>{
  try{
    const data=await axios.get("https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json")
    setPosts(data.data);
    setPaginate(_(data.data).slice(0).take(pageSize).value());

  }catch(e){
    console.log(e)
  }
}
useEffect(()=>{
  getApi()

},[])

const pageCount=post? post.length/pageSize:0;
if(pageCount===1)return null;
const pages=_.range(1,pageCount+1);

const pagination=(pageNo)=>{
  setCurrentPage(pageNo);
  const startIndex =(pageNo-1)*pageSize;
  const paginatedPost=_(post).slice(startIndex).take(pageSize).value();
  setPaginate(paginatedPost)
}
const sorting=(col)=>{
  if(order==="ASC"){
    const sorted=[...paginate].sort((a,b)=>
    a[col].toLocaleLowerCase()>b[col].toLocaleLowerCase()?1:-1
    )
    setPaginate(sorted);
    setOrder("DSC")
  }
  if(order==="DSC"){
    const sorted=[...paginate].sort((a,b)=>
    a[col].toLocaleLowerCase()<b[col].toLocaleLowerCase()?1:-1
    )
    setPaginate(sorted);
    setOrder("ASC")
  }
}

  return (
  <div>
    {/* <Router>
       <Routes>
          <Route path ="/users/id" element ={<SinglePost/>}/>


          </Routes>

          </Router>      */}
    
      <input
      type="text"
      placeHolder="search here"
      onChange={(e)=>{
        SetSearch(e.target.value)
      }}
      />
      <nav className='d-flex justify-content-center'>
     <ul className='pagination'>
     {
       pages.map((page)=>(
         <li className={page===currentPage? "page-item active":"page-item"}>
           <p className='page-link' onClick={()=>pagination(page)}>{page}</p>
           </li>
       ))
     }
     </ul>
    </nav>
   
<table className='table'>

<thead>
<tr>

<th onClick={()=>sorting("first_name")}> First Name</th>
<th onClick={()=>sorting("last_name")}>Second Name</th>
<th onClick={()=>sorting("age")}>Age</th>
<th onClick={()=>sorting("web")}>Web</th>
<th onClick={()=>sorting("email")}>Email</th>
</tr>
</thead>
<tbody>
{paginate.filter((item)=>{
       if (search===""){
         return item;
       }else if(item.first_name.toLowerCase().includes(search.toLocaleLowerCase())){
         return item;
       }else if(item.last_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())){
         return item;
       }
     })
    .map((item,id)=>{
       return(     
        <tr id={item.id}>
 <Link to={`/users/${item.id}`}>
         <td>{item.first_name}</td>
         </Link>
          <td>{item.last_name}</td>
          <td>{item.age}</td>
          <td><a href={item.web} target="___blank">{item.web}</a></td>
          <td>{item.email}</td>
        </tr>

     


       ) 
       
     })}
</tbody>    
</table>



</div>

  )
}

export default HomePage