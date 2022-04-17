import { useMutation } from '@apollo/client';

import { stepsMutations, stepsQuery } from '../../../constants';

const Step = ({ step, todo_id, changeController, index, values }) => {
  const updateCacheOnToggleComplete = (cache) => {
    const existingSteps = cache.readQuery({
      query: stepsQuery.getSteps,
      variables: { todo_id },
    });

    const updatedSteps = existingSteps?.steps.map((s) => {
      if (s.id === step.id) {
        return { ...s, is_complete: !s.is_complete };
      } else {
        return s;
      }
    });

    cache.writeQuery({
      query: stepsQuery.getSteps,
      variables: { todo_id },
      data: { steps: updatedSteps },
    });
  };

  const updateCacheOnClearStep = (cache) => {
    const existingSteps = cache.readQuery({
      query: stepsQuery.getSteps,
      variables: { todo_id },
    });

    const filteredSteps = existingSteps?.steps.filter((s) => s.id !== step.id);

    cache.writeQuery({
      query: stepsQuery.getSteps,
      variables: { todo_id },
      data: { steps: filteredSteps },
    });
  };

  const updateCacheOnUpdate = (cache, { data }) => {
    const existingSteps = cache.readQuery({
      query: stepsQuery.getSteps,
      variables: { todo_id },
    });

    const updates = data.update_steps.returning[0];

    const updatedSteps = existingSteps?.steps.map((s) => {
      if (s.id === step.id) {
        return { ...s, title: updates?.title };
      }
    });

    cache.writeQuery({
      query: stepsQuery.getSteps,
      variables: { todo_id },
      data: { todos: updatedSteps },
    });
  };

  const [toggleStepCompleteMutation] = useMutation(
    stepsMutations.toggleComplete,
    {
      update: updateCacheOnToggleComplete,
      optimisticResponse: true,
    }
  );

  const [clearStepMutation] = useMutation(stepsMutations.clearStep, {
    update: updateCacheOnClearStep,
    optimisticResponse: true,
  });

  const [updateStepMutation] = useMutation(stepsMutations.updateStep, {
    update: updateCacheOnUpdate,
  });

  const toggleCompleteHandler = () => {
    toggleStepCompleteMutation({
      variables: { id: step.id, isComplete: !step.is_complete },
    });
  };

  const clearStepHandler = () => {
    clearStepMutation({
      variables: { id: step.id },
      refetchQueries: ['getSteps'],
      awaitRefetchQueries: true,
    });
  };

  const changeHandler = (e) => {
    changeController((state) => {
      return { ...state, [index]: e.target.value };
    });
  };

  const submitHandler = () => {
    updateStepMutation({
      variables: { id: step.id, title: values[index] },
      refetchQueries: ['getSteps'],
      awaitRefetchQueries: true
    })
  };

  return (
    <li>
      <div className="round">
        <input
          type="checkbox"
          name="is_complete"
          id={step.id}
          checked={step.is_complete}
          onChange={toggleCompleteHandler}
        />
        <label htmlFor={step.id} />
      </div>
      <input type="text" value={values[index]} onChange={changeHandler} />
      <button type="button" onClick={clearStepHandler}>
        Clear
      </button>
      {step.title !== values[index] && (
        <button className="save-btn" type="button" onClick={submitHandler}>
          Update
        </button>
      )}
    </li>
  );
};

export default Step;
