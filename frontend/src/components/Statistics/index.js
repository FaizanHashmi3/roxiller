import React, { useEffect, useState } from "react";
import "./styles.css"
import { getMonth } from "../../functions/getMonth";
const Statistics = ({ month, statistics }) => {
  const [total, setTotal] = useState();
  const [sold, setSold] = useState();
  const [notSold, setNotSold] = useState();
  
  useEffect(() => {
    let totalCount = 0;
    let soldCount = 0;
    let notSoldCount = 0;
    for (let val of statistics) {
      totalCount += val.price;
      if (val.sold) {
        soldCount++;
      } else {
        notSoldCount++;
      }
    }
    setSold(soldCount);
    setNotSold(notSoldCount);
    setTotal(totalCount);
  }, [statistics]);
  return (
    <div className="st">
      <h1>Statistics:  {getMonth(month)}</h1>
      <div className="stats">
        
          <div  className="stats-items">
            <div>Total sale </div>
            <div>{total}</div>
          </div>
          <div className="stats-items">
            <div>Total sold item </div>
            <div>{sold}</div>
          </div>
          <div className="stats-items">
            <div>Total not sold item </div>
            <div>{notSold}</div>
          </div>
        
      </div>
    </div>
  );
};

export default Statistics;