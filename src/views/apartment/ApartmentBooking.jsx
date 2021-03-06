import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import '../../styles/apartmentbooking.css'
import React, {useState} from "react";
import ScrollToTop from "../../components/ScrollToTop";
import moment from "moment/moment";
import API from "../../api";
import amenities from "../../utils/amenities.json";
import {getNumberOfNights, getStars, getTotalPrice} from "../../utils/helpers";

export default function ApartmentBooking() {
    const navigate = useNavigate();
    const location = useLocation()
    const {startDate, endDate, name, phone, email, comment, arrivingHour} = location.state

    const {apartment_id} = useParams();
    const [apartment, setApartment] = useState({images: [], amenities: [], reviews: []});

    const [bookingState, setBookingState] = useState()
    React.useEffect(() => {
        if (location.state !== null) {
            if (location.state.hasOwnProperty('booking')) {
                setBookingState({"booking": location.state.booking})
            }
        }
    }, []);

    function handleSubmit(e) {
        e.preventDefault()
        const form = e.target;
        const stateObj = {
            startDate: startDate,
            endDate: endDate,
            name: form.name.value,
            phone: form.phone.value,
            email: form.email.value,
            comment: form.comment.value,
            arrivingHour: form.arrivingHour.value,
            ...bookingState
        };

        navigate(`/booking/apartments/${apartment_id}/booking/confirmation`, {state: stateObj});
    }

    React.useEffect(() => {
        const url = `apartment/${apartment_id}`;

        const fetchData = async () => {
            try {
                const response = await API.get(url);
                const json = await response.data;
                setApartment(json)
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, [apartment_id]);

    return (
        <div className="container col-10 search">
            <ScrollToTop/>
            <div className="breadcrumb">
                <NavLink end to="/">??????????????</NavLink>
                <NavLink end={true} to="/booking/apartments">??????????</NavLink>
                <NavLink end={true} to="/booking/apartments/search">???????????????????? ????????????</NavLink>
                <NavLink end={true} to={{
                    pathname: `/booking/apartments/${apartment_id}`
                }}>{apartment.name}</NavLink>
                <NavLink end={true} to={{
                    pathname: `/booking/apartments/${apartment_id}/booking`
                }}>????????????????????</NavLink>
            </div>
            <div className="booking-info">
                <div className="apartment-info">
                    <div className="small-heading fw-600">?????????????????? ???????????????????? ?????? ????????????????????</div>
                    <div className="result-card-cover">
                        <div className="result-card">
                            <div className="image-side">
                                <div className="image-content"
                                     style={{backgroundImage: `url("${apartment.images && apartment.images[0]}")`}}>
                                </div>
                            </div>
                            <div className="content-side">
                                <div className="top-part">
                                    <div className="name">
                                        <NavLink end={true} to={{
                                            pathname: `/booking/apartments/${apartment.id}`
                                        }}>{apartment.name}</NavLink>
                                    </div>
                                    <div className="location">
                                        <div className="location-city">
                                            <a href="src/views/apartment/ApartmentBooking#">{apartment.city}</a>
                                        </div>
                                        <div className="show-on-map">
                                            <a href="src/views/apartment/ApartmentBooking#">???????????????? ???? ??????????</a>
                                        </div>
                                        <div className="centre-distance">{apartment.distance_from_center} ???? ??????
                                            ????????????
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom-part">
                                    <div className="room-desc">{apartment.short_description}
                                    </div>
                                    <div className="bottom-content">
                                        <div className="left-content">
                                            <div className="bed-desc">
                                                2 ?????????????????????? ??????????
                                            </div>
                                            <div className="room-rating">
                                                <span>{apartment.rating}</span>
                                                <div className="stars">
                                                    {getStars(2)}
                                                </div>
                                            </div>
                                            <div className="reviews">
                                                <div className="reviews-images">
                                                    <div className="img"
                                                         style={{backgroundImage: `url("/profile-pic.jpeg")`}}/>
                                                    <div className="img"
                                                         style={{backgroundImage: `url("/profile-pic2.jpeg")`}}/>
                                                    <div className="img"
                                                         style={{backgroundImage: `url("/profile-pic3.jpeg")`}}/>
                                                </div>
                                                <span>18 ????????????????</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="general-info">
                    <div className="small-heading fw-600">?????????????? ????????????????????</div>
                    <div className="general-info-block">
                        <div className="gi-child details bottom-space">
                            <div className="up-content">
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-calendar.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">???????? ????????????</div>
                                        <div className="info-text">{moment(startDate).format('ddd, D MMM. YYYY')}</div>
                                    </div>
                                </div>
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-clock.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">?????? ????????????</div>
                                        <div className="info-text">?? 14:00</div>
                                    </div>
                                </div>
                            </div>
                            <div className="down-content">
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-calendar.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">???????? ????????????</div>
                                        <div className="info-text">{moment(endDate).format('ddd, D MMM. YYYY')}</div>
                                    </div>
                                </div>
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-clock.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">?????? ????????????</div>
                                        <div className="info-text">???? 12:00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gi-child details">
                            <div className="up-content">
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">?????????????????? ???????????? ??????????????????????:</div>
                                        <div className="info-text">{getNumberOfNights(startDate, endDate)} ??????????</div>
                                    </div>
                                </div>
                            </div>
                            <div className="down-content">
                                <div className="detail-row">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                                    <div>
                                        <div className="info-h">???? ????????????</div>
                                        <div className="info-text edit">{apartment.short_description}</div>
                                        <NavLink to="/">?????????????? ??????????</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gi-child">
                            <div className="apartment-location">
                                <img src={`${process.env.PUBLIC_URL}/location.svg`} alt="location"
                                     className="location-icon"/>
                                16 Kamanina Street flor 23, ??????????, 65000, ??????????????
                            </div>
                            <div className="map">
                                <div className="blur"></div>
                                <a href="src/views/apartment/ApartmentBooking#" className="show-map-btn">
                                    ???????????????? ???? ??????????
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="price-info">
                    <div className="small-heading fw-600">???????????????????? ?????? ????????????</div>
                    <div className="total-amount">
                        <img src={`${process.env.PUBLIC_URL}/price-amount.svg`} alt=""/>
                        <span>???????????????? ????????</span>
                        <span className="amount">UAH {getTotalPrice(apartment.price, startDate, endDate) + 70}</span>
                    </div>
                    <div className="price-heading">???????? ?????????????? ?? ???????? ???????????? ????:</div>
                    <div className="price-details">
                        <div className="detail-row">
                            <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                            <div>
                                <div className="info-h">??????????</div>
                                <div className="info-text">{apartment.short_description}</div>
                                <div className="detail-price">UAH {getTotalPrice(apartment.price, startDate, endDate)}</div>
                            </div>
                        </div>
                        <div className="detail-row">
                            <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                            <div>
                                <div className="info-h">?????????????????????? ????????</div>
                                <div className="info-text">{apartment.short_description}</div>
                                <div className="detail-price">UAH 70</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="apartment-additional-info">
                    <form onSubmit={handleSubmit}>
                        <div className="apartment-form">
                            <div className="small-heading pb-0">?????????????????? ???????? ????????</div>
                            <div className="info-text">
                                <img src={`${process.env.PUBLIC_URL}/yellow-exclamation.svg`} alt=""/>
                                ?????????????? ???????? ???????? ?????????????????????? ?????? ??????????????????????
                            </div>
                            <div className="account-inputs">
                                <div className="acc-input-row">
                                    <div className="acc-input">
                                        <div>?????????</div>
                                        <input type="text" className="form-control"/>
                                    </div>
                                    <div className="acc-input">
                                        <div>????????????????</div>
                                        <input type="text" className="form-control"/>
                                    </div>
                                </div>
                                <div className="acc-input-row">
                                    <div className="acc-input">
                                        <div>E-mail</div>
                                        <input type="email" name="email" className="form-control" required
                                               defaultValue={email}/>
                                    </div>
                                    <div className="acc-input">
                                        <div>?????????????????????? ?????? E-mail</div>
                                        <input type="email" className="form-control" required defaultValue={email}/>
                                    </div>
                                </div>
                                <div className="acc-input-row pt-1">
                                    <div className="acc-input">
                                        <div className="sub-text">?????????????????????????? ???????????????????? ???????? ?????????????????????? ???? ????
                                            ????????????
                                        </div>
                                    </div>
                                </div>
                                <div className="acc-input-row">
                                    <div className="acc-input">
                                        <div>?????? ???????? ?????????????????</div>
                                        <div className="radio-booking">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio"
                                                       name="inlineRadioOptions" id="inlineRadio1"
                                                       value="option1"></input>
                                                <label className="form-check-label" htmlFor="inlineRadio1">??????
                                                    ????????</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio"
                                                       name="inlineRadioOptions" id="inlineRadio2"
                                                       value="option2"></input>
                                                <label className="form-check-label" htmlFor="inlineRadio2">?????? ??????????
                                                    ??????????</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="small-heading pb-0 pt-4">???????? ?????? ??????????</div>
                                <div className="price-heading pb-0 pt-0">{apartment.short_description}</div>
                                <div className="info-text">
                                    <img src={`${process.env.PUBLIC_URL}/yellow-cross.svg`} alt=""/>
                                    ???????????????? ????????????????????
                                    <div className="sub-text">(???????????????????? ???? ?????????????? ???? ?????????????????????????? ??????????????????
                                        ??????????????????????)</div>
                                </div>
                                <div className="acc-input-row pt-2">
                                    <div className="acc-input">
                                        <div>????????? ???? ???????????????? ??????????</div>
                                        <input type="text" name="name" className="form-control" required
                                               defaultValue={name}/>
                                    </div>
                                    <div className="acc-input">
                                        <div>?????????? ????????????????</div>
                                        <input type="phone" name="phone" className="form-control" required
                                               defaultValue={phone}/>
                                    </div>
                                </div>
                                <div className="acc-input-row pt-1">
                                    <div className="acc-input">
                                        <div className="sub-text">???????????????????? ???????????? ???????????????????????? ???? ?????????? ??????????</div>
                                    </div>
                                </div>
                                <div className="amenities">
                                    {apartment.amenities.map((item, key) =>
                                        <div key={key} className="amenities-row">
                                            <img src={`${process.env.PUBLIC_URL}/${amenities[item]}`} alt="amenity"/>
                                            {item}
                                        </div>
                                    )}
                                </div>
                                <div className="textarea-row">
                                    <div className="input-heading">???????????????? ???????? ???????????????? <span className="light">(???? ????????????????)</span>
                                    </div>
                                    <div className="acc-input">
                                        <textarea name="comment" id="comment" cols="65" rows="3"
                                                  defaultValue={comment}/>
                                    </div>
                                </div>
                                <div className="small-heading pb-0 pt-4">?????? ????????????????</div>
                                <div className="info-text b-space">
                                    <img src={`${process.env.PUBLIC_URL}/green_checkmark.svg`} alt="checkmark"/>
                                    ?????? ?????????? ???????? ?????????????? ?????? ???????????? ?? 14:00
                                </div>
                                <div className="input-heading">?????????????? ?????????????????????? ?????? ????????????????</div>
                                <div className="acc-input-row pt-0">
                                    <div className="acc-input wide">
                                        <select name="arrivingHour" id="arriving_time" className="form-control" required
                                                defaultValue={arrivingHour}>
                                            <option disabled selected value="">?????????????? ...</option>
                                            <option value="14">14:00</option>
                                            <option value="15">15:00</option>
                                            <option value="16">16:00</option>
                                            <option value="17">17:00</option>
                                            <option value="later">?????????????? 17:00</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="continue-booking">
                            <button type="submit" className="btn btn-blue">???????????????????? ????????????????????</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
