import React, { useState } from 'react';
import { ReactComponent as ArrowIco } from '../../assets/img/arrow.svg';
import { ReactComponent as LoadingCircle } from '../../assets/img/loading.svg';

export const UserCard = ({
  avatar,
  login,
  userLink,
  onAddToHistory,
  loadingReposList,
  userReposData,
  getRepos,
}) => {
  const [isOpenned, setIsOpenned] = useState(false);

  const addToHistory = () => {
    onAddToHistory({ login, avatar, userLink });
  };

  const onGetRepos = () => {
    if (!userReposData) {
      getRepos(login).then(() => setIsOpenned(true));
    } else {
      setIsOpenned((prev) => !prev);
    }
  };

  return (
    <div className="userCard">
      <div className="userCard-top">
        <a onClick={addToHistory} target="_blank" rel="noreferrer" href={userLink}>
          <p className="userName">{login}</p>
        </a>
        <a onClick={addToHistory} target="_blank" rel="noreferrer" href={userLink}>
          <div className="userAvatar">
            <img src={avatar} alt="" />
          </div>
        </a>
      </div>
      {userReposData && isOpenned ? (
        <div className="reposList">
          {userReposData.reposList.length > 0 ? (
            userReposData.reposList.map((repository, index) => {
              return (
                <a
                  className="reposList_item"
                  key={index}
                  target="_blank"
                  href={repository.reposUrl}>
                  <div>
                    <p>{repository.reposName}</p>
                    <p>{repository.language}</p>
                  </div>
                </a>
              );
            })
          ) : userReposData.isError ? (
            <div>Unknown error</div>
          ) : (
            <div>No repositories found</div>
          )}
        </div>
      ) : (
        ''
      )}
      <div className="userCard-bot">
        <button onClick={onGetRepos} className="repositoriesBtn">
          Repositories
          {loadingReposList.find((user) => user === login) ? (
            <LoadingCircle className="reposLoading" />
          ) : (
            <ArrowIco className={`arrowIco ${isOpenned ? 'openned' : ''}`} />
          )}
        </button>
      </div>
    </div>
  );
};
