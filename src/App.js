import React, { useState, useEffect } from 'react'
import ReactPaginate from "react-paginate";
import './App.css'
const App = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [pageCount, setpageCount] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);


// Handling with conditional statements
  const searchItems = (searchValue) => {
    setInput(searchValue)
    if (input !== '') {
      const filteredData = items.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(input.toLowerCase())
      })
      setFilteredResults(filteredData)
    }
    else {
      setFilteredResults(items)
    }
  }
 
// Setting linmit to 10 
  let limit = 10;

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=${limit}`
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / limit));
      setItems(data);
    };

    getComments();
  }, [limit]);


// Fetching posts
  const posts = async (currentPage) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    // console.log(data.selected);
    let currentPage = data.selected + 1;
    const commentsFormServer = await posts(currentPage);
    setItems(commentsFormServer);

  };
  return (
    <>
      <div className="container my-4">
        <h1 className='text-center'>List of Users</h1>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
        <div className="input">
          <input type="text" placeholder="Search.." onChange={(e) => searchItems(e.target.value)} />
        </div>
        <div className="row m-2">
          {input.length > 1 ? (
            filteredResults.map((item) => {
              // items.map((item) => {
              return (
                <div key={item.id} className="col-sm-6 col-md-4 v my-2">
                  <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                    <div className="card-body">
                      <h5 className="card-title text-center h2">Id :{item.id} </h5>
                      <br />
                      <h5 className="card-title text-left">Title:{item.title} </h5>
                      <br />
                      <h6 className="card-subtitle mb-2 text-muted text-center">
                        {item.email}
                      </h6>
                      <p className="card-text">{item.body}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            items.map((item) => {
              return (
                <div key={item.id} className="col-sm-6 col-md-4 v my-2">
                  <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                    <div className="card-body">
                      <h5 className="card-title text-center h2">Id :{item.id} </h5>
                      <br />
                      <h5 className="card-title text-left">Title:{item.title} </h5>
                      <br />
                      <h6 className="card-subtitle mb-2 text-muted text-center">
                        {item.email}
                      </h6>
                      <p className="card-text">{item.body}</p>
                    </div>
                  </div>
                </div>
              );
            })

          )}
        </div>


      </div>


    </>
  )
}

export default App
