import {NavLink, useLocation} from "react-router-dom";
import React, {useState} from "react";

export default function NavigationPanel() {
    const location = useLocation()
    const [showStep, setShowStep] = useState(false);
    const [activeStep, setActiveStep] = useState();

    React.useEffect(() => {
        if (location.state !== null) {
            if (location.state.hasOwnProperty('booking')) {
                setShowStep(true)
                setActiveStep(location.state.booking)
            }
        }
    }, [location]);
    if (showStep) {
        return (
            <div className="nav nav-pills col-9 nav-process">
                <div className={"icon-booking-step " + (activeStep[0] ? 'active-step' : 'hidden')}>
                    <div className="step-number">1</div>
                    <div className="step-entity">
                        <div className="nav-icon house"/>
                        <span>Житло</span>
                    </div>
                </div>
                <div className="dots-space horizontal">
                    <img src={`${process.env.PUBLIC_URL}/dots_horizontal.svg`} alt="dice"/>
                </div>
                <div className={"icon-booking-step " + (activeStep[1] ? 'active-step' : 'hidden')}>
                    <div className="step-number">2</div>
                    <div className="step-entity">
                        <div className="nav-icon car"/>
                        <span>Оренда автомобіля</span>
                    </div>
                </div>
                <div className="dots-space horizontal">
                    <img src={`${process.env.PUBLIC_URL}/dots_horizontal.svg`} alt="dice"/>
                </div>
                <div className={"icon-booking-step " + (activeStep[2] ? 'active-step' : 'hidden')}>
                    <div className="step-number">3</div>
                    <div className="step-entity">
                        <div className="nav-icon taxi"/>
                        <span>Таксі</span>
                    </div>
                </div>
                <div className="dots-space horizontal">
                    <img src={`${process.env.PUBLIC_URL}/dots_horizontal.svg`} alt="dice"/>
                </div>
                <div className={"icon-booking-step " + (activeStep[3] ? 'active-step' : 'hidden')}>
                    <div className="step-number">4</div>
                    <div className="step-entity">
                        <div className="nav-icon travel"/>
                        <span>Відпочинок за обміном</span>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div className="nav nav-pills col-11">
            <NavLink className="nav-item" to="/booking/apartments">
                <button className="nav-link" aria-current="page">
                    <div className="nav-icon house"/>
                    <span>Житло</span>
                </button>
            </NavLink>
            <NavLink className="nav-item" to="/booking/cars">
                <button className="nav-item nav-link">
                    <div className="nav-icon car"/>
                    <span>Оренда автомобіля</span>
                </button>
            </NavLink>
            <NavLink className="nav-item" to="/booking/taxi">
                <button className="nav-link">
                    <div className="nav-icon taxi"/>
                    <span>Таксі</span>
                </button>
            </NavLink>
            <NavLink className="nav-item" to="/booking/vacation">
                <button className="nav-link">
                    <div className="nav-icon travel"/>
                    <span>Відпочинок за обміном</span>
                </button>
            </NavLink>
            <div className="line"/>
            <NavLink className="nav-item yellow-item" to="/booking/one-step">
                <button className="nav-link yellow">
                    <span>Забронювати за один крок</span>
                </button>
            </NavLink>
        </div>
    )
}

