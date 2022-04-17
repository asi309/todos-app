import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
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
  // const [index, setIndex] = useState(steps?.length || 0);

  const { loading, error, data } = useQuery(stepsQuery.getSteps, {
    variables: { todo_id },
    fetchPolicy: 'cache-and-network',
  });

  // const handleAddSteps = () => {

  // }

  if (loading) {
    return <div>'loading...'</div>;
  }

  if (error) {
    console.log(error);
  }

  // if (!data?.steps?.length) {
  //   return (
  //     <div className="steps" onClick={handleAddSteps}>
  //       <AiOutlinePlus fontSize={18} />
  //       <p>Add Steps</p>
  //     </div>
  //   );
  // }

  return <RenderStepsList steps={data.steps} todo_id={todo_id} />;
};

export default StepsList;
