import React from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';

const SERVER_URL = 'http://localhost:5000';

function NewPost() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <form class='form-signin' onSubmit={handleSubmit(onSubmit)}>
      <img
        class='mb-4'
        src='../../public/icons/InstaCloneIcon.png'
        alt=''
        width='72'
        height='72'
      />
      <h1 class='h3 mb-3 font-weight-normal'>New Post</h1>
      <label class='sr-only'>Select a Photo</label>
      <input name='image' type='file' />
      <label class='sr-only'>Title</label>
      <input
        name='title'
        type='text'
        id='inputEmail'
        class='form-control'
        placeholder='Title'
        ref={register}
        required
        autofocus
      />
      <div class='form-group'>
        <label class='sr-only'>Caption</label>
        <textarea
          name='caption'
          class='form-control'
          ref={register}
          rows='3'
          placeholder='Caption'></textarea>
      </div>

      <button class='btn btn-lg btn-primary btn-block' type='submit'>
        Submit
      </button>
    </form>
  );
}

export default NewPost;
