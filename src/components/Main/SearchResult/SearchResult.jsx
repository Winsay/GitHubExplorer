import React, { useState } from 'react';
import axios from 'axios';
import { UserCard } from '../../UserCard/UserCard';
import { ReactComponent as SwitchPage } from '../../../assets/img/switchPage.svg';
import { ReactComponent as LoadingCircle } from '../../../assets/img/loading.svg';

export const SearchResult = ({
  searchRequest,
  currentPage,
  resultSearch,
  history,
  setHistory,
  isLoading,
  loadingReposList,
  setLoadingReposList,
  setUsersRepos,
  usersRepos,
}) => {
  const onChangePage = (value) => {
    if (!isLoading) {
      if (value === 'prev') {
        if (currentPage > 1) {
          searchRequest(undefined, currentPage - 1);
        }
      }
      if (value === 'next') {
        if (currentPage < Math.ceil(resultSearch.totalCount / 3)) {
          searchRequest(undefined, currentPage + 1);
        }
      }
    }
  };

  const onAddToHistory = (obj) => {
    if (!history.find((elem) => elem.login === obj.login)) {
      setHistory((prev) => [...prev, obj]);
    }
  };

  const getRepos = (userName) => {
    setLoadingReposList((prev) => [...prev, userName]);
    return axios
      .get(`https://api.github.com/users/${userName}/repos`)
      .then((response) => response.data)
      .then((data) => {
        if (data.length > 0) {
          setUsersRepos((prev) => [
            ...prev,
            {
              name: userName,
              reposList: data.map((elem) => ({
                reposUrl: elem.html_url,
                reposName: elem.name,
                language: elem.language,
              })),
              isError: false,
            },
          ]);
        } else {
          setUsersRepos((prev) => [...prev, { name: userName, reposList: [], isError: false }]);
        }
        setLoadingReposList((prev) => prev.filter((item) => item !== userName));
      })
      .catch(() => {
        setUsersRepos((prev) => [...prev, { name: userName, reposList: [], isError: false }]);
        setLoadingReposList((prev) => prev.filter((item) => item !== userName));
      });
  };

  return (
    <div className="searchResult">
      <div className="searchResult-header">
        <h2>Result</h2>
        <p>Total found: {resultSearch.totalCount}</p>
      </div>
      <div className="searchResult-main">
        {isLoading ? (
          <LoadingCircle className="loadingCircle" />
        ) : (
          resultSearch.items.map((item) => (
            <UserCard
              key={item.id}
              avatar={item.avatar}
              login={item.login}
              userLink={item.userLink}
              onAddToHistory={onAddToHistory}
              loadingReposList={loadingReposList}
              userReposData={usersRepos.find((elem) => elem.name === item.login)}
              getRepos={getRepos}
            />
          ))
        )}
      </div>
      <div className="searchResult-pagination">
        <SwitchPage
          onClick={() => onChangePage('prev')}
          className={`switchPage prev ${currentPage === 1 || isLoading ? 'disabled' : ''}`}
        />
        <p className="currentPage">{currentPage}</p>
        <SwitchPage
          onClick={() => onChangePage('next')}
          className={`switchPage next ${
            currentPage + 1 > Math.ceil(resultSearch.totalCount / 3) || isLoading ? 'disabled' : ''
          }`}
        />
      </div>
    </div>
  );
};
