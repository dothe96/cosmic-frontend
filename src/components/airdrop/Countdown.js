import { useState, useEffect } from 'react';
import claimApi from '../../api/claimApi';

function Countdown() {

    const [textDay, setTextDay] = useState("0");
    const [textHour, setTextHour] = useState("00");
    const [textMinute, setTextMinute] = useState("00");
    const [textSecond, setTextSecond] = useState("00");

    useEffect(() => {
        let endTime = 0;
        const fetchEndTime = async () => {
            const endTimeData = await claimApi.getAirdropEndTime();
            endTime = endTimeData.airDropEndTime ||  new Date().getTime();
            setInterval(countdown, 1000);
        };
        const countdown = () => {
            const currentTime = new Date().getTime();
            const gap = endTime - currentTime;
        
            const second = 1 * 1000;
            const minutes = second * 60;
            const hour = minutes * 60;
            const day = hour * 24;
    
            setTextDay(Math.floor(gap / day).toString());
            setTextHour(Math.floor((gap % day) / hour).toString());
            setTextMinute(Math.floor((gap % hour) / minutes).toString());
            setTextSecond(Math.floor((gap % minutes) / second).toString());
        };
        fetchEndTime();
    }, []);

    return ( 
        <div className="countdown-wrapper">
            <div className="countdown">
            <div className="container-day">
                <h1 className="day">{textDay}</h1>
                <span>Days</span>
            </div>
            <div className="container-hour">
                <h1 className="hour">{textHour}</h1>
                <span>Hours</span>
            </div>
            <div className="container-minutes">
                <h1 className="minutes">{textMinute}</h1>
                <span>Minutes</span>
            </div>
            <div className="container-seconds">
                <h1 className="seconds">{textSecond}</h1>
                <span>Seconds</span>
            </div>
            </div>
        </div>
     );
}

export default Countdown;