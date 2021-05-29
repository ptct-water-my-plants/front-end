const InvCard = (props) => {
  return (
    <div className = 'invCard'>
      <img href = {props.img} alt = '' />
      <h2 className = 'plant-name'>{props.plantName}</h2>
    </div>
  )
};

export default InvCard;