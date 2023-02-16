import React, { useEffect, useState } from 'react';

function Controller({ character }) {
  const TOTAL_HEALTH = 100;
  const [socket, setSocket] = useState();
  const [life, setLife] = useState(100);
  useEffect(() => {
    setSocket(window.io());
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        socket.emit('im a controller', character);
      });

      socket.on('hit', (data) => {
        if (data?.value?.life) {
          setLife(data.value.life);
        }
        navigator.vibrate(200);
      });
    }
  }, [socket]);

  return (
    <>
      <div className="container progress-container">
        <progress max={TOTAL_HEALTH} value={life}>
          {' '}
          {life}
          {' '}
        </progress>
      </div>
      <div className="container controller-buttons">

        <button
          type="button"
          className="button"
          onTouchStart={() => {
            socket.emit('left', true);
          }}
          onTouchEnd={() => {
            socket.emit('left', false);
          }}
        >
          <div className="left">
            <span className="triangle-background" />
            <div className="action-button triangle">&nbsp;</div>
          </div>
        </button>
        <button
          type="button"
          className="button"
          onTouchStart={() => {
            socket.emit('right', true);
          }}
          onTouchEnd={() => {
            socket.emit('right', false);
          }}
        >
          <div className="right">
            <span className="triangle-background" />
            <div className="action-button  triangle">&nbsp;</div>
          </div>
        </button>

        <button
          type="button"
          className="button action"
          onTouchStart={() => {
            socket.emit('action', true);
          }}
          onTouchEnd={() => {
            socket.emit('action', false);
          }}
        >
          <div className="upright">
            <span className="triangle-background" />
            <div className="action-button triangle">&nbsp;</div>
          </div>
        </button>
        <button
          type="button"
          className="button jump"
          onTouchStart={() => {
            socket.emit('jump', true);
          }}
          onTouchEnd={() => {
            socket.emit('jump', false);
          }}
        >

          <div className="upright">
            <span className="triangle-background" />
            <div className="action-button triangle">&nbsp;</div>
          </div>
        </button>
      </div>
    </>
  );
}

export default Controller;
