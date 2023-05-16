// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

/**
 * @title TodoContract
 * @dev simple TODO list in soldiity
 */
contract ToDoContract {
    struct Task {
        string task;
        bool isDone;
    }
    mapping(address => Task[]) private users;

    constructor() {

    }

    function addTodo(string memory _task) external {
        users[msg.sender].push(Task({
            task: _task,
            isDone: false
        }));

    }

    function getTasks(uint taskIndex) external view returns (Task memory) {
        Task storage selectedTask = users[msg.sender][taskIndex];
        return selectedTask;
    }

    function updateTaskStatus(uint256 taskIndex, bool status) external {
        users[msg.sender][taskIndex].isDone = status;
    }

    function deleteTask(uint256 taskIndex) external  {
        delete users[msg.sender][taskIndex];
    }
    function getTasksCount() external view returns(uint256) {
        return users[msg.sender].length;
    }

} 