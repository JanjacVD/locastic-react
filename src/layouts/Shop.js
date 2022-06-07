import axios from "axios";
import { useState, useEffect } from "react";
import IMG from "../images/images";
import Loading from "../components/Loading";
import Workshop from "../components/Workshop";
import arrow from "../images/arrow.svg";
import { workshopsApi, categoriesApi } from "../constants/constants";

function Shop() {
  const [categories, setCategories] = useState();
  const [workshops, setWorkshops] = useState();
  const [displayedCount, setDisplayedCount] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [displayedItems, setDisplayItems] = useState();
  const [currentDisplayCount, setCurrentDisplayCount] = useState();
  const [btnStyle, setBtnStyle] = useState({ display: "block" });
  const [slicedArray, setSlicedArray] = useState();
  const [filterToggled, setFilterToggled] = useState(false);
  function changeArray(category) {
    let quickArray;
    if (category == "All") {
      quickArray = workshops;
    } else {
      quickArray = workshops.filter(
        (workshop) => workshop.category == category
      );
    }
    let quickCount = quickArray.length > 9 ? 9 : quickArray.length;
    setSlicedArray(quickArray.slice(0, quickCount));
    setCurrentDisplayCount(quickCount);
    setDisplayItems(quickArray);
    if (quickArray.length > quickCount) {
      setBtnStyle({ display: "block" });
    } else {
      setBtnStyle({ display: "none" });
    }
  }
  function sliceArray() {
    let quickArray = displayedItems;
    let quickCount = currentDisplayCount + 3;
    let incSliced = quickArray.slice(0, quickCount);
    setCurrentDisplayCount(quickCount);
    setSlicedArray(incSliced);
    if (quickCount >= quickArray.length) {
      setBtnStyle({ display: "none" });
    }
  }
  async function fetchData() {
    const response = await axios
      .get(categoriesApi)
      .catch((err) => console.log(err));
    const setNewCategories = setCategories(response.data);
    const newResponse = await axios
      .get(workshopsApi)
      .catch((err) => console.log(err));
    const setCount = setDisplayedCount(newResponse.data.length);
    const setNewWorkshops = setWorkshops(newResponse.data);
    const count = newResponse.data.length > 9 ? 9 : newResponse.data.length;
    const setArray = setSlicedArray(newResponse.data.slice(0, count));
    const alsoSetArray = setDisplayItems(newResponse.data);
    const alsoCount = setCurrentDisplayCount(count);
    const removeSpinner = setDataLoaded(true);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const img = new IMG();
  const [currentCategory, setCurrentCategory] = useState("All");
  if (dataLoaded) {
    return (
      <div className="grid-alignment">
        <div className="biggy-title">
          <h1>Workshops</h1>
          <div className="items-displayed">
            <h6>Displayed:</h6>
            <h6 className="counter">{displayedCount}</h6>
          </div>
        </div>
        <div className="filter">
          <h6>Filter by category:</h6>
          <br />
          <br />
          <ul>
            <li
              className="filter-link"
              onClick={() => {
                setCurrentCategory("All");
                setDisplayedCount(workshops.length);
                changeArray("All");
              }}
            >
              <a>
                <span />
                <h5
                  className={
                    currentCategory !== "All"
                      ? "filter-item "
                      : "filter-item filter-item-toggled"
                  }
                >
                  All
                </h5>
              </a>
            </li>
            {categories !== null ? (
              categories.map((category, index) => (
                <li
                  onClick={() => {
                    setCurrentCategory(category);
                    setDisplayedCount(
                      workshops.filter(
                        (workshop) => workshop.category == category
                      ).length
                    );
                    changeArray(category);
                  }}
                  className="filter-link"
                  key={index}
                >
                  <a>
                    {" "}
                    <img src={img[category]} alt={category} />{" "}
                    <h5
                      className={
                        currentCategory != category
                          ? "filter-item "
                          : "filter-item filter-item-toggled"
                      }
                    >
                      {category}
                    </h5>
                  </a>
                </li>
              ))
            ) : (
              <h1>No data</h1>
            )}
          </ul>
        </div>
        <div className="filter-mobile">
          <h5
            className="filter-mobile-current filter-item-toggled"
            onClick={() => setFilterToggled(!filterToggled)}
          >
            <img
              src={arrow}
              className={filterToggled ? "arrow-rotated" : "arrow"}
              alt="arrow"
            />
            {currentCategory}
          </h5>
          <ul
            className={
              filterToggled ? "filter-box-mobile" : "filter-box-mobile-off"
            }
          >
            <li
              className={
                currentCategory === "All"
                  ? "filter-link-disabled"
                  : "filter-link"
              }
              onClick={() => {
                setCurrentCategory("All");
                setDisplayedCount(workshops.length);
                changeArray("All");
                setFilterToggled(false);
              }}
            >
              <a>
                <h5 className="filter-item">All</h5>
              </a>
            </li>
            {categories !== null
              ? categories.map((category, index) => (
                  <li
                    onClick={() => {
                      setCurrentCategory(category);
                      setDisplayedCount(
                        workshops.filter(
                          (workshop) => workshop.category == category
                        ).length
                      );
                      changeArray(category);
                      setFilterToggled(false);
                    }}
                    className={
                      currentCategory === category
                        ? "filter-link-disabled"
                        : "filter-link"
                    }
                    key={index}
                  >
                    <a>
                      {" "}
                      <h5
                        className={
                          currentCategory !== category
                            ? "filter-item "
                            : "filter-item filter-link-toggled"
                        }
                      >
                        {category}
                      </h5>
                    </a>
                  </li>
                ))
              : ""}
          </ul>
        </div>
        <div className="workshops">
          {slicedArray != null ? (
            currentCategory != "All" ? (
              slicedArray
                .filter((workshop) => workshop.category == currentCategory)
                .sort((a, b) => b.date - a.date)
                .map((workshop) => (
                  <Workshop
                    key={workshop.id}
                    id={workshop.id}
                    image={workshop.imageUrl}
                    date={workshop.date}
                    title={workshop.title}
                    price={workshop.price}
                  />
                ))
            ) : (
              slicedArray
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((workshop) => (
                  <Workshop
                    key={workshop.id}
                    id={workshop.id}
                    image={workshop.imageUrl}
                    date={workshop.date}
                    title={workshop.title}
                    price={workshop.price}
                  />
                ))
            )
          ) : (
            <h1>No data</h1>
          )}
          <div className="btn-container">
            <button
              style={btnStyle}
              onClick={() => sliceArray()}
              id="show-more-btn"
            >
              Load more
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <Loading />
      </>
    );
  }
}
export default Shop;
