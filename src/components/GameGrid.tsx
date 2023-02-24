import React, { ReactNode, useEffect, useState } from 'react';
import SpeedBox from './SpeedBox';
import { gameBox } from '../App';



function GameGrid(props: any) {

  const [gridRows, setGridRows] = useState<gameBox[][]>()

  const { boxQuantity, speedBoxes } = props

  // console.log(speedBoxes)

  useEffect(() => {
    setGridRows((): gameBox[][] => {
      const grid: any[] = [];
      for (let i = 0; i < speedBoxes.length; i += boxQuantity) {
        const row = speedBoxes.slice(i, i + boxQuantity)
        grid.push(row)
      }
      // console.log('grid', grid)
      return grid
    })
  }, [speedBoxes])


  const showGrid = gridRows?.map((row, index) => {
    return (
      <div className='gameGridRow' key={index}>

        {row.map((cell) => {
          return (
            <SpeedBox
            clickToWin={cell.clickToWin}
            toggleBox={props.toggleBox}
            num={cell.number}
            checkedBoxes={props.checkedBoxes}
            key={cell.number} 
            />
          )
        })}
      </div>
    )
  })

  return (
    <div className='gameGrid'>
      {showGrid}

    </div>
  )
}

export default GameGrid;