import React from 'react'

const Info = ({playerInputNumber, handleRestart, time, solveThePuzzle}) => {

    let myInputBoard = [];
    for(let i = 0 ; i < 9 ; i++){
        myInputBoard.push(<div
                             key = {i+1}
                            className="cell"
                            onClick={() => {
                                playerInputNumber(i+1);
                            }}
                        >{i+1}</div>)
    }
   
    let hours = Math.floor(time/3600);
    let seconds = time%60;
    let minutes = Math.floor((time%3600)/60);
    let timeToDisplay ='';

    if(hours >= 1){
        timeToDisplay = <i class="fas fa-infinity"></i>
    }
    else{
        if(minutes < 10){
            timeToDisplay += "0" + minutes + ":";
        }else{
            timeToDisplay += minutes + ":";
        }
        if(seconds < 10){
            timeToDisplay += "0" + seconds;
        }
        else{
            timeToDisplay += seconds;
        }
    }

    return (
        <section className="info-container">
            <div className="timer">
                <span><i className="far fa-clock" />{timeToDisplay}</span>
            </div>
            <div className='input-board'>
                {myInputBoard}
                <div
                    className="cell cell-0"
                    onClick={() => {
                        playerInputNumber(0);
                    }}
                    
                >0</div>
            </div>
            <div className="game-button">
                <button className="btn" onClick={handleRestart}>Restart</button>
                <button className="btn" onClick={solveThePuzzle}>Get Answer</button>
            </div>
        </section>
    )
}

export default Info
