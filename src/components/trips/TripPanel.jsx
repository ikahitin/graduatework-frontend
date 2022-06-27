import React, {useState} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import ApartmentTrip from "./ApartmentTrip";
import CarTrip from "./CarTrip";
import TaxiTrip from "./TaxiTrips";

export default function TripPanel({status}) {
    const [tripTypeIndex, setTripTypeIndex] = useState(0);
    return(
        <div>
            <ApartmentTrip status={"active"}></ApartmentTrip>
            <ApartmentTrip status={"planned"}></ApartmentTrip>
            <CarTrip status={"active"}></CarTrip>
            <CarTrip status={"planned"}></CarTrip>
            <TaxiTrip status={"active"}></TaxiTrip>
            <TaxiTrip status={"planned"}></TaxiTrip>
        </div>
    )
}