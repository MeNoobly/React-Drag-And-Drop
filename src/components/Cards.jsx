import React, { useState } from 'react';
import styles from "../css/card.module.css";

const Cards = () => {
    const [cardList, setCardList] = useState([
        {id: 1, order: 3, text: "Карточка 3"},
        {id: 2, order: 1, text: "Карточка 1"},
        {id: 3, order: 2, text: "Карточка 2"},
        {id: 4, order: 4, text: "Карточка 4"},
      ]);
    
      const [currentCard, setCurrentCard] = useState(null);
    
      const dragStartHandler = (event, card) => {
        setCurrentCard(card);
      }
    
      const dragLeaveHandler = (event) => {
        event.target.style.background = "white";
      }
    
      const dragEndHandler = (event) => {
        event.target.style.background = "white";
      }
    
      const dragOverHandler = (event) => {
        event.preventDefault();
        event.target.style.background = "lightgray";
      }
    
      const dropHandler = (event, card) => {
        event.preventDefault();
        setCardList(cardList.map(element => {
          if (element.id === card.id) {
            return {...element, order: currentCard.order}
          }
          if (element.id === currentCard.id) {
            return {...element, order: card.order}
          }
          return element;
        }))
        event.target.style.background = "white";
      }
    
      const sortCards = (a, b) => {
        if (a.order > b.order) {
          return 1;
        } else {
          return -1;
        }
      }
    
      return (
        <div className={styles.App}>
          {cardList.sort(sortCards).map(card => 
            <div
              onDragStart={(event) => dragStartHandler(event, card)}
              onDragLeave={(event) => dragLeaveHandler(event)}
              onDragEnd={(event) => dragEndHandler(event)}
              onDragOver={(event) => dragOverHandler(event)}
              onDrop={(event) => dropHandler(event, card)}
              draggable={true}
              className={styles.Card}
              key={card.id}
            > 
              {card.text}
            </div>
          )}
        </div>
      );
};

export default Cards;