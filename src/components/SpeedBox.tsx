import React, { useEffect } from 'react';

function SpeedBox(props: any) {

  useEffect(() => {
    
  },[])


  const handleClick = () => {
    props.toggleBox(props.num)
    // console.log('clicked', props.num)
  }

  return (
    <div className={`SpeedBox ${props.clickToWin ? 'green' : ''}`} onClick={handleClick}>

    </div>
  )
}

export default SpeedBox;