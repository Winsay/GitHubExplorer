import React, { useState } from 'react';
import { ReactComponent as CleanSearch } from '../../assets/img/cleanSearch.svg';

export const Search = ({
  searchRequest,
  setSearchValue,
  isLoading,
  setUsersRepos,
  loadingReposList,
}) => {
  const [inputValue, setInputValue] = useState('');

  const cleanSearch = (e) => {
    e.preventDefault();
    document.querySelector('.searchInput').focus();
    setInputValue('');
  };

  const onSearch = () => {
    setSearchValue(inputValue);
    searchRequest(inputValue, 1);
    setUsersRepos([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="searchBlock">
      <div className="searchWrapp">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="GitHub NickName..."
          className="searchInput"
          type="text"
        />
        {inputValue.length > 0 ? (
          <CleanSearch onMouseDown={cleanSearch} className="cleanSearch" />
        ) : (
          ''
        )}
      </div>
      <button
        onClick={onSearch}
        disabled={inputValue.length < 1 || isLoading || loadingReposList.length > 0}
        className="searchButton">
        Find
      </button>
    </div>
  );
};
