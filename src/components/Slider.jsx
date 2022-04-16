import React  from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function SimpleSlider() {

        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            cssEase: "linear"
        }
        return (
            <div className="slider">
                <Slider {...settings}>
                    <div className="card-cover">
                        <a href="">
                            <div className="card">
                                <div className="rating">
                                    <img src={"./star.svg"} alt="star" className="star"/>
                                    <span>4.9</span>
                                </div>
                                <div className="card-img-top" style={{backgroundImage: `url("/118317.jpeg")`}}/>
                                <div className="card-body">
                                    <div className="location-icon"/>
                                    <div className="text-part">
                                        <p className="city">Одеса</p>
                                        <p className="region">Одеська область</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="card-cover">
                        <a href="">
                            <div className="card">
                                <div className="rating">
                                    <img src={"./star.svg"} alt="star" className="star"/>
                                    <span>4.5</span>
                                </div>
                                <div className="card-img-top" style={{backgroundImage: `url("/dzh.png")`}}/>
                                <div className="card-body">
                                    <div className="location-icon"/>
                                    <div className="text-part">
                                        <p className="city">Джарилгач</p>
                                        <p className="region">Херсонська область</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="card-cover">
                        <a href="">
                            <div className="card">
                                <div className="rating">
                                    <img src={"./star.svg"} alt="star" className="star"/>
                                    <span>4.2</span>
                                </div>
                                <div className="card-img-top" style={{backgroundImage: `url("/slavske.png")`}}/>
                                <div className="card-body">
                                    <div className="location-icon"/>
                                    <div className="text-part">
                                        <p className="city">Славське</p>
                                        <p className="region">Львівська область</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="card-cover">
                        <a href="">
                            <div className="card">
                                <div className="rating">
                                    <img src={"./star.svg"} alt="star" className="star"/>
                                    <span>4.5</span>
                                </div>
                                <div className="card-img-top" style={{backgroundImage: `url("/sinevir.png")`}}/>
                                <div className="card-body">
                                    <div className="location-icon"/>
                                    <div className="text-part">
                                        <p className="city">Синевір</p>
                                        <p className="region">Закарпатська область</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="card-cover">
                        <a href="">
                            <div className="card">
                                <div className="rating">
                                    <img src={"./star.svg"} alt="star" className="star"/>
                                    <span>4.1</span>
                                </div>
                                <div className="card-img-top" style={{backgroundImage: `url("/truskavets.png")`}}/>
                                <div className="card-body">
                                <div className="location-icon"/>
                                <div className="text-part">
                                    <p className="city">Трускавець</p>
                                    <p className="region">Львівська область</p>
                                </div>
                            </div>
                            </div>
                        </a>
                    </div>
                    <div className="card-cover">
                        <a href="">
                            <div className="card">
                                <div className="rating">
                                    <img src={"./star.svg"} alt="star" className="star"/>
                                    <span>4.8</span>
                                </div>
                                <div className="card-img-top" style={{backgroundImage: `url("/mariupol.png")`}}/>
                                <div className="card-body">
                                    <div className="location-icon"/>
                                    <div className="text-part">
                                        <p className="city">Маріуполь</p>
                                        <p className="region">Донецька область</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </Slider>
            </div>
        );
}