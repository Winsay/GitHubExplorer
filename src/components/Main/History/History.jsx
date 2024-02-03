import React from 'react';

export const History = ({ history }) => {
  return (
    <div onClick={(event) => event.stopPropagation()} className="history">
      <div className="history-header">
        <h3 className="history-header__title">History</h3>
      </div>
      <div className="history-main">
        {history.length < 1 ? (
          <h3>History is empty</h3>
        ) : (
          <>
            <ul className="history-main__list">
              {history.map((item, index) => {
                return (
                  <a target="_blank" href={item.userLink} key={index} className="list__item">
                    <li>
                      <p className="item__currentNumber">1.</p>
                      <p className="item__userName">{item.login}</p>
                      <div className="item__pic">
                        <img src={item.avatar} alt="" />
                      </div>
                    </li>
                  </a>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
