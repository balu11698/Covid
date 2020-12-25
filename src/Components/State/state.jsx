import React, { useEffect, useState } from 'react'
import Statedata from '../../Api/stateapi'
import './state.css'
import Districtdata from '../../Api/districtapi'
import { useHistory } from 'react-router-dom';
import arrowDown from '../../Assets/arrowDown.svg'
import arrowUp from '../../Assets/arrowUp.svg'
import minus from '../../Assets/minus.svg'


function State() {
  //const classes = useStyles();
  const [stateName, setStateName] = useState([])
  const [districtData, setDistrictData] = useState([])
  const [disctrictName, setDisctrictName] = useState([])
  const [stateData, setStateData] = useState([])
  const [stateWiseData, setStateWiseData] = useState([])
  const [stateTotal, setStateTotal] = useState([])
  const [stateFilter, setStateFilter] = useState(false)
  const [confirmedFilter, setConfirmedFilter] = useState(true)
  const [activeFilter, setActiveFilter] = useState(false)
  const [recoveredFilter, setRecoveredFilter] = useState(false)
  const [deathsFilter, setDeathsFilter] = useState(false)
  const [imageToggleState, setImageToggleState] = useState("minus")
  const [imageToggleConfirmed, setImageToggleConfirmed] = useState("up")
  const [imageToggleActive, setImageToggleActive] = useState("minus")
  const [imageToggleRecovered, setImageToggleRecovered] = useState("minus")
  const [imageToggleDeaths, setImageToggleDeaths] = useState("minus")
  const images = {
    down: arrowDown,
    up: arrowUp,
    minus: minus
  }
  const history = useHistory();

  useEffect(() => {
    async function x() {
      await Districtdata().then(items => {
        setStateName(Object.keys(items));
        setStateData(items);
      })
    }
    x();
  }, [])
  useEffect(() => {
    async function x() {
      await Districtdata().then(items => {
        setStateData(items);
      })
    }
    x();
  }, [])
  useEffect(() => {
    async function x() {
      await Statedata().then(items => {
        setStateWiseData(items.statewise.splice(1));
        setStateTotal(items.statewise.splice(0, 1))
      })
    }
    x();
  }, [])
  let district = (e) => {
    history.push('/state/' + e, { state: { statevalue: e, statedata: stateData } })
    console.log(e)
  }
  let stateNameFilter = () => {
    stateFilter ? stateNameFilterAscending() : stateNameFilterDescending()
    setImageToggleConfirmed("minus")
    setImageToggleActive("minus")
    setImageToggleRecovered("minus")
    setImageToggleDeaths("minus")
  }
  let stateNameFilterAscending = () => {
    setStateWiseData([...stateWiseData].sort((a, b) => (a.state > b.state ? 1 : -1)))
    setStateFilter(false)
    setImageToggleState("down")
  }
  let stateNameFilterDescending = () => {
    setStateWiseData([...stateWiseData].sort((a, b) => (a.state < b.state ? 1 : -1)))
    setStateFilter(true)
    setImageToggleState("up")

  }
  let stateConfirmedFilter = () => {
    confirmedFilter ? stateConfirmedFilterAscending() : stateConfirmedFilterDescending()
    setImageToggleState("minus")
    setImageToggleActive("minus")
    setImageToggleRecovered("minus")
    setImageToggleDeaths("minus")
  }
  let stateConfirmedFilterAscending = () => {
    setStateWiseData([...stateWiseData].sort((a, b) => (parseInt(a.confirmed) > parseInt(b.confirmed) ? 1 : -1)))
    setConfirmedFilter(false)
    setImageToggleConfirmed("down")
  }
  let stateConfirmedFilterDescending = () => {
    setStateWiseData([...stateWiseData].sort((a, b) => (parseInt(a.confirmed) < parseInt(b.confirmed) ? 1 : -1)))
    setConfirmedFilter(true)
    setImageToggleConfirmed("up")
  }
  let stateActiveFilter = () => {
    activeFilter ? stateActiveFilterAscending() : stateActiveFilterDescending()
    setImageToggleConfirmed("minus")
    setImageToggleState("minus")
    setImageToggleRecovered("minus")
    setImageToggleDeaths("minus")
  }
  let stateActiveFilterAscending = () => {
    setStateWiseData([...stateWiseData].sort((a, b) => (parseInt(a.active) > parseInt(b.active) ? 1 : -1)))
    setActiveFilter(false)
    setImageToggleActive("down")
  }
  let stateActiveFilterDescending = () => {
    setStateWiseData([...stateWiseData].sort((a, b) => (parseInt(a.active) < parseInt(b.active) ? 1 : -1)))
    setActiveFilter(true)
    setImageToggleActive("up")
  }
  let stateRecoveredFilter = () => {
    recoveredFilter ? stateRecoveredFilterAscending() : stateRecoveredFilterDescending()
    setImageToggleConfirmed("minus")
    setImageToggleActive("minus")
    setImageToggleState("minus")
    setImageToggleDeaths("minus")
  }
  let stateRecoveredFilterAscending = () => {
    setStateWiseData([...stateWiseData].sort((a, b) => (parseInt(a.recovered) > parseInt(b.recovered) ? 1 : -1)))
    setRecoveredFilter(false)
    setImageToggleRecovered("down")
  }
  let stateRecoveredFilterDescending = () => {
    setStateWiseData([...stateWiseData].sort((a, b) => (parseInt(a.recovered) < parseInt(b.recovered) ? 1 : -1)))
    setRecoveredFilter(true)
    setImageToggleRecovered("up")
  }
  let stateDeathsFilter = () => {
    deathsFilter ? stateDeathsFilterAscending() : stateDeathsFilterDescending()
    setImageToggleConfirmed("minus")
    setImageToggleActive("minus")
    setImageToggleRecovered("minus")
    setImageToggleState("minus")
  }
  let stateDeathsFilterAscending = () => {
    setStateWiseData([...stateWiseData].sort((a, b) => (parseInt(a.deaths) > parseInt(b.deaths) ? 1 : -1)))
    setDeathsFilter(false)
    setImageToggleDeaths("down")
  }
  let stateDeathsFilterDescending = () => {
    setStateWiseData([...stateWiseData].sort((a, b) => (parseInt(a.deaths) < parseInt(b.deaths) ? 1 : -1)))
    setDeathsFilter(true)
    setImageToggleDeaths("up")
  }
  //let getImageName = () => imageToggle ? 'down' : 'up'
  let dropdown = (e) => {
    let districtdata = (stateData[e].districtData)
    let districtNames = Object.keys(districtdata)
    setDistrictData(districtdata)
    setDisctrictName(districtNames)
    console.log(districtdata)
    console.log(e)
  }
  let State = () => {
    //const imageName = getImageName();
    return (
      <table>
        <thead>
          <tr className="stateHeader">
            <th className="stateName">State / UT<img src={images[imageToggleState]} onClick={stateNameFilter} /></th>
            <th className="stateConfirmed"  >Confirmed<img src={images[imageToggleConfirmed]} onClick={stateConfirmedFilter} /></th>
            <th className="stateActive" >Active<img src={images[imageToggleActive]} onClick={stateActiveFilter} /></th>
            <th className="stateRecovered" >Recovered<img src={images[imageToggleRecovered]} onClick={stateRecoveredFilter} /></th>
            <th className="stateDeaths" >Deceased<img src={images[imageToggleDeaths]} onClick={stateDeathsFilter} /></th>
          </tr>
        </thead>
        <tbody>
          {stateWiseData.map((item) => (
            <tr className="stateContents" key={item.state} onClick={() => district(item.state)}>
              <td className="stateName" >{item.state}</td>
              <td className="stateConfirmed" > {item.confirmed}</td>
              <td className="stateActive" > {item.active}</td>
              <td className="stateRecovered" > {item.recovered}</td>
              <td className="stateDeaths" > {item.deaths}</td>
            </tr>
          ))}
        </tbody>
      </table>
      // <table>
      //   <thead>
      //     <tr className="stateHeader">
      //       <th className="stateName">State / UT</th>
      //       <th className="stateConfirmed">Confirmed</th>
      //       <th className="stateActive">Active</th>
      //       <th className="stateRecovered">Recovered</th>
      //       <th className="stateDeaths">Deceased</th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     {stateWiseData.map((item) => (
      //       <Accordion onChange={()=>dropdown(item.state)}>
      //         <AccordionSummary>
      //       <tr className="stateContents" key={item.state} >
      //         <td className="stateName" >{item.state}</td>
      //         <td className="stateConfirmed" > {item.confirmed}</td>
      //         <td className="stateActive" > {item.active}</td>
      //         <td className="stateRecovered" > {item.recovered}</td>
      //         <td className="stateDeaths" > {item.deaths}</td>
      //       </tr>
      //       </AccordionSummary>
      //       <AccordionDetails>
      //       {disctrictName.map((item) => (
      //       <tr key={item} className="district">
      //       <td className="districtName">{item}</td>
      //       <td className="districtConfirmed">{districtData[item].confirmed}</td>
      //       <td className="districtActive">{districtData[item].active} </td>
      //       <td className="districtRecovered">{districtData[item].recovered} </td>
      //       <td className="districtDeaths">{districtData[item].deceased}</td>
      //       </tr>
      //       ))}
      //       </AccordionDetails>
      //       </Accordion>
      //     ))}
      //   </tbody>
      // </table>

    );
  }
  return (
    <div >
      <State />
    </div>
  );

}
export default State;