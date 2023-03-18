import React, { useState } from 'react';
import styles from "../css/tables.module.css"

const Tables = () => {
    const [boards, setBoards] = useState([
        {id: 1, title: "Сделать", items: [{id: 1, title: "Пойти в магазин"}]},
        {id: 2, title: "Сделать", items: [{id: 1, title: "Пойти в магазин"}]},
        {id: 3, title: "Сделать", items: [{id: 1, title: "Пойти в магазин"}]}
    ]);
    return (
        <div className={styles.App}>
            {boards.map(board => 
                <div className={styles.Board}>
                    <div className={styles.BoardTitle}>{board.title}</div>
                    {board.items.map(item => 
                        <div
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