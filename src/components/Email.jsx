import React from "react";
import API from "../api";

export default function Email() {
    function sendEmail(e){
        e.preventDefault()
        const form = e.target;
        const email = form.email.value
        const data = {"email": email}
        API({
            method: 'post',
            url: 'subscribe-email',
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    return(
        <div className="email">
            <span className="heading">Збережіть ваш час!</span>
            <p className="subheading">Підпишіться, і ми надішлемо вам найкращі пропозиції</p>
            <div className="email-block">
                <img src={`${process.env.PUBLIC_URL}/email-bg.svg`} alt="email-background" className="email-background"/>
                <form action="" className="email-form" onSubmit={sendEmail}>
                    <div className="input-group">
                        <input type="email" name="email" className="form-control with-icon email-icon" id="emailSubscription"
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