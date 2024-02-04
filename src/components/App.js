import ReviewList from "./ReviewList"; // 리뷰리스트 가져옴
import items from "../mock.json"; // 목업의 역할인 (작성된 리뷰들) json데이터 가져옴

function App() {
  return (
    <>
      <ReviewList items={items} />
      {/*리뷰리스트 컴포넌트에 items prop에 목업으로 가져온 json데이터 items를 넘김*/}
    </>
  );
}

export default App;
