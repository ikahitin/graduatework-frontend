import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import ScrollToTop from "../../components/ScrollToTop";
import API from "../../api";
import {getTotalPrice} from "../../utils/helpers";

export default function CarBookingConfirmation() {
    const navigate = useNavigate();
    const location = useLocation()
    const {startDate, endDate, name, phone, email} = location.state

    const {car_id} = useParams();
    const [car, setCar] = useState({images: [], amenities: [], reviews: [], insurance: []});

    function handleBooking(e) {
        e.preventDefault()
        const url = `car/${car_id}/reservation`;
        const data = {
            "from_date": startDate,
            "to_date": endDate,
            "user_name": name,
            "user_phone": phone,
            "user_email": email,
            "car_id": Number(car_id)
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

    const [bookingState, setBookingState] = useState()

    React.useEffect(() => {
        if (location.state !== null) {
            if (location.state.hasOwnProperty('booking')) {
                setBookingState({"booking": location.state.booking})
            }
        }
        const url = `car/${car_id}`;

        const fetchData = async () => {
            try {
                const response = await API.get(url);
                const json = await response.data;
                setCar(json)
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, [car_id]);

    return (
        <div className="container col-10 search">
            <ScrollToTop/>
            <div className="breadcrumb">
                <NavLink end to="/">??????????????</NavLink>
                <NavLink end={true} to="/booking/cars">???????????? ????????????????????</NavLink>
                <NavLink end={true} to="/booking/cars/search">???????????????????? ????????????</NavLink>
                <NavLink end={true} to={{
                    pathname: `/booking/cars/${car_id}/booking`
                }}>????????????????????</NavLink>
                <NavLink end={true} to={{
                    pathname: `/booking/cars/${car_id}/booking/confirmation`
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
                                pathname: `/booking/cars/${car.id}/booking`
                            }} state={{startDate, endDate, phone, email}}>??????????????
                                ????????</NavLink>
                        </div>
                    </div>
                </div>
                <div className="price-info confirm">
                    <div className="small-heading fw-600">???????????????????? ?????? ????????????</div>
                    <div className="total-amount">
                        <img src={`${process.env.PUBLIC_URL}/price-amount.svg`} alt=""/>
                        <span>???????????????? ????????</span>
                        <span className="amount">UAH {getTotalPrice(car.price, startDate, endDate) + 1500}</span>
                    </div>
                    <div className="price-heading">???????? ?????????????? ?? ???????? ???????????? ????:</div>
                    <div className="price-details">
                        <div className="detail-row">
                            <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                            <div>
                                <div className="info-h">????????????????????</div>
                                <div className="info-text">{car.name}</div>
                                <div className="detail-price">UAH {getTotalPrice(car.price, startDate, endDate)}</div>
                            </div>
                        </div>
                        <div className="detail-row">
                            <img src={`${process.env.PUBLIC_URL}/yellow-apartment.svg`} alt=""/>
                            <div>
                                <div className="info-h">??????????????????????</div>
                                <div className="info-text">???? ?????????????? ???????????????? ????????????????????/??????</div>
                                <div className="detail-price">UAH 1500</div>
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