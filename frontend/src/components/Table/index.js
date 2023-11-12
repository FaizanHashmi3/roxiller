import React from "react";
import "./styles.css";
const Table = ({products,page,setPage,setCount}) => {
    
    function handlePrev(){
        if(page!==1){
            setPage(page-1)
        }
        setCount(1)
    }
    function handleNext(){
       
        if(page!==6){
            setPage(page+1)
        }
        setCount(1)
    }
  return (
    <div>
      <table id="products">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Catagory</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
            {
                products && products.map((item)=>{
                    return(<tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td>{item.category}</td>
                        <td>{item.sold.toString()}</td>
                        <td><img src={item.image} alt="product" /></td>
                    </tr>)
                })
            }
        </tbody>
      </table>
      <div className="footer">
        <div className="footer-item">Page: {page}</div>
        <div className="next-prev">
            <div className="p-n" onClick={handlePrev}> Prev </div>
            <div className="p-n" onClick={handleNext}>Next</div>
        </div>
        <div className="footer-item">Per Page :10</div>
      </div>
    </div>
  );
};

export default Table;