
const TextInput = ({ value }) => {
  return (
    <div>
      <input type="text" value={value} />
      <span>^</span>
    </div>
  );
};

export default TextInput;