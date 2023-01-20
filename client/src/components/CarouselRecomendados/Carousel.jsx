import React, { useState } from 'react';

import Card from "../Card/Card";
import style from "./Carousel.module.css";

import { useSelector } from 'react-redux'



const Carousel = () => {
    
    const libros = useSelector((state) => state.allBooks)
    const [currentIndex, setCurrentIndex] = useState(0);
    console.log(libros);
      
    const librosPorPagina = 5;
    const librosAMostrar = libros.slice(currentIndex * librosPorPagina, currentIndex * librosPorPagina + librosPorPagina);
    const librosFaltantes = librosPorPagina - librosAMostrar.length;
    const librosAMostrarCompletos = librosAMostrar.concat(libros.slice(0, librosFaltantes));
      
  
    const handleLeftArrowClick = () => {
        if (currentIndex === 0) {
          setCurrentIndex(Math.floor(libros.length / librosPorPagina));
        } else {
          setCurrentIndex(currentIndex - 1);
        }
      };
      
      
  
    const handleRightArrowClick = () => {
        if (currentIndex === Math.floor(libros.length / librosPorPagina)) {
          setCurrentIndex(0);
        } else {
          setCurrentIndex(currentIndex + 1);
        }
      };
      
//-------------------
    const prevLibros = libros.slice(
    currentIndex === 0 ? libros.length - librosPorPagina : currentIndex - 1,
    currentIndex === 0 ? libros.length : currentIndex
    );
    const nextLibros = libros.slice(currentIndex + librosPorPagina, currentIndex + librosPorPagina * 2);
    const currentLibros = libros.slice(currentIndex, currentIndex + librosPorPagina);
    const allLibros = [...prevLibros, ...currentLibros, ...nextLibros];
    //-----------------------

      
    return (
        <div className={style.todo1}>

            <div className={style.librocarousel}>
                <div class={style.titulo}>
                    <h3>Libros recomendados</h3>
                </div>
                <div className={style.contenedorprincipal}>
                    <button onClick={handleLeftArrowClick} className={style.izquierda}>
                        A
                    </button>
                    <div className={style.contenedorcarousel}>

                        <div className={style.carousel}>
                            {librosAMostrarCompletos.map((libro, index) => (
                            <Card
                            img = {libro.img  }
                            estado={libro.subscription}
                            comentarios = {libro.content}
                            autor = {libro.autor}
                            id= {libro.id}
                            key={index}
                            name={libro.title}
                            />
                            ))}
                        </div>
                    </div>
                    <button onClick={handleRightArrowClick} className={style.derecha}>
                        Z
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Carousel;
