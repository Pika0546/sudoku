import React, {useState, useEffect} from 'react';
import GameBoard from './components/GameBoard';
import Info from './components/Info';
import Announcement from './components/Announcement';
import './App.css';



function App() {
	const size = 9;
	const removeNum = 35;
	let result = [];
	for(let i = 0; i < size; i++){
		let temp = [];
		for(let j = 0 ; j < size ; j ++){
			temp.push(0);
		}
		result.push(temp);
	}
	const [gameBoard, setGameBoard] = useState(result)
	const [boardStatus, setBoardStatus] = useState(result);
	//BoardStatus = 1 là ô trống để điền
	//BoardStatus = -1 là player điền nhưng số sai
	//BoardStatus = 2 là player điền đúng
	//BoardStatus = 0 là ô có sẵn
	const [cellSelected, setCellSelected] = useState([-1,-1])
	const [time, setTime] = useState(0);
	const [closePopUp, setClosePopUp] = useState(true);
	const [isWin, setIsWin] = useState(false)

	

	function getRndInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1) ) + min;
	  }

	// const isSafeRow = (row, matrix) => {
	// 	let myS = [...new Set(matrix[row])];
	// 	return myS.length === 9;
	// }

	// const isSafeColumn = (col, matrix) => {
	// 	let temp = [];
	// 	for(let i = 0 ; i < size ; i ++){
	// 		temp.push(matrix[i][col]);
	// 	}
	// 	let myS = [...new Set(temp)];
	// 	return myS.length === 9;
	// }

	// const isSafeBox = (row, col, matrix) => {
	// 	let temp = [];
	// 	for(let i = 0 ; i < 3 ; i++){
	// 		for(let j = 0 ; j < 3 ; j ++){
	// 			temp.push(matrix[i + row][j + col]);
	// 		}
	// 	}
	// 	let myS = [...new Set(temp)];
	// 	return myS.length === 9;
	// }

	const isUnUsedInBox = (row, col, matrix, num) => {
		let temp = [];
		for(let i = 0 ; i < 3 ; i++){
			for(let j = 0 ; j < 3 ; j ++){
				temp.push(matrix[i + row][j + col]);
			}
		}
		return !temp.includes(num);
	}

	const isUnUsedInRow = (row, matrix, num) => {
		return !matrix[row].includes(num);
	}

	const isUnUsedInCol = (col, matrix, num) => {
		let temp = [];
		for(let i = 0 ; i < size ; i ++){
			temp.push(matrix[i][col]);
		}
		return !temp.includes(num);
	}

	const isSafeToUse = (row, col, matrix, num) => {
		return   isUnUsedInBox(row - row%3, col - col%3, matrix, num)&&isUnUsedInRow(row, matrix, num)&&isUnUsedInCol(col, matrix, num) ;
	}

	const fillThreeFirstBox = (matrix) => {
		for(let i = 0 ; i < size; i += 3){
			let num = 0;
			for(let j = 0 ; j < 3; j ++){
				for(let k = 0 ; k < 3 ; k++){
					do{
						num = getRndInteger(1,size)
					}
					while(!isSafeToUse(i + j, i + k, matrix, num));
					matrix[i + j][i + k] = num;
				}
			}
		}
	}

	const fillAllOtherBox = (matrix, startRow, startCol) => {
		if(startCol >= size && startRow < size - 1){
			startRow += 1;
			startCol = 0;
		}
		if(startCol >= size && startRow >= size){
			return true;
		}
		if(startRow < 3){
			if(startCol < 3){
				startCol = 3;
			}
		}
		else if(startRow < size - 3){
			if(startCol === Math.floor(startRow/3) * 3){
				startCol += 3;
			}
		}
		else {
			if(startCol === size - 3){
				startRow += 1;
				startCol = 0;
				if(startRow >= size){
					return true;
				}
			}
		}

		for(let num =  1; num <= size; num ++){
			if(isSafeToUse(startRow, startCol, matrix, num)){
				matrix[startRow][startCol] = num;
				if(fillAllOtherBox(matrix, startRow, startCol + 1)){
					return true;
				}
				matrix[startRow][startCol] = 0
			}
		}
		return false;
	}

	const removeSomeCell = (matrix, k) => {
		for(let i = 0 ; i < k ; i++){
			let temp = 0;
			do {
				temp = getRndInteger(0, 80);
			} while (!matrix[Math.floor(temp/size)][temp%size]);
			matrix[Math.floor(temp/size)][temp%size] = 0;
		}
	}

	const checkWin = (status) => {
		for(let i = 0 ; i < size ; i++){
			for(let j = 0 ; j < size; j++){
				if(status[i][j] === 1 || status[i][j]=== -1){
					return false;
				}
			}
		}
		return true;
	}

	const playerClickOnGameBoard = (row, col) => {
	
		setCellSelected([row, col]);
	}

	const createMatrix = () =>{
		let result = [];
		for(let i = 0; i < size; i++){
			let temp = [];
			for(let j = 0 ; j < size ; j ++){
				temp.push(0);
			}
			result.push(temp);
		}
		fillThreeFirstBox(result);
		fillAllOtherBox(result, 0, 3);
		removeSomeCell(result, removeNum);
		return result;
	}

	const playerInputNumber = (num) => {
		if(isWin){
			return;
		}

		if(cellSelected[0] !== -1 && cellSelected[1] !== -1){	
		
		
			if(boardStatus[cellSelected[0]][cellSelected[1]] !== 0){
				
				
				let tempGameBoard = gameBoard.map((row) => {
					return row.slice();
				});
				let x = cellSelected[0];
				let y = cellSelected[1];
				let tempStatus = boardStatus.map((row) => {
					return row.slice();
				});
				tempGameBoard[x][y] = num;
				
				if(num !== 0){
					tempStatus[x][y] = 2;
				}
				else{
					tempStatus[x][y] = 1;
				}
				for(let i = 0 ;i < 9 ; i++){
					if(tempStatus[x][i] !== 0 && tempStatus[x][i] !== 1){
						let temp = tempGameBoard[x][i];
						tempGameBoard[x][i] = 0;
						if(isSafeToUse(x, i, tempGameBoard, temp)){
							tempStatus[x][i] = 2;
						}
						else{
							
							tempStatus[x][i] = -1;
						}
						tempGameBoard[x][i] = temp;
					}
				}

				for(let i = 0 ;i < 9 ; i++){
					if(tempStatus[i][y] !== 0 && tempStatus[i][y] !== 1){
						let temp = tempGameBoard[i][y];
						tempGameBoard[i][y] = 0;
						if(isSafeToUse(i, y, tempGameBoard, temp)){
							tempStatus[i][y] = 2;
						}
						else{
							
							tempStatus[i][y] = -1;
						}
						tempGameBoard[i][y] = temp;
					}
				}

				let startBoxR = x - x%3;
				let startBoxC = y - y%3;
				for(let i = 0 ;i < 3 ; i ++){
					for(let j = 0 ; j < 3 ; j++){
						if(tempStatus[startBoxR + i][startBoxC + j] !== 0 && tempStatus[startBoxR + i][startBoxC + j] !== 1){
							let temp = tempGameBoard[startBoxR + i][startBoxC + j];
							tempGameBoard[startBoxR + i][startBoxC + j] = 0;
							if(isSafeToUse(startBoxR + i, startBoxC + j, tempGameBoard, temp)){
								tempStatus[startBoxR + i][startBoxC + j] = 2;
							}
							else{
								
								tempStatus[startBoxR + i][startBoxC + j] = -1;
							}
							tempGameBoard[startBoxR + i][startBoxC + j] = temp;
						}
					}
				}
				setGameBoard(tempGameBoard);
				setBoardStatus(tempStatus);
				let tempIsWin = checkWin(tempStatus);
				if(tempIsWin){
					setClosePopUp(false);
					setIsWin(true);
				}
			} 
		}
	}

	const init = () => {
		let tempGameBoard = createMatrix();
		let tempBoardStatus = tempGameBoard.map((row,rIndex) => {
			let tempRow = row.map((item, rIndex) => {
				return item !== 0 ? 0 : 1;
			})
			return tempRow;
		})
		setCellSelected([-1, -1])
		setIsWin(false);
		setClosePopUp(true);
		setTime(0);
		setGameBoard(tempGameBoard);
		setBoardStatus(tempBoardStatus);
	}

	const handleClosePopUp = () => {
		setClosePopUp(true);
	}

	const solveSudoku = (sudoku, row, col) =>{
		if(row === size - 1 && col === size){
			return true;
		}
		if(col === size){
			row += 1;
			col = 0;
		}
		if(sudoku[row][col] > 0){
			return solveSudoku(sudoku,row, col + 1);
		}

		for(let i = 1 ; i < 10 ; i++){
			if(isSafeToUse(row, col, sudoku, i)){
				sudoku[row][col] = i;
				if(solveSudoku(sudoku,row, col + 1)){
					return true;
				}
			}
			sudoku[row][col] = 0;
		}return false;
	}
	
	const solveThePuzzle = () =>{
		if(!isWin){
			setIsWin(true);
			let matrixToSolve = [];
			let newStatusBoard = [];
			for(let i = 0 ; i < size ; i++){
				let tempSudokuRow = [];
				let tempStatusRow = [];
				for(let j = 0 ; j <size ; j++){
					if(boardStatus[i][j] === 0){
						tempSudokuRow.push(gameBoard[i][j]);
						tempStatusRow.push(0);
					}
					else{
						tempSudokuRow.push(0);
						tempStatusRow.push(2);
					}
				}
				newStatusBoard.push(tempStatusRow);
				matrixToSolve.push(tempSudokuRow);
			}
			solveSudoku(matrixToSolve, 0, 0);
			
			setBoardStatus(newStatusBoard);
			setGameBoard(matrixToSolve);
		}
	}

	const handleKeyBoardEvent = (event) => {
		let key = event.keyCode;
		let num = 0;
		switch (key) {
			case 49: case 97: 
				num = 1;
				break;
			case 50: case 98: 
				num = 2;
				break;
			case 51: case 99: 
				num = 3;
				break;
			case 52: case 100: 
				num = 4;
				break;
			case 53: case 101: 
				num = 5;
				break;
			case 54: case 102: 
				num = 6;
				break;
			case 55: case 103: 
				num = 7;
				break;
			case 56: case 104: 
				num = 8;
				break;
			case 57: case 105: 
				num = 9;
				break;
			case 48: case 96: 
				num = 0;
				break;
			default:
				break;
		}
		playerInputNumber(num);
	}	

	useEffect(() => {
		init();
		
	},[])

	useEffect(() => {
		if(!isWin){
			let intervalId = setInterval(()=>{
				let temp = time + 1;
				setTime(temp);
			}, 1000)
	
			return () => {
				clearInterval(intervalId);
			}
		}
	},[time])

	useEffect(()=>{
		window.addEventListener("keydown", handleKeyBoardEvent)
		return () => {
			window.removeEventListener("keydown", handleKeyBoardEvent)
		}
	})

	return (
		<div className="container">
			<section className="header">
				<h1>SUDOKU</h1>
			</section>
			
			<GameBoard
				gameBoard={gameBoard}
				cellSelected={cellSelected}
				statusBoard = {boardStatus}
				playerClickOnGameBoard={playerClickOnGameBoard}
			></GameBoard>
			
			<Info
				playerInputNumber={playerInputNumber}
				handleRestart={init}
				solveThePuzzle={solveThePuzzle}
				time={time}
			></Info>


			{closePopUp ? "" : <Announcement time={time} restart={init} close={handleClosePopUp}></Announcement>}

		</div>
	);
}

export default App;
