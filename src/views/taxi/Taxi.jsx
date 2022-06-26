import React, {} from "react";
import '../../styles/taxi.css'
import Email from "../../components/Email";
import TaxiSearchBlock from "../../components/searches/TaxiSearchBlock";

function Taxi() {
    return (
        <div className="container-xxl p-0 c-child">
            <TaxiSearchBlock/>
            <div className="flow">
                <div className="heading">Як це відбувається?</div>
                <img src={`${process.env.PUBLIC_URL}/flow.svg`} alt="flow"/>
            </div>
            <div className="faq container">
                <div className="heading">Часто задавані питання</div>
                <div className="faq-content col-10">
                    <div className="questions">
                        <div className="questions-number">
                            01 - 03
                        </div>
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingOne">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
                                            aria-expanded="false" aria-controls="flush-collapseOne">
                                        Що входить у вартість?
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse"
                                     aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        До неї включені всі податки та збори, у тому числі плата за користування
                                        платними ділянками дороги та чайові
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingTwo">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo"
                                            aria-expanded="false" aria-controls="flush-collapseTwo">
                                        Як проводитися оплата?
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" className="accordion-collapse collapse"
                                     aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        Оплата таксі відбувається при оформленні онлайн бронювання. Це означає, що
                                        поїздка підтверджена заздалегідь, і вам не потрібно турбуватися про
                                        непередбачені обставини або зняття готівки після прильоту.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="flush-headingThree">
                                    <button className="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#flush-collapseThree"
                                            aria-expanded="false" aria-controls="flush-collapseThree">
                                        Чи можу я скасувати замовлення?
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" className="accordion-collapse collapse"
                                     aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        Так. Бронювання можна скасувати безкоштовно до 24 годин до запланованого часу
                                        подачі автомобіля. Деякі наші партнери встановлюють короткі терміни
                                        безкоштовного скасування
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq-images">
                        <img src={`${process.env.PUBLIC_URL}/taxi_faq.png`} alt=""/>
                    </div>
                </div>
            </div>
            <Email/>
        </div>
    )
}

export default Taxi;