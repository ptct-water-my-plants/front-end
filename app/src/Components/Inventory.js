import { useEffect, useState } from 'react'
import axios from 'axios'

import InvCard from './InvCard'

const Inventory = () => {
  const [plantList, setPlantList] = useState([])

  useEffect(() => {
    axios
      .get(`https://www.growstuff.org/api/v1/crops`)
      .then(res => setPlantList(res.data.data))
      .catch(err => console.log(err))
  }, [])

  // const handleClick = () => console.log(plantList[1].attributes.["en-wikipedia-url"])
  
  return (
    <div className = 'inventory'>
      {/* <button onClick = {handleClick}>Button</button> */}
      <h1>Plants Inventory!</h1>
      <div className = 'plants'>
        {plantList.map((plant, key) => <InvCard plantName = {plant.attributes.name} wikiLink = {plant.attributes.["en-wikipedia-url"]} key = {key} />)}
      </div>
    </div>
  )
};

export default Inventory;