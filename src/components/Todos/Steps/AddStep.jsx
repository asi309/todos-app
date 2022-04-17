import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { stepsMutations, stepsQuery } from '../../../constants';

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
    <li>
      <input onChange={changeHandler} value={title} placeholder="Add Step" />
      {title && (
        <button className="save-btn" type="button" onClick={submitHandler}>
          Add
        </button>
      )}
    </li>
  );
};

export default AddStep;
