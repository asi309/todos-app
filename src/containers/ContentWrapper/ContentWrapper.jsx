import { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { AddTodoModal } from '../../components';
import './ContentWrapper.scss';

const ContentWrapper = (Content, props) => {
  return function HOC(props) {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };

    return (
      <div className="app__container">
        <Content {...props} />
        {!window.location.pathname.includes('/todos/') && (
          <div className="cta__add-wrapper" data-tip>
            <button className="cta__add" onClick={openModal}>
              +
            </button>
            <ReactTooltip
              className="cta__tooltip"
              effect="solid"
              arrowColor="#fff"
            >
              {props.description}
            </ReactTooltip>
            <AddTodoModal
              modalOpen={modalOpen}
              changeFn={setModalOpen}
              {...props}
            />
          </div>
        )}
      </div>
    );
  };
};

export default ContentWrapper;
