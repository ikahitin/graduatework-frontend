import React from "react";
import Slider from "react-slick";
import API from '../api';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {NavLink} from "react-router-dom";

export default function SimpleSlider(data) {
    const place = {
        "name": "Місто",
        "region": "Регіон",
        "image_url": null,
        "rating": 0.0,
        "type": "city",
        "id": 1
    }
    let emptyArray = Array(5).fill(place)
    const [ideas, setIdeas] = React.useState(emptyArray);
    React.useEffect(() => {
        let url = "location";
        const keys = Object.keys(data)
        keys.forEach(element => {
            url += `?${element}=${data[element]}`
        });
        const fetchData = async () => {
            try {
                const response = await API.get(url);
                const json = await response.data;
                setIdeas(json);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [data]);
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
                {ideas.map((item, key) =>
                    <div className="card-cover" key={key}>
                        <NavLink to="">
                            <div className="card">
                                <div className="rating">
                                    <img src={`${process.env.PUBLIC_URL}/star.svg`} alt="star" className="star"/>
                                    <span>{item.rating}</span>
                                </div>
                                <div className="card-img-top" style={{backgroundImage: `url("${item.image_url}")`}}/>
                                <div className="card-body">
                                    <div className="location-icon"/>
                                    <div className="text-part">
                                        <p className="city">{item.name}</p>
                                        <p className="region">{item.region}</p>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                )}
            </Slider>
        </div>
    );
}