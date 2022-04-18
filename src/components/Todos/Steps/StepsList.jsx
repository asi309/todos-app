import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { stepsQuery } from '../../../constants';

import AddStep from './AddStep';
import Step from './Step';
import './StepsList.scss';

const RenderStepsList = ({ steps, todo_id }) => {
  let initialTitles = {};
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    initialTitles = { ...initialTitles, [i]: step.title };
  }
  const [titleList, setTitleList] = useState(initialTitles);

  return (
    <ul className="steps-list">
      {steps.map((step, idx) => (
        <Step
          step={step}
          todo_id={todo_id}
          key={step.id}
          values={titleList}
          changeController={setTitleList}
          index={idx}
        />
      ))}
      <AddStep todo_id={todo_id} />
    </ul>
  );
};

const StepsList = ({ todo_id }) => {
  const { loading, error, data } = useQuery(stepsQuery.getSteps, {
    variables: { todo_id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <div>'loading...'</div>;
  }

  if (error) {
    console.log(error);
  }

  return <RenderStepsList steps={data.steps} todo_id={todo_id} />;
};

export default StepsList;
