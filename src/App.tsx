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



const createBoxes = (quantity: number): gameBox[] => {
  const boxes: gameBox[] = []

  for (let i = 0; i < quantity ** 2; i++) {
    boxes.push({clickToWin: false})
  }
  return boxes
}

function App() {

  const boxQuantity: number = 5

	const [speedBoxes, setSpeedBoxes] = useState<gameBox[]>(createBoxes(boxQuantity));
  const [checkedBoxes, setCheckedBoxes] = useState<Set<number>>()

  const generateRandom = () => {

    const randomList = new Set<number>()

    while (randomList.size < 8) {
      const num: number = Math.floor(25 * Math.random())
      randomList.add(num)
    }
    return randomList
  }

  useEffect(() => {
    setCheckedBoxes(generateRandom())

  }, [])

  useEffect(() => {
    setSpeedBoxes(speedBoxes.map(function(speedBox: gameBox, index: number): gameBox {
      if (checkedBoxes?.has(index)) {
        speedBox.clickToWin = true
      }
      return speedBox
    }))
  }, [checkedBoxes])

  useEffect(() => {
    if (speedBoxes.every(function(speedBox: gameBox): boolean {
      if (!speedBox.clickToWin) {
        return true
      }
      return false
    }) ) {
      const timer = setTimeout(() => {
        
        setCheckedBoxes(generateRandom())
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [speedBoxes])

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
