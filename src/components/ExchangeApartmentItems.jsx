import ScrollToTop from "./ScrollToTop";
import {NavLink} from "react-router-dom";
import React from "react";

export default function ExchangeApartmentItems({currentItems, startDate, endDate, adults}) {
    return (
        <>
            {currentItems &&
                currentItems.map((item, key) => (
                    <div className="result-card-cover exchange" key={key}>
                        <ScrollToTop/>
                        <div className="result-card">
                            <div className="image-side">
                                <div className="image-content"
                                     style={{backgroundImage: `url("${item.images && item.images[0]}")`}}>
                                    <div className="favourite">
                                        <img src={`${process.env.PUBLIC_URL}/heart.png`} alt="favourite"/>
                                    </div>
                                </div>
                            </div>
                            <div className="content-side">
                                <div className="top-part">
                                    <div className="name">
                                        <NavLink end={true} to={{pathname: `/booking/vacation/apartments/${item.id}`}}>
                                            {item.name}
                                        </NavLink>
                                    </div>
                                    <div className="location">
                                        <div className="location-city">
                                            <a href="src/views/apartment/ApartmentResult#">{item.city}</a>
                                        </div>
                                        <div className="show-on-map">
                                            <a href="src/views/apartment/ApartmentResult#">Показати на
                                                карті</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="middle-part">
                                    <div className="up-content">
                                        <div className="detail-row">
                                            <img src={`${process.env.PUBLIC_URL}/yellow-calendar.svg`} alt=""/>
                                            <div>
                                                <div className="info-h">Дата</div>
                                                <div className="info-text">відкритий для пропозицій</div>
                                            </div>
                                        </div>
                                        <div className="detail-row">
                                            <img src={`${process.env.PUBLIC_URL}/location-yellow.svg`} alt=""/>
                                            <div>
                                                <div className="info-h">Місце</div>
                                                {item.desired_city ?
                                                    <div className="info-text">{item.desired_city}</div>
                                                    :
                                                    <div className="info-text">відкритий для пропозицій</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="down-content">
                                        <div className="detail-row">
                                            <img src={`${process.env.PUBLIC_URL}/yellow-calendar.svg`} alt=""/>
                                            <div>
                                                <div className="info-h">Тривалість</div>
                                                <div className="info-text">{item.exchange_duration}</div>
                                            </div>
                                        </div>
                                        <div className="detail-row">
                                            <img src={`${process.env.PUBLIC_URL}/yellow_person.svg`} alt=""/>
                                            <div>
                                                <div className="info-h">Кількість людей</div>
                                                <div className="info-text">до {item.people_quantity.adults.quantity} дорослих та {item.people_quantity.children.quantity} дітей</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom-part">
                                    <div className="room-desc">{item.short_description}
                                    </div>
                                    <div className="bottom-content">
                                        <div className="left-content">
                                        </div>
                                        <div className="right-content">
                                            <div className="book">
                                                <NavLink to={{
                                                    pathname: `/booking/vacation/apartments/${item.id}`
                                                }} state={{startDate: startDate, endDate: endDate}}
                                                         className="btn btn-light arrow">Переглянути</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
}