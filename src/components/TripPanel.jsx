import NavigationPanel from "./NavigatinPanel";
import {NavLink} from "react-router-dom";
import React, {useState} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import ApartmentTrip from "./trips/ApartmentTrip";

export default function TripPanel(data) {
    const [tripTypeIndex, setTripTypeIndex] = useState(0);

    return(
        <div>
            <Tabs selectedIndex={tripTypeIndex} onSelect={index => setTripTypeIndex(index)} className="trip-panel">
                <TabList className="nav nav-pills col-10">
                    <Tab className="nav-item">
                        <button className="nav-link" aria-current="page">
                            <div className="nav-icon house"/>
                            <span>Житло</span>
                        </button>
                    </Tab>
                    <Tab className="nav-item">
                        <button className="nav-item nav-link">
                            <div className="nav-icon car"/>
                            <span>Оренда автомобіля</span>
                        </button>
                    </Tab>
                    <Tab className="nav-item">
                        <button className="nav-link">
                            <div className="nav-icon taxi"/>
                            <span>Таксі</span>
                        </button>
                    </Tab>
                    <Tab className="nav-item">
                        <button className="nav-link">
                            <div className="nav-icon travel"/>
                            <span>Відпочинок за обміном</span>
                        </button>
                    </Tab>
                    <div className="line"/>
                    <Tab className="nav-item yellow-item">
                        <button className="nav-link yellow">
                            <span>Всі</span>
                        </button>
                    </Tab>
                </TabList>
                <TabPanel>
                    <ApartmentTrip status={data["status"]}></ApartmentTrip>
                </TabPanel>
                <TabPanel>
                    2
                </TabPanel>
            </Tabs>
        </div>
    )
}