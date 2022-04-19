import {useSearchParams} from "react-router-dom";

export default function ApartmentResult() {
    let [searchParams, setSearchParams] = useSearchParams();
    let destination = searchParams.get("destination");
    let date = searchParams.get("daterange");
    return(
        <div className="text-light">{destination} - {date}</div>
    )
}
