import React  ,{ useState }from 'react'


const Search = ({putAlert,searchUsers,showClear,clearUsers}) => {
    const [text,setText] = useState('')

    const onSubmit = e => {
        e.preventDefault();
        if (text === '') {
          putAlert('Please enter something', 'light');
        } else {
          searchUsers(text);
          setText('');
        }
      };
  const onChange = e => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {showClear && (
        <button
          className='btn btn-light btn-block'
          onClick={clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search
