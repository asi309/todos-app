import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { stepsMutations, stepsQuery } from '../../../constants';
import './AddStep.scss';

const AddStep = ({ todo_id }) => {
  const [title, setTitle] = useState('');

  const resetForm = () => {
    setTitle('');
  };

  const updateCache = (cache, { data }) => {
    const existingSteps = cache.readQuery({
      query: stepsQuery.getSteps,
      variables: { todo_id },
    });

    const newStep = data.insert_steps.returning[0];
    cache.writeQuery({
      query: stepsQuery.getSteps,
      variables: { todo_id },
      data: { steps: [...existingSteps?.steps, newStep] },
    });
  };

  const [addStep] = useMutation(stepsMutations.addStep, {
    update: updateCache,
    onCompleted: resetForm,
  });

  const changeHandler = (e) => {
    setTitle(e.target.value);
  };

  const submitHandler = (e) => {
    addStep({
      variables: {
        title,
        id: todo_id,
      },
    });
  };

  return (
    <li className='step-item'>
      <input onChange={changeHandler} value={title} placeholder="Add Step" className='add-step' />
      {title && (
        <button className="add-btn" type="button" onClick={submitHandler}>
          Add
        </button>
      )}
    </li>
  );
};

export default AddStep;
