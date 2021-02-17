import React from 'react' 
import './TimeBar.css'
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
    const dstLocation = props.dst_location;
    const srcAvailability = props.src_availability || {
        12: true,
        17: true,
        18: true,
        19: true,
        20: true,
    };
    const dstAvailability = props.dst_availability || {
        12: true,
        17: true,
        18: true,
        19: true,
        20: true,
    };

    useEffect(() => {
        fetch(`https://api.ipgeolocation.io/timezone?apiKey=${geolocationApi}&location=`
            // fetch("https://google.com/timezone?apiKey=thiswillfail&location="
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
        const invdate = new Date(date.toLocaleString('en-US', {
            timeZone: ianatz
        }));

        // then invdate will be 07:00 in Toronto
        // and the diff is 5 hours
        const diff = date.getTime() - invdate.getTime();

        // so 12:00 in Toronto is 17:00 UTC
        return new Date(date.getTime() - diff); // needs to substract

    }

    function signedInt(relativeOffset) {
        return relativeOffset >= 0 ? '+' + relativeOffset : relativeOffset;
    }

    function getHoursShiftedBy(offset) {
        const hours = [];
        for (let i = 0; i < 24; i++) {
            let colorClass = "tod_d";
            if (srcAvailability[i-offset] && dstAvailability[i]) {
                colorClass = "tod_n"
            } else if(dstAvailability[i]) {
                colorClass = "tod_m"
            }
            if (i === 0) {
                colorClass += " tod_boundary_l"
            } else if (i === 23) {
                colorClass += " tod_boundary_r"
            }

            hours.push(<li key={i} className={colorClass}><b>{i % 12 || 12}</b> <u>{i < 12 ? "am" : "pm"}</u></li>);
        }
        return hours.slice(offset, hours.length).concat(hours.slice(0, offset));
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
                <span className="th">{String(date.getHours() % 12 || 12).padStart(2, '0')}</span>
                <span className="ts">:</span>
                <span className="tm">{ String(date.getMinutes()).padStart(2, '0')}</span>
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
