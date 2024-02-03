import React, { useContext, useEffect, useState } from 'react';
import useMatchMedia from 'use-match-media-hook';
import axios from 'axios';
import { Search } from '../Search/Search';
import { SearchResult } from './SearchResult/SearchResult';
import { History } from './History/History';
import { ModalHistory } from '../ModalHistory/ModalHistory';
import { myContext } from '../../App';
import { ReactComponent as NotFoundIco } from '../../assets/img/requestNotFound.svg';
import { ReactComponent as LoadingCircle } from '../../assets/img/loading.svg';

const queries = ['(max-width: 600px)'];

export const Main = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [searchValue, setSearchValue] = useState('');
  const [resultSearch, setResultSearch] = useState('default');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingReposList, setLoadingReposList] = useState([]);
  const [usersRepos, setUsersRepos] = useState([]);
  const [history, setHistory] = useState([]);
  const [mobile] = useMatchMedia(queries);
  const { modalActive, setModalActive } = useContext(myContext);
  useEffect(() => {
    if (!mobile) {
      setModalActive(false);
    }
  }, [mobile]);

  const searchRequest = (value = searchValue, page) => {
    setIsLoading(true);
    axios
      .get(`https://api.github.com/search/users?q=${value}%20&per_page=3&page=${page}`)
      .then((res) => {
        if (res.status !== 200 || res.data.items.length === 0) {
          throw new Error('empty response or request error');
        } else {
          return res.data;
        }
      })
      .then((data) => {
        setResultSearch({
          items: data.items.map((elem, index) => ({
            id: index,
            login: elem.login,
            avatar: elem.avatar_url,
            userLink: elem.html_url,
          })),
          totalCount: data.total_count,
        });
        setCurrentPage(page);
        setIsLoading(false);
      })
      .catch(() => {
        setResultSearch('notFound');
        setIsLoading(false);
      });
  };

  return (
    <div className="main">
      {mobile && modalActive ? (
        <ModalHistory history={history} setModalActive={setModalActive} />
      ) : (
        ''
      )}
      <Search
        searchRequest={searchRequest}
        setSearchValue={setSearchValue}
        isLoading={isLoading}
        setUsersRepos={setUsersRepos}
        loadingReposList={loadingReposList}
      />
      <div className="content">
        {resultSearch === 'default' ? (
          isLoading ? (
            <LoadingCircle className="loadingCircle" />
          ) : (
            <h2 className="contentDefault">Please, enter your request!</h2>
          )
        ) : !Array.isArray(resultSearch.items) ? (
          <div className="notFound">
            <h2>Nothing was found for your request!</h2>
            <div className="notFoundImgWrapp">
              <NotFoundIco />
            </div>
            <button onClick={() => setResultSearch('default')}>clear search</button>
          </div>
        ) : (
          <>
            <SearchResult
              usersRepos={usersRepos}
              setUsersRepos={setUsersRepos}
              loadingReposList={loadingReposList}
              setLoadingReposList={setLoadingReposList}
              isLoading={isLoading}
              history={history}
              setHistory={setHistory}
              searchRequest={searchRequest}
              resultSearch={resultSearch}
              currentPage={currentPage}
            />
            {!mobile && <History history={history} />}
          </>
        )}
      </div>
    </div>
  );
};
