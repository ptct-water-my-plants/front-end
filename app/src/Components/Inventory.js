import { useEffect, useState } from 'react'
import axios from 'axios'

import InvCard from './InvCard'

const Inventory = () => {
  const [plantList, setPlantList] = useState([])
  const [plantPics, setPlantPics] = useState([])

  useEffect(() => {
    // for (let i = 1; i <= 5; i++) {
      axios
        .get(`https://www.growstuff.org/api/v1/crops/${i}`)
        .then(res => setPlantList([res.data.data]))
        .catch(err => console.log(err))
    // }
  }, [plantList])

  const handleClick = () => console.log(plantList)
  
  return (
    <div className = 'inventory'>
      <button onClick = {handleClick}>Button</button>
      {plantList.map((plant, key) => <InvCard plantName = {plant.attributes.name} key = {key} />)}
    </div>
  )
};

export default Inventory;