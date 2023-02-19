import React from 'react';

function SpeedBox(props: any) {


  const handleClick = () => {
    props.toggleBox(props.num)
  }

  return (
    <div className={`SpeedBox ${props.clickToWin ? 'green' : ''}`} onClick={handleClick}>

    </div>
  )
}

export default SpeedBox;