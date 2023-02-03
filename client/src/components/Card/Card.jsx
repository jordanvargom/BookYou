import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

import GetRateStars from '../GetRateStars/GetRateStars.jsx'

import style from './Card.module.css'
const url = 'https://server-bookyou.onrender.com'

export default function Card({ name, id, autor, img, estado, comentarios, calificacion }) {
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const info = await axios.get(`${url}/book/${id}`)
      setBook(info.data);
    }
    fetchData();
  }, [id]);

  let avgRate;
  if (book.comment) {
    let sum = 0;
    for (let i = 0; i < book.comment.length; i++) {
      sum += Number(book.comment[i].rate);
    }
    const average = sum / book.comment.length;
    avgRate = Math.round(average * 10) / 10;
    
  } else {
    console.error('Array not found');
  }
  

  console.log(avgRate);
  //console.log(comentarios);
  return (
    <div className={style.todo}>
      <div className={style.card}>
        <NavLink to={`/bookdetail/${id}`}>
          <div className={estado === 'premium' ? style.premiumRibbon : style.freeRibbon}>
            <img alt="icon" className={style.imagen} src={img} />
          </div>
          <div>
            <div className={style.texto}>
            <div>
              { avgRate ? <GetRateStars rate={avgRate} /> : <p>Aún sin calificar</p> }
            </div>
              <p className={style.bookTitle}>{name}</p>
              <p>{autor}</p>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  )
}
