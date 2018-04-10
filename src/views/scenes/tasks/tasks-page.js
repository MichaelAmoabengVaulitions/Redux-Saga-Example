import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { taskActions, getVisibleTasks } from '../../../tasks';
import TaskFilters from '../../components/task-filters';
import TaskForm from '../../components/task-form';
import TaskList from '../../components/task-list';


const TasksPage = ({createTask, location, removeTask, tasks, updateTask}) => {
  const params = new URLSearchParams(location.search);
  const filter = params.get('filter');

  return (
    <div className="g-row">
      <div className="g-col">
        <TaskForm handleSubmit={createTask} />
      </div>

      <div className="g-col">
        <TaskFilters filter={filter} />
        <TaskList
          filter={filter}
          removeTask={removeTask}
          tasks={tasks}
          updateTask={updateTask}
        />
      </div>
    </div>
  );
};

TasksPage.propTypes = {
  createTask: PropTypes.func.isRequired,
  filterTasks: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  removeTask: PropTypes.func.isRequired,
  tasks: PropTypes.instanceOf(List),
  updateTask: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  tasks: getVisibleTasks(state)
});

const mapDispatchToProps = {
  createTask: taskActions.createTask,
  filterTasks: taskActions.filterTasks,
  removeTask: taskActions.removeTask,
  updateTask: taskActions.updateTask
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TasksPage)
);
