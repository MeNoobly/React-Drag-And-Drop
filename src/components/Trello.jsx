import React, { useState } from 'react';
import styles from "../css/trello.module.css"

const Tables = () => {
    const [boards, setBoards] = useState([
        {id: 1, title: "Сделать", items: [{id: 1, title: "Пойти в магазин"}, {id: 2, title: "Пойти в магазин"}, {id: 3, title: "Пойти в магазин"}]},
        {id: 2, title: "Сделать", items: [{id: 4, title: "Пойти в магазин"}, {id: 5, title: "Пойти в магазин"}, {id: 6, title: "Пойти в магазин"}]},
        {id: 3, title: "Сделать", items: [{id: 7, title: "Пойти в магазин"}, {id: 8, title: "Пойти в магазин"}, {id: 9, title: "Пойти в магазин"}]}
    ]);
    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);

    const dragOverHandler = (event) => {
        event.preventDefault();
        if (event.target.className === styles.Item) {
            event.target.style.boxShadow = "0 4px 3px gray";
        }
    }

    const dragLeaveHandler = (event) => {
        event.target.style.boxShadow = "none";
    }

    const dragStartHandler = (event, board, item) => {
        setCurrentBoard(board);
        setCurrentItem(item);
    }

    const dragEndHandler = (event) => {
        event.target.style.boxShadow = "none";
    }

    const dropHandler = (event, board, item) => {
        event.preventDefault();
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
        const dropIndex = board.items.indexOf(item);
        board.items.splice(dropIndex + 1, 0, currentItem);
        setBoards(boards.map(element => {
            if (board.id === element.id) {
                return board;
            }
            if (currentBoard.id === element.id) {
                return currentBoard;
            }
            return element;
        }))
        event.target.style.boxShadow = "none";
    }

    const dropCardHandler = (event, board) => {
        event.stopPropagation()
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
        setBoards(boards.map(element => {
            if (board.id === element.id) {
                return board;
            }
            if (currentBoard.id === element.id) {
                return currentBoard;
            }
            return element;
        }))
        event.target.style.boxShadow = "none";
    }

    return (
        <div className={styles.App}>
            {boards.map(board => 
                <div 
                    className={styles.Board}
                    onDragOver={event => dragOverHandler(event)}
                    onDrop={event => dropCardHandler(event, board)}
                >
                    <div className={styles.BoardTitle}>{board.title}</div>
                    {board.items.map(item => 
                        <div
                            onDragOver={event => dragOverHandler(event)}
                            onDragLeave={event => dragLeaveHandler(event)}
                            onDragStart={event => dragStartHandler(event, board, item)}
                            onDragEnd={event => dragEndHandler(event)}
                            onDrop={event => dropHandler(event, board, item)}
                            draggable={true}
                            className={styles.Item}
                        >
                        {item.title}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Tables;