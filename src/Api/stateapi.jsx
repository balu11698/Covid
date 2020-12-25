import React, { useEffect, useState } from 'react'
import axios from 'axios'
async function  Statedata(){
    const url = 'https://api.covid19india.org/data.json'

    return await axios.get(url).then((response) => response.data)
}
export default Statedata;