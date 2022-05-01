import React from "react";

export default function getStars(rating) {
    if (rating % 1 === 0) {
        return [...Array(rating)].map((e, i) => <img src={`${process.env.PUBLIC_URL}/star.svg`} alt="star"/>)

    } else {
        const stars = [...Array(Math.floor(rating))].map((e, i) => <img src={`${process.env.PUBLIC_URL}/star.svg`}
                                                                        alt="star"/>)
        stars.push(<img src={`${process.env.PUBLIC_URL}/half-star-rating.svg`} alt="star"/>)
        return stars
    }
}