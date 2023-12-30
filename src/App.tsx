/** @format */

import React, { useState, FormEvent, useEffect } from "react"; // Imported useState and FormEvent from React

import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask } from "./redux/taskSlice";

type taskType = {
	name: string;
	id: string;
	status: string;
};

interface RootState {
	tasks: taskType[]
}

type formSubmitType = (e: FormEvent<HTMLFormElement>) => void;

const App = () => {
	const [task, setTask] = useState<string>("");
	const tasks = useSelector((state: RootState) => state.tasks);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log(tasks);
	}, [tasks]);

	const handleFormSubmit: formSubmitType = (e) => {
		console.log(task);
		e.preventDefault();
		if (task !== "") {
			const newTask: taskType = {
				name: task,
				id: String(Math.random() * 100),
				status: "panding",
			};
			dispatch(addTask(newTask));
			setTask("");
		}
    else{
      alert("No task is added!!")
    }
	};

	const handleDelete = (id: string): void => {
		dispatch(deleteTask(id));
	};

	const handleUpdate = (id: string, value: string): void => {
		dispatch(deleteTask(id));
		setTask(value);
	};

	return (
		<div className="main-container">
			<h1>Task Holder</h1>
			<div className="add-new-task">
				<form onSubmit={handleFormSubmit}>
					<input
						type="text"
						placeholder="New Task"
						onChange={(e) => {
							setTask(e.target.value);
						}}
						value={task}
					/>
					<button type="submit">Add</button>
				</form>
			</div>
			<div className="all-task-area">
				{tasks.tasks.map((value: taskType, key: number) => (
					<div className="each-task">
						<h1 onClick={() => handleUpdate(value.id, value.name)} key={key}>
							{value.name}
						</h1>
						<i
							onClick={() => handleDelete(value.id)}
							className="fa-solid fa-trash icon"></i>
					</div>
				))}
			</div>
		</div>
	);
};

export default App;
