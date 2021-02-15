import React from 'react' 
import Timebar from './TimeBar.css'
import {useEffect, useState} from "react";

const testOutput = {
    "geo": {"country": "United Kingdom", "state": "England", "city": "London", "latitude": 51.505182, "longitude": -0.0999387},
    "timezone": "Europe/London",
    "timezone_offset": 0,
    "date": "2021-02-15",
    "date_time": "2021-02-15 07:00:42",
    "date_time_txt": "Monday, February 15, 2021 07:00:42",
    "date_time_wti": "Mon, 15 Feb 2021 07:00:42 +0000",
    "date_time_ymd": "2021-02-15T07:00:42+0000",
    "date_time_unix": 1613372442.965,
    "time_24": "07:00:42",
    "time_12": "07:00:42 AM",
    "week": "08",
    "month": "02",
    "year": "2021",
    "year_abbr": "21",
    "is_dst": false,
    "dst_savings": 1
};

const geolocationApi = process.env.REACT_APP_IP_GEOLOCATION_API_KEY

export default function TimeBar(props) {
    const [dstTzInfo, setDstTzInfo] = useState();
    const [date, setDate] = useState(props.date);
    const srcTzInfo = props.srcTzInfo;
    const dstLocation = props.destination_location;

    useEffect(() => {
        // fetch(`https://api.ipgeolocation.io/timezone?apiKey=${geolocationApi}&location=`
            fetch("https://google.com/timezone?apiKey=thiswillfail&location="
            + encodeURIComponent(`${dstLocation.city}, ${dstLocation.state}, ${dstLocation.country}`))
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setDstTzInfo(result);
                    setDate(changeTimezone(date, result.timezone));
                },
                (error) => {
                    console.log(error);
                    setDstTzInfo(testOutput);
                    setDate(changeTimezone(date, testOutput.timezone));
                }
            )
    }, [])

    function changeTimezone(date, ianatz) {

        // suppose the date is 12:00 UTC
        var invdate = new Date(date.toLocaleString('en-US', {
            timeZone: ianatz
        }));

        // then invdate will be 07:00 in Toronto
        // and the diff is 5 hours
        var diff = date.getTime() - invdate.getTime();

        // so 12:00 in Toronto is 17:00 UTC
        return new Date(date.getTime() - diff); // needs to substract

    }

    function signedInt(relativeOffset) {
        return relativeOffset >= 0 ? '+' + relativeOffset : relativeOffset;
    }

    function getHoursShiftedBy(xxx) {
        const hours = [
            <li key="00" className="tod_c"><b>12</b> <u>am</u></li>,
            <li key="01" className="tod_n"><b>1</b> <u>am</u></li>,
            <li key="02" className="tod_n"><b>2</b> <u>am</u></li>,
            <li key="03" className="tod_n"><b>3</b> <u>am</u></li>,
            <li key="04" className="tod_n"><b>4</b> <u>am</u></li>,
            <li key="05" className="tod_n"><b>5</b> <u>am</u></li>,
            <li key="06" className="tod_m"><b>6</b> <u>am</u></li>,
            <li key="07" className="tod_m"><b>7</b> <u>am</u></li>,
            <li key="08" className="tod_d"><b>8</b> <u>am</u></li>,
            <li key="09" className="tod_d"><b>9</b> <u>am</u></li>,
            <li key="10" className="tod_d"><b>10</b> <u>am</u></li>,
            <li key="11" className="tod_d"><b>11</b> <u>am</u></li>,
            <li key="12" className="tod_d"><b>12</b> <u>pm</u></li>,
            <li key="13" className="tod_d"><b>1</b> <u>pm</u></li>,
            <li key="14" className="tod_d"><b>2</b> <u>pm</u></li>,
            <li key="15" className="tod_d"><b>3</b> <u>pm</u></li>,
            <li key="16" className="tod_d"><b>4</b> <u>pm</u></li>,
            <li key="17" className="tod_d"><b>5</b> <u>pm</u></li>,
            <li key="18" className="tod_e"><b>6</b> <u>pm</u></li>,
            <li key="19" className="tod_e"><b>7</b> <u>pm</u></li>,
            <li key="20" className="tod_e"><b>8</b> <u>pm</u></li>,
            <li key="21" className="tod_e"><b>9</b> <u>pm</u></li>,
            <li key="22" className="tod_n"><b>10</b> <u>pm</u></li>,
            <li key="23" className="tod_n tod_boundary"><b>11</b> <u>pm</u></li>,
        ];
        return hours.slice(xxx, hours.length).concat(hours.slice(0, xxx));
    }

    if (!dstTzInfo || !srcTzInfo) return <div>Loading...</div>
    const relativeOffset = dstTzInfo.timezone_offset - srcTzInfo.timezone_offset;

    return <div id="3435910" className="container srt">
        <div className="name">
            <span>{props.name}</span>
        </div>
        <div className="icon" title={relativeOffset + " hours from Home (GMT" + signedInt(srcTzInfo.timezone_offset) + " <> GMT" + signedInt(dstTzInfo.timezone_offset) + ')'}>
            <span>{signedInt(relativeOffset)}</span>
        </div>
        <div className="location">
            <div className="city"><b>{dstLocation.city}</b> <small
                title={"GMT" + signedInt(srcTzInfo.timezone_offset) + " <> GMT" + signedInt(dstTzInfo.timezone_offset)}>{"GMT" + signedInt(dstTzInfo.timezone_offset)}</small></div>
            <div className="country">{dstLocation.country}</div>
        </div>
        <div className="data ">
            <div className="time">
                <span className="th">{date.getHours() % 12 || 12}</span>
                <span className="ts">:</span>
                <span className="tm">{date.getMinutes()}</span>
                <span className="ampm">{date.getHours() >= 12 ? 'pm' : 'am'}</span>
            </div>
            <div className="date">{date.toLocaleDateString()}</div>
        </div>
        <div className="hourline">
            <ul className="_AP">
                { getHoursShiftedBy(relativeOffset) }
            </ul>
        </div>
    </div>;
}
