import React from "react";

export default function Email() {
    return(
        <div className="email">
            <span className="heading">Збережіть ваш час!</span>
            <p className="subheading">Підпишіться, і ми надішлемо вам найкращі пропозиції</p>
            <div className="email-block">
                <img src={"./email-bg.svg"} alt="email-background" className="email-background"/>
                <form action="" className="email-form">
                    <div className="input-group">
                        <div className="nav-icon email-gray"/>
                        <input type="text" className="form-control" id="emailSubscription"
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