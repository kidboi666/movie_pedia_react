function FileInput({ name, value, onChange }) {
  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
    console.log(onChange());
  };

  return <input type="file" onChange={handleChange} />;
}

export default FileInput;

/* 리액트에서 fileInput은 반드시 비제어 컴포넌트로 구현되어야 한다. */
