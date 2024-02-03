import React from 'react';
import logo from '../../assets/img/github.svg';
import useMatchMedia from 'use-match-media-hook';
import { useContext } from 'react';
import { myContext } from '../../App';

const queries = ['(max-width: 600px)'];

export const Header = () => {
  const [mobile] = useMatchMedia(queries);
  const { modalActive, setModalActive } = useContext(myContext);
  return (
    <div className="header">
      <div className="headerLogo">
        <img src={logo} alt="Logo" className="headerLogo_img" />
      </div>
      <div className="headerTitle">
        Git<span>Hub</span> Explorer
      </div>
      {mobile && (
        <button
          onClick={() => setModalActive(!modalActive)}
          className={`historyBtn ${modalActive ? 'active' : ''}`}>
          History
        </button>
      )}
    </div>
  );
};
