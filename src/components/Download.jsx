import axios from 'axios';
import React, { useState } from 'react';
import styles from "../css/download.module.css";

const Download = () => {
    const [drag, setDrag] = useState(false);
    const dragStartHandler = (event) => {
        event.preventDefault();
        setDrag(true);
    }

    const dragLeaveHandler = (event) => {
        event.preventDefault();
        setDrag(false);
    }

    const onDropHandler = (event) => {
        event.preventDefault();
        let files = [...event.dataTransfer.files];
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("userId", 1);
        axios.post("url", formData);
        setDrag(false);
    }

    return (
        <div className={styles.App}>
            {drag
                ? <div 
                    className={styles.DropArea}
                    onDragStart={event => dragStartHandler(event)}
                    onDragLeave={event => dragLeaveHandler(event)}
                    onDragOver={event => dragStartHandler(event)}
                    onDrop={event => onDropHandler(event)}
                >Отпустите файлы, чтобы загрузить их</div>
                : <div
                    onDragStart={event => dragStartHandler(event)}
                    onDragLeave={event => dragLeaveHandler(event)}
                    onDragOver={event => dragStartHandler(event)}
                >Перетащите файлы, чтобы загрузить их</div>
            }
        </div>
    );
};

export default Download;