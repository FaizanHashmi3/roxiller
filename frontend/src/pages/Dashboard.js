import React, { useEffect, useState } from "react";
import Circle from "../components/Circle";
import Search from "../components/Search";
import Table from "../components/Table";
import axios from "axios";
import Statistics from "../components/Statistics";
import BarChart from "../components/BarChart";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [chartArr, setChartArr] = useState([]);
    const [statistics, setstatistics] = useState([]);
    const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [month, setMonth] = useState("3");

  useEffect(() => {
    const fetchData = async () => {
        try {
          const res = await axios.get(
            `https://roxiler-t5ax.onrender.com/product/getAll?page=${page}`
          );
          console.log(res);
          setProducts(res.data);
        } catch (error) {
          console.log(error);
        }
      };
    fetchData();
  }, [page]);

  useEffect(()=>{
    const fetchByMonth=async()=>{
        try {
            const res = await axios.get(
              `https://roxiler-t5ax.onrender.com/product/statistics/${month}`
            );
            console.log(res);
            setstatistics(res.data.products)
          } catch (error) {
            console.log(error);
          }
        };
        fetchByMonth();

        const fetchChartData = async()=>{
            try {
                const res = await axios.get(
                  `https://roxiler-t5ax.onrender.com/product/getChart/${month}`
                );
                console.log(res);
                setChartArr(getChartArr(res.data.chartData))
              } catch (error) {
                console.log(error);
              }
            };
            fetchChartData();
            
  },[month])


  const getChartArr = (chartData)=>{
    let arr = new Array(10).fill(0);
             chartData.forEach((val)=>{
                let index = Math.floor(val._id / 100);
                
                arr[index]= val.count
            })
            return arr;
  }



  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleSelect = (e) => {
    setMonth(e.target.value);
    setCount(count+1)
  };
  
    var filteredData = products.filter((item) => {
        return (
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
        );
      });
  

  return (
    <div>
      <Circle />
      <Search search={search} handleSearch={handleSearch} handleSelect={handleSelect} />
      <Table
        products={count >=2 ? statistics : filteredData ? filteredData : products}
        page={page}
        setPage={setPage}
        setCount={setCount}
      />
      <Statistics statistics={statistics} month={month}/>
      <BarChart chartArr={chartArr} month={month}/>
    </div>
  );
};

export default Dashboard;