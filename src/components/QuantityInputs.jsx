import React, {forwardRef, useImperativeHandle, useRef} from "react";

function QuantityInputs(props, ref) {
    const adultsInputRef = useRef(null);
    const childrenInputRef = useRef(null);
    useImperativeHandle(ref,() => ({
        getValues: () => {
            return {
                adultsInput: adultsInputRef.current.value,
                childrenInput: childrenInputRef.current.value
            };
        }
    }))
    return(
        <div className="apartment-details">
            <div className="input-row">
                <div className="input-desc">
                    <span>Дорослі</span>
                </div>
                <lion-input-stepper max="10" min="0" name="count" value={props.detailQuantity[0]} ref={adultsInputRef}>
                </lion-input-stepper>
            </div>
            <div className="input-row">
                <div className="input-desc">
                    <span>Діти</span>
                    <span className="sub">0-17 років</span>
                </div>
                <lion-input-stepper max="10" min="0" name="count" value={props.detailQuantity[1]} ref={childrenInputRef}>
                </lion-input-stepper>
            </div>
        </div>
    )
}

export default QuantityInputs = forwardRef(QuantityInputs);
