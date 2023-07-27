import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { BsLockFill } from 'react-icons/bs';

interface Props{



  numberOfPaginate:number,
  setActivePage: (page:number)=>void,
  activePage: number,
  setIndex:(index:number)=>void

}

function AdvancedExample({ numberOfPaginate  , setActivePage , activePage,setIndex} : Props) {
 


  console.log(activePage)
  return (
    <Pagination>
      <Pagination.Prev />

    {  [...Array(numberOfPaginate)].map((e, i) => {

      return i ===activePage ?  
      <Pagination.Item   active  key={i}>{i}</Pagination.Item>
        : 
      <Pagination.Item  
      onClick={()=>{
        setActivePage(i);
        setIndex(i);
      }} key={i}>{i}</Pagination.Item>
    })}
      <Pagination.Next />

    </Pagination>
  );
}

export default AdvancedExample;