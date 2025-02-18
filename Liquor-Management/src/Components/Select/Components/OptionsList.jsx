export const Option = ({value, id}) => {
  return(
    <li data-index={id}>{value}</li>
  );
};

const OptionsList = ({onChange, children}) => {
  return (
    <div>
      <ul onClick={onChange}>
        {children}
      </ul>
    </div>
  );
};

export default OptionsList;