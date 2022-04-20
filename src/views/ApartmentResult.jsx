import {useSearchParams} from "react-router-dom";

export default function ApartmentResult() {
    const [searchParams, setSearchParams] = useSearchParams();
    const destination = searchParams.get("destination");
    const startDate = searchParams.get("start");
    const endDate = searchParams.get("start");
    const adults = searchParams.get("adults")

    return(
        <div className="text-light">{destination} - {startDate} to {endDate}</div>
    )
}
