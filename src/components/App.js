import { getReviews } from "../api"; // api파일안에 getReviews라는 이름의 함수를 가져옴 (이것만 따로 익스포트 했으므로)
import ReviewList from "./ReviewList"; // 리뷰리스트 가져옴
import ReviewForm from "./ReviewForm";
import { Fragment, useEffect, useState } from "react";
const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]); // 아이템 (기본값 빈배열)
  const [order, setOrder] = useState("createdAt"); // 아이템 정렬 기준 (기본값 최신순)
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [search, setSearch] = useState("");

  const ratingSort = items.sort((a, b) => b[order] - a[order]); //

  const handleNewestClick = () => {
    setOrder("createdAt");
  };

  const handleBestClick = () => {
    setOrder("rating");
  };

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getReviews(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    const { reviews, paging } = result;
    if (options.offset === 0) {
      setItems(reviews); // 받은 결과값을 초기값이 빈배열인 items의 setter함수에 넘긴다.
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    setOffset(options.offset + options.limit);
    setHasNext(paging.hasNext);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value);
  };

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT, search });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT, search }); // 현재 정렬값, offset과 limit을 인자로 넘겨준다.
  }, [order, search]); // 현재 영화리스트의 정렬값과 검색값을 디펜던시 리스트로

  return (
    <Fragment>
      <form onSubmit={handleSearchSubmit}>
        <input name="search" />
        <button type="submit">검색</button>
      </form>
      <ReviewForm />
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleBestClick}>평점순</button>
      <ReviewList items={ratingSort} onDelete={handleDelete} />{" "}
      {/*정렬된 아이템이 담긴 ratingSort변수를 ReviewList컴포넌트의 prop인 items에 넘김*/}
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </Fragment>
  );
}

export default App;
