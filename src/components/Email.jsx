import React from "react";

export default function Email() {
    return(
        <div className="email">
            <span className="heading">Збережіть ваш час!</span>
            <p className="subheading">Підпишіться, і ми надішлемо вам найкращі пропозиції</p>
            <div className="email-block">
                <img src={`${process.env.PUBLIC_URL}/email-bg.svg`} alt="email-background" className="email-background"/>
                <form action="" className="email-form">
                    <div className="input-group">
                        <input type="text" className="form-control with-icon email-icon" id="emailSubscription"
                               placeholder="Ваш e-mail"/>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-blue">Підписатися</button>
                    </div>
                </form>
            </div>
        </div>
    )
}