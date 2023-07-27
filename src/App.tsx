import ReactPaginate from 'react-paginate'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'
function App() {
 
 

const   handleClick =  (data:any)=>{
    console.log(data.selected); 
  }
  return (
    <>
    <HomePage />


    {/* <ReactPaginate 
      pageCount={100}
      nextLabel={'next'}
      previousLabel='previous'
      breakLabel='...... '
      marginPagesDisplayed={2}
      pageRangeDisplayed={4}
      onClick={handleClick}
      // containerClassName='pagination justify-content-center'
      pageClassName='page-item'
      pageLinkClassName='page-link'
      previousClassName='page-link'
      nextClassName='page-link'
      breakClassName='page-link'
      activeClassName='active'
    /> */}


    </>
  )
}
export default App
