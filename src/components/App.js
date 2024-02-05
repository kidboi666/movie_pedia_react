import { getReviews } from "../api"; // api파일안에 getReviews라는 이름의 함수를 가져옴 (이것만 따로 익스포트 했으므로)
import ReviewList from "./ReviewList"; // 리뷰리스트 가져옴
import { useEffect, useState } from "react";
const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const handleNewestClick = () => setOrder("createdAt");

  const handleBestClick = () => setOrder("rating");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    // 현재의 정렬값을 파라미터로 받음
    const { reviews, paging } = await getReviews(options); // getReviews함수에 현재의 정렬값을 넘긴 결과값을 받는다.
    console.log(paging);
    if (options.offset === 0) {
      setItems(reviews); // 받은 결과값을 초기값이 빈배열인 items의 setter함수에 넘긴다.
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT }); // 현재 정렬값, offset과 limit을 인자로 넘겨준다.
  }, [order]); // 현재 영화리스트의 정렬값을 디펜던시 리스트로 정해놓았다.

  const ratingSort = items.sort((a, b) => b[order] - a[order]);

  return (
    <>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleBestClick}>평점순</button>
      <ReviewList items={ratingSort} onDelete={handleDelete} />
      {hasNext && <button onClick={handleLoadMore}>더 보기</button>}
    </>
  );
}

export default App;
