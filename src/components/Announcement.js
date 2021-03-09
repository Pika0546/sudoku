import React from 'react'

const Announcement = ({restart, close, time}) => {
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
        <section className="announcement-container">
            <div className="announcement">
                <h1><i className="far fa-check-circle" /></h1>
                <h2>Congratulations !</h2>
                <h4>You solved the puzzle in <i className="far fa-clock" />{timeToDisplay}</h4>
                <button className="btn" onClick={restart}>Restart</button>
                <button className="btn" onClick={close}>Close</button>
            </div>
      </section>
    )
}

export default Announcement
