const InvCard = (props) => {
  return (
    <a href = {props.wikiLink} className = 'plant-link' rel = 'noreferrer' target = '_blank'>
      <div className = 'plantCard'>
        <h2 className = 'plant-name'>{props.plantName}</h2>
      </div>
    </a>
  )
};

export default InvCard;