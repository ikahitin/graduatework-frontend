import moment from "moment/moment";
import React from "react";

export function getNumberOfNights(startDate, endDate) {
    if (startDate !== null && endDate !== null) {
        const timeDiff = Math.abs(moment(startDate).toDate().getTime() - moment(endDate).toDate().getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
}

export function getTotalPrice(price, startDate, endDate) {
    return getNumberOfNights(startDate, endDate) * price
}

export function getStars(rating) {
    if (rating % 1 === 0) {
        return [...Array(rating)].map((e, i) => <img src={`${process.env.PUBLIC_URL}/star.svg`} alt="star" key={i}/>)

    } else {
        const stars = [...Array(Math.floor(rating))].map((e, i) => <img src={`${process.env.PUBLIC_URL}/star.svg`}
                                                                        alt="star" key={i}/>)
        stars.push(<img src={`${process.env.PUBLIC_URL}/half-star-rating.svg`} alt="star" key={999}/>)
        return stars
    }
}

export function getNumberOfDays(startDate, endDate) {
    if (startDate !== null && endDate !== null) {
        const timeDiff = Math.abs(moment(startDate).toDate().getTime() - moment(endDate).toDate().getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
}