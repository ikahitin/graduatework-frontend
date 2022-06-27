import {NavLink} from "react-router-dom";
import '../../styles/profile.css'
import React, {useState} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import TripPanel from "../../components/trips/TripPanel";

export default function Trips() {
    const [tabIndex, setTabIndex] = useState(0);
    return (
        <div className="container col-9 search trips">
            <div className="heading fw-600 mb-5">Інформація про ваші бронювання</div>
            <div className="trip-types">
                <TripPanel/>
            </div>
        </div>
    )
}