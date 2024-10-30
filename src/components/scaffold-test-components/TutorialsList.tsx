/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, ChangeEvent } from "react";
import TutorialDataService from "../../services/scaffold-test-services/TutorialService.ts";
import { Link } from "react-router-dom";
import ITutorialData from '../../types/scaffold-test-types/Tutorial.ts';

const TutorialsList: React.FC = () => {
  const [tutorials, setTutorials] = useState<Array<ITutorialData>>([]);
  const [currentTutorial, setCurrentTutorial] = useState<ITutorialData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then((response: any) => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial: ITutorialData, index: number) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    TutorialDataService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then((response: any) => {
        setTutorials(response.data);
        setCurrentTutorial(null);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
      <div className="flex flex-col items-center  justify-center">
        <div className="col-md-8">
          <div className="input-group mb-3 justify-center">

            <input
                type="text"
                className="focus:outline-none focus:shadow-outline border border-green-400 rounded-lg py-2 px-4 block appearance-none leading-normal m-10"
                placeholder="Search by title"
                value={searchTitle}
                onChange={onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Tutorials List</h4>

          <ul className="list-group">
            {tutorials &&
                tutorials.map((tutorial, index) => (
                    <li
                        className={
                            "list-group-item " + (index === currentIndex ? "active" : "")
                        }
                        onClick={() => setActiveTutorial(tutorial, index)}
                        key={index}
                    >
                      {tutorial.title}
                    </li>
                ))}
          </ul>

          <button
              className="m-3 btn btn-sm btn-danger"
              onClick={removeAllTutorials}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
              <div>
                <h4>Tutorial</h4>
                <div>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentTutorial.title}
                </div>
                <div>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentTutorial.description}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentTutorial.published ? "Published" : "Pending"}
                </div>

                <Link
                    to={"/tutorials/" + currentTutorial.id}
                    className="badge badge-warning"
                >
                  Edit
                </Link>
              </div>
          ) : (
              <div>
                <br/>
                <p>Please click on a Tutorial...</p>
              </div>
          )}
        </div>
      </div>
  );
};

export default TutorialsList;
