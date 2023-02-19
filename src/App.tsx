import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import SpeedBox from "./components/SpeedBox";

interface gameBox {
  clickToWin: boolean
}

const boxes: gameBox[] = [
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
	{ clickToWin: false },
];


function App() {
	const [speedBoxes, setSpeedBoxes] = useState<gameBox[]>(boxes);
  const [checkedBoxes, setCheckedBoxes] = useState<Set<number>>()

  const boxesToCheck = new Set<number>()

  useEffect(() => {
    while (boxesToCheck.size < 8) {
      const num: number = Math.floor(25 * Math.random())
      boxesToCheck.add(num)
    }
  
    setCheckedBoxes(boxesToCheck)

  }, [])

  useEffect(() => {
    setSpeedBoxes(speedBoxes.map(function(speedBox: gameBox, index: number): gameBox {
      if (checkedBoxes?.has(index)) {
        speedBox.clickToWin = true
      }
      return speedBox
    }))
  }, [checkedBoxes])

  const handleClick = (num: number) => {
    setSpeedBoxes(speedBoxes.map(function(speedBox: gameBox, index: number): gameBox {
      if (num === index) {
        speedBox.clickToWin = !speedBox.clickToWin
      }
      return speedBox
    }))
  }





	return (
		<div className="App">
			<div className="gameContainer">
				<div className="gameBoard">
					{speedBoxes.map((box, index) => {
						// console.log("box", box);
						return (
							<SpeedBox
								clickToWin={box.clickToWin}
								toggleBox={handleClick}
								num={index}
                checkedBoxes={checkedBoxes}
								key={index}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default App;
