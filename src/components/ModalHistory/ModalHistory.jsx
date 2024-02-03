import React from 'react';
import { History } from '../Main/History/History';

export const ModalHistory = ({ setModalActive, history }) => {
  return (
    <div onClick={() => setModalActive(false)} className="modalHistory">
      <History history={history} />
    </div>
  );
};
