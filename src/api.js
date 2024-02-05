export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 6,
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(
    `https://learn.codeit.kr/9529/film-reviews?${query}`
  );
  const body = await response.json();
  return body; // 이 함수는 결과적으로 특정 기준으로 정렬된 객체를 반환한다.
}
/* getReviews 함수는 영화리뷰 json 데이터 파일의 프로미스 객체
리턴값을 부르는 함수이다

인자로 order를 받으며 이 인자의 초기값은 createdAt(이것은 날짜순의 정렬을 위한 메서드다)

query 변수에는 fetch 함수의 주소값에 문자 리터럴 형식으로 넘길 order의 주소값을 담고 있으며

변수 body에는 이렇게 받은 json 데이터를 자바스크립트 객체 형식으로 변환한 결과값(객체) 를 담고 있고 이것을 최종적으로 반환하고 있다.*/
