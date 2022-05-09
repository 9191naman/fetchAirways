import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'


const App = () => {

  const [show, setShow] = useState(false)

  const [info, setInfo] = useState([])               // api data state//
  const [air, setAir] = useState();
  const [country, setCountry] = useState();





  const fetchData = () => {
    axios.get("https://api.instantwebtools.net/v1/passenger?page=0&size=10")
      .then((res) => {
        setInfo(res.data.data);
        // setTotalPages(res.totalPages);
      })
  }

  const airlineData = (id) => {
    axios.get("https://api.instantwebtools.net/v1/passenger?page=0&size=10")
      .then((res) => {
        let airdata = res.data.data[0].airline[0].name
        let countryData = res.data.data[0].airline[0].country
        setAir(airdata);
        setCountry(countryData);
      })
    // console.log(id)
    setShow(!show)
  }

  const handlePageClick = (Data) => {
    console.log(Data.selected)
  }

  return (
    <>
      <div className='container my-3'>
        <div className='row'>
          <div className='col-3'>
            <button className='btn btn-primary' onClick={fetchData}>fetchdata</button>
          </div>
        </div>
      </div>

      <ReactPaginate
        previousLabel={'prev'}
        nextLabel={'next'}
        breakLabel={'1'}
        pageCount={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'}></ReactPaginate>

      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Trips</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            info.map((value) => {
              return (
                <tr key={value._id}>

                  <th scope="row">{value.name}</th>
                  <td>{value.trips}</td>
                  <td><button onClick={() => airlineData(value._id)}>Check Airline</button>
                    <Modal show={show}>
                      <Modal.Header>Airline name : {air}</Modal.Header>
                      <Modal.Body>country : {country}</Modal.Body>
                      <Modal.Footer>
                        <Button onClick={() => airlineData()}>Close</Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default App;