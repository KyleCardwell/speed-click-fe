import { useEffect, useState, MouseEvent, EventHandler } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import SpeedBox from "./components/SpeedBox";
import GameGrid from "./components/GameGrid";

export interface gameBox {
	clickToWin: boolean;
  number: number;
}

const createBoxes = (quantity: number): gameBox[] => {
	const boxes: gameBox[] = [];

	for (let i = 0; i < quantity ** 2; i++) {
		boxes.push({ clickToWin: false, number: i });
	}
	return boxes;
};

function App() {
	const boxQuantity: number = 6;

	const [speedBoxes, setSpeedBoxes] = useState<gameBox[]>(
		createBoxes(boxQuantity)
	);
	const [checkedBoxes, setCheckedBoxes] = useState<Set<number>>();

	const generateRandom = () => {
		const randomList = new Set<number>();

		while (randomList.size < Math.floor((boxQuantity ** 2)/3)) {
			const num: number = Math.floor(boxQuantity ** 2 * Math.random());
			randomList.add(num);
		}
		return randomList;
	};

	useEffect(() => {
		setCheckedBoxes(generateRandom());
	}, []);

	useEffect(() => {
		setSpeedBoxes(
			speedBoxes.map(function (speedBox: gameBox, index: number): gameBox {
				if (checkedBoxes?.has(index)) {
					speedBox.clickToWin = true;
				}
				return speedBox;
			})
		);
	}, [checkedBoxes]);

	useEffect(() => {
		if (
			speedBoxes.every(function (speedBox: gameBox): boolean {
				if (!speedBox.clickToWin) {
					return true;
				}
				return false;
			})
		) {
			const timer = setTimeout(() => {
				setCheckedBoxes(generateRandom());
			}, 200);
			return () => clearTimeout(timer);
		}
	}, [speedBoxes]);

	const handleClick = (e: MouseEvent, num: number) => {
    console.log('clicked ', num)
		if (checkedBoxes?.has(num)) {
			setSpeedBoxes(
				speedBoxes.map(function (speedBox: gameBox, index: number): gameBox {
					if (num === index) {
						speedBox.clickToWin = !speedBox.clickToWin;
						checkedBoxes.delete(num);
					}
					return speedBox;
				})
			);
		} else {
			alert("oops, don't click the blues");
			return;
		}
	};

	return (
		<div className="App">
			<div className="gameContainer">
        <GameGrid
          boxQuantity={boxQuantity}
          speedBoxes={speedBoxes}
          toggleBox={handleClick}
          checkedBoxes={checkedBoxes}
        />
				{/* <div className="gameBoard">
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
				</div> */}
			</div>
		</div>
	);
}

export default App;
