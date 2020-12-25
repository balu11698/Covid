import React, { useEffect, useState } from 'react'
import axios from 'axios'
async function  Districtdata(){
    const url = 'https://api.covid19india.org/state_district_wise.json'

    return await axios.get(url).then((response) => response.data)
}
export default Districtdata;
