import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import '../../styles/apartmentbooking.css'
import React, {useState} from "react";
import ScrollToTop from "../../components/ScrollToTop";
import API from "../../api";
import {getTotalPrice} from "../../utils/helpers";

export default function ApartmentBookingConfirmation() {
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

    function handleBooking(e) {
        e.preventDefault()
        const url = `apartment/${apartment_id}/reservation`;
        const data = {
            "from_date": startDate,
            "to_date": endDate,
            "guest_name": name,
            "guest_phone": phone,
            "user_email": email,
            "comment": comment,
            "arriving_hour": arrivingHour,
            "apartment_id": Number(apartment_id)
        }
        const makeReservation = async () => {
            try {
                await API({
                    method: 'post',
                    url: url,
                    data: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                navigate("/payment", {state: bookingState});
            } catch (error) {
                console.log("error", error);
            }
        };
        makeReservation();
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
                }} state={{startDate: startDate, endDate: endDate}}>????????????????????</NavLink>
                <NavLink end={true} to={{
                    pathname: `/booking/apartments/${apartment_id}/booking/confirmation`
                }}>????????????</NavLink>
            </div>
            <div className="booking-info">
                <div className="apartment-info">
                    <div className="user-data-block">
                        <div className="user-data-info">
                            <div className="small-heading pb-0">???????????????????? ?????? ?????????? ?????? ????????????</div>
                            <div className="info-text">
                                <img src={`${process.env.PUBLIC_URL}/yellow-exclamation.svg`} alt=""/>
                                ??????????????! ???????? ??????????, ?????????????? ?????????, ?????? ?????????????? ?? ???????????? ????????????????
                            </div>
                            <div className="acc-input-row">
                                <div className="acc-input">
                                    <div>?????????</div>
                                    <p>{name}</p>
                                </div>
                                <div className="acc-input">
                                    <div>E-mail</div>
                                    <p>{email}</p>
                                </div>
                                <div className="acc-input">
                                    <div>?????????? ????????????????</div>
                                    <p>{phone}</p>
                                </div>
                            </div>
                        </div>
                        <div className="edit-data">
                            <NavLink to={{
                                pathname: `/booking/apartments/${apartment.id}/booking`
                            }} state={{startDate, endDate, name, phone, email, comment, arrivingHour}}>??????????????
                                ????????</NavLink>
                        </div>
                    </div>
                </div>
                <div className="price-info confirm">
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
                <div className="payment">
                    <div className="payment-info">
                        <form>
                            <div className="small-heading pb-0 pt-0">???????? ?????? ??????????</div>
                            <div className="payments">
                                ???????????? ????????????
                                <img src={`${process.env.PUBLIC_URL}/visa.svg`} alt="checkmark"/>
                                <img src={`${process.env.PUBLIC_URL}/mastercard.svg`} alt="checkmark"/>
                            </div>
                            <div className="acc-input-row pt-2">
                                <div className="acc-input">
                                    <div>????????? ???????????????? ??????????</div>
                                    <input type="text" className="form-control"></input>
                                </div>
                                <div className="acc-input">
                                    <div>?????????? ?????????????????? ????????????</div>
                                    <input type="text" className="form-control"></input>
                                </div>
                            </div>
                            <div className="acc-input-row">
                                <div className="acc-input">
                                    <div>???????????? ???????????????????? (????/????)</div>
                                    <div className="selects">
                                        <select name="arriving_time" id="month_expiry"
                                                className="form-control expiration">
                                            <option disabled selected value></option>
                                            <option value="h_14">14:00</option>
                                            <option value="h_15">15:00</option>
                                            <option value="h_16">16:00</option>
                                            <option value="h_17">17:00</option>
                                            <option value="later">?????????????? 17:00</option>
                                        </select>
                                        <select name="arriving_time" id="year_expiry"
                                                className="form-control expiration">
                                            <option disabled selected value></option>
                                            <option value="h_14">14:00</option>
                                            <option value="h_15">15:00</option>
                                            <option value="h_16">16:00</option>
                                            <option value="h_17">17:00</option>
                                            <option value="later">?????????????? 17:00</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="acc-input">
                                    <div>CVV ??????</div>
                                    <input type="text" name="cvv" className="form-control cvv"></input>
                                </div>
                            </div>

                        </form>

                    </div>
                    <div className="submit-block">
                        <div className="info-text">
                            <img src={`${process.env.PUBLIC_URL}/yellow-exclamation.svg`} alt=""/>
                            ?????????????????????? ???????????? ????????????????????????????, ???? ?????????????????? ?????????? ????????????????????, ???????????????? ??????????????????, ????
                            ?????????????????? ?????? ????????????????????????????????.
                        </div>
                        <button type="submit" className="btn btn-blue" onClick={handleBooking}>??????????????????????</button>
                    </div>
                </div>
            </div>
        </div>
    )
}