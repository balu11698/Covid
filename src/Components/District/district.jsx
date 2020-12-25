import React, { useEffect, useState } from 'react'
import Districtdata from '../../Api/districtapi'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './district.css'
import arrowDown from '../../Assets/arrowDown.svg'
import arrowUp from '../../Assets/arrowUp.svg'
import minus from '../../Assets/minus.svg'

function District(props) {
  const statename = props.location.state.state.statevalue
  const statedata = props.location.state.state.statedata
  const [stateName, setStateName] = useState([])
  const [districtData, setDistrictData] = useState([])
  const [disctrictName, setDisctrictName] = useState([])
  const [stateData, setStateData] = useState([])
  const [districtFilter,setDistrictFilter] = useState(false)
  const [confirmedFilter,setConfirmedFilter]=useState(false)
  const [activeFilter,setActiveFilter]=useState(false)
  const [recoveredFilter,setRecoveredFilter] = useState(false)
  const [deathsFilter,setDeathsFilter]= useState(false)
  const [imageToggleDistrict, setImageToggleDistrict] = useState("minus")
  const [imageToggleConfirmed, setImageToggleConfirmed] = useState("minus")
  const [imageToggleActive, setImageToggleActive] = useState("minus")
  const [imageToggleRecovered, setImageToggleRecovered] = useState("minus")
  const [imageToggleDeaths, setImageToggleDeaths] = useState("minus")
  const images = {
    down: arrowDown,
    up: arrowUp,
    minus: minus
  }
  useEffect(() => {
    async function x() {
      let districtdata = Object.entries(statedata[statename].districtData)
      setDistrictData(districtdata)  
    }
    x();
  }, [])
  let districtNameFilter=()=>{
    districtFilter ? districtNameFilterAscending() : districtNameFilterDescending()
    setImageToggleConfirmed("minus")
    setImageToggleActive("minus")
    setImageToggleRecovered("minus")
    setImageToggleDeaths("minus")
  }
  let districtNameFilterAscending=()=>{
    setDistrictData([...districtData].sort((a,b)=> (a[0] > b[0] ? 1 : -1)))
    setDistrictFilter(false)
    setImageToggleDistrict("down")
  }
  let districtNameFilterDescending=()=>{
    setDistrictData([...districtData].sort((a,b)=> (a[0] < b[0] ? 1 : -1)))
    setDistrictFilter(true)
    setImageToggleDistrict("up")
  }
  let stateConfirmedFilter=()=>{
    confirmedFilter ? stateConfirmedFilterAscending() : stateConfirmedFilterDescending()
    setImageToggleDistrict("minus")
    setImageToggleActive("minus")
    setImageToggleRecovered("minus")
    setImageToggleDeaths("minus")
  }
  let stateConfirmedFilterAscending=()=>{
    setDistrictData([...districtData].sort((a,b)=> (parseInt(a[1].confirmed) >parseInt(b[1].confirmed) ? 1 : -1)))
    setConfirmedFilter(false)
    setImageToggleConfirmed("down")
  }
  let stateConfirmedFilterDescending=()=>{
    setDistrictData([...districtData].sort((a,b)=> (parseInt(a[1].confirmed) <parseInt(b[1].confirmed) ? 1 : -1)))
    setConfirmedFilter(true)
    setImageToggleConfirmed("up")
  }
  let stateActiveFilter=()=>{
    activeFilter ? stateActiveFilterAscending() : stateActiveFilterDescending()
    setImageToggleConfirmed("minus")
    setImageToggleDistrict("minus")
    setImageToggleRecovered("minus")
    setImageToggleDeaths("minus")
  }
  let stateActiveFilterAscending=()=>{
    setDistrictData([...districtData].sort((a,b)=> (parseInt(a[1].active) >parseInt(b[1].active) ? 1 : -1)))
    setActiveFilter(false)
    setImageToggleActive("down")
  }
  let stateActiveFilterDescending=()=>{
    setDistrictData([...districtData].sort((a,b)=> (parseInt(a[1].active) < parseInt(b[1].active) ? 1 : -1)))
    setActiveFilter(true)
    setImageToggleActive("up")
  }
  let stateRecoveredFilter=()=>{
    recoveredFilter ? stateRecoveredFilterAscending() : stateRecoveredFilterDescending()
    setImageToggleConfirmed("minus")
    setImageToggleActive("minus")
    setImageToggleDistrict("minus")
    setImageToggleDeaths("minus")
  }
  let stateRecoveredFilterAscending=()=>{
    setDistrictData([...districtData].sort((a,b)=> (parseInt(a[1].recovered) >parseInt(b[1].recovered) ? 1 : -1)))
    setRecoveredFilter(false)
    setImageToggleRecovered("down")
  }
  let stateRecoveredFilterDescending=()=>{
    setDistrictData([...districtData].sort((a,b)=> (parseInt(a[1].recovered) < parseInt(b[1].recovered) ? 1 : -1)))
    setRecoveredFilter(true)
    setImageToggleRecovered("up")
  }
  let stateDeathsFilter=()=>{
    deathsFilter ? stateDeathsFilterAscending() : stateDeathsFilterDescending()
    setImageToggleConfirmed("minus")
    setImageToggleActive("minus")
    setImageToggleRecovered("minus")
    setImageToggleDistrict("minus")
  }
  let stateDeathsFilterAscending=()=>{
    setDistrictData([...districtData].sort((a,b)=> (parseInt(a[1].deceased) >parseInt(b[1].deceased) ? 1 : -1)))
    setDeathsFilter(false)
    console.log(districtData)
    setImageToggleDeaths("down")
  }
  let stateDeathsFilterDescending=()=>{
    setDistrictData([...districtData].sort((a,b)=> (parseInt(a[1].deceased) < parseInt(b[1].deceased) ? 1 : -1)))
    setDeathsFilter(true)
    setImageToggleDeaths("up")
  }
  return (
    <div>
    <Link className="statesPage" to="/">Go To India Stats</Link>
    <table className="districts">
    <thead>
          <tr className="districtHeader">
            <th className="stateName" >District<img src={images[imageToggleDistrict]} onClick={districtNameFilter} /></th>
            <th className="stateConfirmed" >Confirmed<img src={images[imageToggleConfirmed]} onClick={stateConfirmedFilter} /></th>
            <th className="stateActive" >Active<img src={images[imageToggleActive]} onClick={stateActiveFilter} /></th>
            <th className="stateRecovered" >Recovered<img src={images[imageToggleRecovered]} onClick={stateRecoveredFilter} /></th>
            <th className="stateDeaths" >Deceased<img src={images[imageToggleDeaths]} onClick={stateDeathsFilter} /></th>
          </tr>
      </thead>
      <tbody>
      {districtData.map((item) => (
        <tr key={item} className="district">
            <td className="districtName">{item[0]}</td>
            <td className="districtConfirmed">{item[1].confirmed}</td>
            <td className="districtActive">{item[1].active} </td>
            <td className="districtRecovered">{item[1].recovered} </td>
            <td className="districtDeaths">{item[1].deceased}</td>
        </tr>
      ))}
      </tbody>
    </table>
    </div>
  )
}

export default District;