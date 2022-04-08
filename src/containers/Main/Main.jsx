import { useState } from 'react';
import { BiSun } from 'react-icons/bi';
import { AiOutlineStar } from 'react-icons/ai';
import { BsListTask, BsCalendar3 } from 'react-icons/bs';

import { Sidebar, TodoDetails, TodosList } from '../../components';
import { Route, Routes } from 'react-router-dom';

const Main = () => {
  const [index, setIndex] = useState(2);

  const sectionsList = [
    {
      title: 'today',
      Icon: BiSun,
      link: 'today',
    },
    {
      title: 'important',
      Icon: AiOutlineStar,
      link: 'important',
    },
    {
      title: 'planned',
      Icon: BsCalendar3,
      link: '/planned',
    },
    {
      title: 'todos',
      Icon: BsListTask,
      link: '/',
    },
  ];

  return (
    <main>
      <Sidebar index={index} changeHandler={setIndex} list={sectionsList} />
      <Routes>
        <Route
          path="/today"
          element={<TodosList list="today" description="Add todos for today" />}
        />
        <Route
          path="/important"
          element={
            <TodosList list="important" description="Add important todos" />
          }
        />
        <Route
          path="/planned"
          element={
            <TodosList list="planned" description="Add todos for future" />
          }
        />
        <Route path="/todos/:id" element={<TodoDetails description="Add todos" />} />
        <Route path="/" element={<TodosList description="Add todos" />} />
      </Routes>
    </main>
  );
};

export default Main;
