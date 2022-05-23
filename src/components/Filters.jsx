import React from "react";
import filters from "../utils/filters.json"

export default function Filters({type}) {
    return (
        <div>
            {filters[type].map((obj, key) =>
                <div className="filter" key={key}>
                    <span className="f-title">{obj.title}</span>
                    <div className="checkboxes">
                        {obj.elements.map((filter, key) =>
                            <div className="checkbox-row" key={key}>
                                <div className="div-check">
                                    <input className="form-check-input" type="checkbox" value="" id={filter.name}/>
                                    <label className="form-check-label" htmlFor={filter.name}>
                                        {filter.value}
                                    </label>
                                </div>
                                {/*<span className="number">{key}</span>*/}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}