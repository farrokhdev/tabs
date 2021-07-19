import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'
let loadingContent = [];

function App() {
  
  const[loading,setLoading]=useState(true);

  const[jobs,setJobs]=useState([]);
  const[value,setValue]=useState(0);

  
  const fetchJobs = async()=>{
    try{
      const response=await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs);
    setLoading(false);
    }
    catch(error){
      setLoading(false);
      console.log(error);
    }
  };

  console.log(jobs);

  useEffect(()=>{
    fetchJobs();
  
  },[])
  if(loading){
    loadingContent= 
    <section className="main">
      <div className="container">
      <div className="loading">
      <h2>loading ...</h2>
      </div>
      </div>
    </section>
    return(loadingContent)
  }

  const{company,dates,duties,title}=jobs[value];
  return (
    <section className="main">
      <div className="title">
        <h1>Explore</h1>
      </div>
      <div className="container">
        <div className="tab-btns">
          {jobs.map((item,index)=>{
            return(
              <button
              key={item.id} onClick={()=>{setValue(index)}}
              className={index===value && "active-btn"}
              
              >{item.company}</button>
            )
          })}
        </div>
        <div className="tab-content">
          <div className="tab-title">
            <h3>{title}</h3>
          </div>
          <div className="tab-company">
            <h4>
            {company}
            </h4>
          </div>
          <div className="tab-date">
            <p>{dates}</p>
          </div>
            {duties.map((duty,index)=>{
              return(
                <div className="tab-duties" key="index">
                <div className="icon">
                <FaAngleDoubleRight className="ic"/></div> 
                <div className="duty">
                <p>{duty}</p>
                </div>
              </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}

export default App
