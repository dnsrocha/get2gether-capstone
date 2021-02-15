import React, {useEffect, useState} from 'react'
import TimeBar from "./TimeBar";

const x = {
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

export default function Locations() {
    const [srcTzInfo, setSrcTzInfo] = useState();
    const date = new Date();

    useEffect(() => {
        // fetch(`https://api.ipgeolocation.io/timezone?apiKey=${geolocationApi}&location=`
        fetch("https://google.com/timezone?apiKey=thiswillfail&location="
            + encodeURIComponent(`${auth_user_location_info.city}, ${auth_user_location_info.state}, ${auth_user_location_info.country}`))
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setSrcTzInfo(result);
                },
                (error) => {
                    console.log(error);
                    setSrcTzInfo(x);
                }
            )
    }, [])

    const auth_user_location_info = {
        city: 'Belo Horizonte',
        state: 'Minas Gerais',
        country: 'Brazil'
    };
    const contact_location_info1 = {
        city: 'Seattle',
        state: 'WA',
        country: 'United States'
    };
    const contact_location_info2 = {
        city: 'Dublin',
        country: 'Ireland'
    };
    const contact_location_info3 = {
        city: 'Sidney',
        country: 'Australia'
    };

    return (
        <div id="locations">
            <TimeBar name="Thiago Witt" date={date} srcTzInfo={srcTzInfo} destination_location={auth_user_location_info}/>
            <TimeBar name="Denise Rocha" date={date} srcTzInfo={srcTzInfo} destination_location={contact_location_info1}/>
            <TimeBar name="Nina Rabello" date={date} srcTzInfo={srcTzInfo} destination_location={contact_location_info2}/>
            <TimeBar name="Jin Jarin" date={date} srcTzInfo={srcTzInfo} destination_location={contact_location_info3}/>
        </div>
    )
}
