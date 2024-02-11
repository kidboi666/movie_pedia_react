import { useState } from "react"; // 리액트 패키지에서 useState Hook 가져옴
import FileInput from "./FileInput";
import "./ReviewForm.css"; // css 가져옴

const ReviewForm = () => {
  const [values, setValues] = useState({
    // state 초기값을 객체로 만들어 복수의 prop을 일괄로 제어
    title: "", // values.title => const values = new Array({title:""})
    rating: 0,
    content: "",
    imgFile: null,
  });

  const handleChange = (name, value) => {
    // form안에 input에 입력된 값을 받음 (입력된 input의 prop name, 값)
    setValues((prevValues) => ({
      // setter함수의 인자로 콜백을 넣으면 해당 콜백함수의 파라미터는 해당 state의 이전값이 온다.
      ...prevValues, // state의 이전값을 spread구문으로 펼쳐 새객체값으로 복제하고
      [name]: value, // 그 위에 event.target으로 받은 value와 name을 각각 객체의 프로퍼티 형식으로 덮어씌운다.
    }));
  };

  const handleInputChange = (event) => {
    // form 안에 input에 입력된 값을 받는 함수   ex) name prop이 imgFile인 input에 값을 받았을 경우
    const { name, value } = event.target; // event.target의 value와 name을 구조분해할당    ex) { imgFile, 'file경로?' }
    handleChange(name, value); // 분해할당된 변수를 인자로 handleChange 함수 호출   ex) handleChange(imgFile, 'file경로?')
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput name="imgFile" value={values.imgFile} onChange={handleChange} />
      <label htmlFor="title">영화 제목</label>
      <input name="title" value={values.title} onChange={handleInputChange} />
      <label htmlFor="rating">평점</label>
      <input name="rating" value={values.rating} type="number" max="5" onChange={handleInputChange} />
      <label htmlFor="content">내용</label>
      <textarea name="content" value={values.content} onChange={handleInputChange} />
      <button type="submit">확인</button>
    </form>
  );
};

export default ReviewForm;
