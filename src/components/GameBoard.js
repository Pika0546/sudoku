import React from 'react'

const GameBoard = ({gameBoard, playerClickOnGameBoard, cellSelected, statusBoard}) => {

    let table = gameBoard.map((row, rIndex) => {
        let tempRow = row.map((item, cIndex) => {
            let className = "cell";
            if((cIndex + 1)%3 === 0){
                className += " right-border-2"
            }
            if(rIndex === cellSelected[0] && cIndex === cellSelected[1]){
                className += " is-selected";
            }
            else if(rIndex === cellSelected[0] || cIndex === cellSelected[1]){
                className += " is-around-selected";
            }else {
                if(cellSelected[0] >= 0 && cellSelected[1] >= 0){
                    let startR = cellSelected[0] - cellSelected[0]%3;
                    let startC = cellSelected[1] - cellSelected[1]%3;
                    if(rIndex >= startR && rIndex < startR + 3 && cIndex >= startC && cIndex < startC + 3){
                        className += " is-around-selected";
                    }
                }
            }

           

            if(statusBoard[rIndex][cIndex] === 2){
                className += " player-number-ok";
            }
            else if(statusBoard[rIndex][cIndex] === -1){
                className += " player-number-not-ok"
            }

            return <td 
                        key={cIndex} 
                        className={className}
                        onClick={()=>{
                            playerClickOnGameBoard(rIndex, cIndex);
                        }}
                    >{item ? item : ""}</td>
        })
        return <tr key={rIndex}>{tempRow}</tr>
    })


    return (
        <section className="game-board-container">
            <table className="game-board">
                <tbody>
                    {table}
                </tbody>
            </table>
        </section>
    )
}

export default GameBoard
