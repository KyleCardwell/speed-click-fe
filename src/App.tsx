import { useEffect, useState, MouseEvent, useRef, useCallback } from "react";
import "./App.css";
import GameGrid from "./components/GameGrid";
import PointsBox from "./components/PointsBox";

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

function delayTimer(ms = 3000) {
	return new Promise((resolve: any) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
}

const initTime: number = 10;
const delayLength: number = 3000

function App() {
	const boxQuantity: number = 7;
	const greenSquares = boxQuantity ** 2 / 3;

	const [speedBoxes, setSpeedBoxes] = useState<gameBox[]>(
		createBoxes(boxQuantity)
	);
	const [checkedBoxes, setCheckedBoxes] = useState<Set<number>>();
	const [countDown, setCountDown] = useState(initTime);
	const [round, setRound] = useState<number>(0);
	const [pause, setPause] = useState(true);

	const totalPoints = useRef(0);
	let intervalRef = useRef(0);

	const decreaseCountdown = () =>
		setCountDown((prev) => {
			// console.log(prev)
			if (prev > 0) {
				return parseFloat((prev - 0.1).toFixed(2));
			} else {
				return prev;
			}
		});

	const generateRandom = () => {
		const randomList = new Set<number>();

		while (randomList.size < Math.floor(greenSquares)) {
			const num: number = Math.floor(boxQuantity ** 2 * Math.random());
			randomList.add(num);
		}
		return randomList;
	};

	useEffect(() => {
		setCheckedBoxes(generateRandom());
	}, []);

	useEffect(() => {
		(async () => {
			setCountDown(initTime);
			await delayTimer(delayLength);
			setPause(false);
		})();
	}, [round]);

	useEffect(() => {
		pause ? "" : (intervalRef.current = setInterval(decreaseCountdown, 100));
		return () => {
			clearInterval(intervalRef.current);
		};
	}, [pause]);

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
			setRound(round + 1);
			setPause(true);
			return () => clearTimeout(timer);
		}
	}, [speedBoxes]);

	const handleClick = (e: MouseEvent, num: number) => {
		console.log("clicked ", num);
		if (checkedBoxes?.has(num)) {
			totalPoints.current = Math.round(
				totalPoints.current +
					round +
					(greenSquares - checkedBoxes.size) * round * countDown
			);
			console.log(
				`${totalPoints.current} + ${round} +( (${greenSquares} - ${
					checkedBoxes.size
				}) * ${round} * ${countDown}) - (${
					(greenSquares - checkedBoxes.size) * round * countDown
				})`
			);
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
			alert(`oops, don't click the blues.  You scored ${totalPoints.current}`);
			setRound(0);
			totalPoints.current = 0;
			setSpeedBoxes(createBoxes(boxQuantity));
			setPause(true);
			return;
		}
	};

	return (
		<div className="App">
			<div>round {round}</div>
			<div>{countDown}</div>
			<PointsBox totalPoints={totalPoints} />
			<div className="gameContainer">
				<GameGrid
					boxQuantity={boxQuantity}
					speedBoxes={speedBoxes}
					toggleBox={handleClick}
					checkedBoxes={checkedBoxes}
				/>
			</div>
		</div>
	);
}

export default App;
