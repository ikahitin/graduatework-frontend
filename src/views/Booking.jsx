import {Outlet} from "react-router-dom";
import NavigationPanel from "../components/NavigatinPanel";
import React from "react";

export default function Booking() {
    return(
        <div>
            <NavigationPanel />
            <Outlet/>
        </div>
    )
}