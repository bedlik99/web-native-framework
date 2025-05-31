export const customNotificationStyles = /*css*/`<style>
.backdrop {
    backdrop-filter: brightness(50%);
    position: absolute;
    z-index: 11;
    min-width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    animation: showNotification 0.3s ease-out forwards;
}
.card {
    min-width: 30%;
    max-width: 30%;
    min-height: 15%;
    border-radius: 5px;
    color: black;
    position: absolute;
    left: 35%;
    top: 2%;
    background-color: #4287f5;
    border: 2px solid white;
    text-align: center;
    user-select: none;
}

.notification-text-p {
    color: white;
    font-size: 1.2em;
    padding: 2%;
}

.confirm-btn {
    outline: none;
    border-radius: 5px;
    width: 20%;
    font-size: 1em;
    height: 5vh;
    padding: 2%;
    margin-bottom: 2%;
    cursor: pointer;
    color: white;
    background-color: #4287f5;
    border: 1px solid white;
    transition: 0.1s all;
}

.confirm-btn:hover {
    color: #4287f5;
    background-color: white;
}

.confirm-btn:active {
    transform: translateY(2px);
}

@keyframes showNotification {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@media only screen and (max-width: 600px) {
    .card {
        width: 75%;
        max-width: 100%;
        min-height: 15%;
        left: 12.5%;
    }

}
</style>`;


