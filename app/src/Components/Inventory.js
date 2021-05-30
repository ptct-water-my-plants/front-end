import { useEffect } from 'react'
import axios from 'axios'

import { connect } from 'react-redux'
import { setPlantList } from '../actions/InventoryActions'

import InvCard from './InvCard'

const Inventory = ({ plantList, setPlantList }) => {
  useEffect(() => {
    axios
      .get(`https://www.growstuff.org/api/v1/crops`)
      .then(res => setPlantList(res.data.data))
      .catch(err => console.log(err))
  }, [setPlantList])

  return (
    <div className = 'inventory'>
      <h1>Plants Inventory!</h1>
      <div className = 'plants'>
        {plantList.map((plant, key) => <InvCard plantName = {plant.attributes.name} wikiLink = {plant.attributes.["en-wikipedia-url"]} key = {key} />)}
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  plantList: state.plantList
});

export default connect(mapStateToProps, { setPlantList })(Inventory);
