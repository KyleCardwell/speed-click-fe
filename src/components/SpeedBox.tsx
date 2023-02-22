import React, { useEffect, MouseEvent } from 'react';

function SpeedBox(props: any) {

  useEffect(() => {
    
  },[])


  const handleClick = (e: MouseEvent) => {
    props.toggleBox(e, props.num)
    // console.log('clicked', props.num)
  }

  return (
    <div className={`SpeedBox ${props.clickToWin ? 'green' : ''}`} onClick={handleClick}>

    </div>
  )
}

export default SpeedBox;