import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    comment: '',
  });

  const { title, author, genre, year, comment } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const book = {
      title,
      author,
      genre,
      year,
      comment,
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify(book);
      const res = await axios.post('/api/books', body, config);
      console.log(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <form onSubmit={e => onSubmit(e)} id='add-book-form'>
      <h2>Add Book</h2>
      <div className='input-container'>
        <div className='input-groups'>
          <label for='title'>Title</label>
          <br></br>
          <input
            type='text'
            id='title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='input-groups'>
          <label for='author'>Author</label>
          <br></br>
          <input
            name='author'
            value={author}
            onChange={e => onChange(e)}
          ></input>
        </div>
        <div className='input-groups'>
          <label for='genre'>Genre</label>
          <br></br>
          <input name='genre' value={genre} onChange={e => onChange(e)}></input>
        </div>
        <div className='input-groups'>
          <label for='year'>Year</label>
          <br></br>
          <input name='year' value={year} onChange={e => onChange(e)}></input>
        </div>
        <div className='comment-container'>
          <label for='comment'>Comment</label>
          <br></br>
          <textarea
            name='comment'
            className='comment'
            value={comment}
            onChange={e => onChange(e)}
          ></textarea>
        </div>
      </div>
      <Link to='/'>
        <button type='button' className='cancel-button'>
          Cancel
        </button>
      </Link>
      <input type='submit' value='Submit' className='submit' />
    </form>
  );
};

export default Form;
