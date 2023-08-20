import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillCartPlusFill } from "react-icons/bs";

const Game = (props) => {
  return (

    <>
      <Row className='cardGame' style={{ marginRight: 30, marginBottom: 20, width: 450 }} >

        <Col xs={4} onClick={() => { props.onClick(props.game) }}>
          <img src={props.game.gameImage} style={{ width: '100%', borderRadius: 24, marginTop: 15, marginBottom: 10 }} />
        </Col>
        <Col xs={8}>
          <h4  style={{ color: "#fff", marginTop: 13 ,width:270 }}>{props.game.gameName}</h4>
          <p onClick={() => { props.onClick(props.game) }} style={{ color: "#90E0EF", fontWeight: 700, fontSize: 20,marginBottom:30 }}>{props.game.gamePrice === "Free" ? <>{props.game.gamePrice}</> : <>₪{props.game.gamePrice}</>}</p>
          <Row>
            <div style={{ width: 105 }}>
              <button onClick={props.addGameToCart} className="button" type="button">
                <span className="button__text"><BsFillCartPlusFill size={22} /></span>
                <span className="button__icon"><svg className="svg" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
              </button>
            </div>
            <div style={{ width: 50 }}>
              <button onClick={props.addGameToWishlist} className="btnL">
                <svg style={{ marginBottom: 10 }} viewBox="0 0 17.503 15.625" height="20.625" width="20.503" xmlns="http://www.w3.org/2000/svg" className="icon">
                  <path transform="translate(0 0)" d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z" id="Fill"></path>
                </svg>
              </button>
            </div>
          </Row>


        </Col>

      </Row>
    </>

  );
}

export default Game;
