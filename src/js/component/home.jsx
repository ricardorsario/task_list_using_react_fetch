import React, { useEffect, useState } from "react";
import Task from "./task.jsx";

const Home = () => {
	const [dataFetch, setDataFetch] = useState([]);
	const [task, setTask] = useState("");

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/saurotauro", {
			method: "GET"
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json();
			})
			.then(data => {
				setDataFetch(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		if (dataFetch.length) {
			setTask(
				dataFetch.map((dataFetch, index) => {
					return (
						<div className="fix" key="01">
							<i className="fas fa-arrow-right"></i>
							<Task
								text={dataFetch.label}
								id={index}
								key={index.toString()}
								delete={deleteApi}
							/>
						</div>
					);
				})
			);
		}
	}, [dataFetch]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/saurotauro", {
			method: "PUT",
			body: JSON.stringify(dataFetch),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp);
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, [dataFetch]);

	const deleteApi = indexDelete => {
		setDataFetch(dataFetch.filter((_, index) => index !== indexDelete));
	};

	return (
		<div className="container">
			<div className="container-2">
				<div className="circle"></div>
				<span className="bold title">tasks.exe error</span>
			</div>
			<div className="line-divider"></div>
			<div className="warning-box">
				<i className="fas fa-trash-alt fa-3x"></i>
				<div className="warning-box-inside">
					<h1>your_energy.exe has stopped working</h1>
					<span className="medium">
						You should delete all items in your task list and nap.
					</span>
				</div>
			</div>
			<div className="li-box">
				<form
					onSubmit={e => {
						e.preventDefault();
					}}>
					<input
						id="task"
						name="task"
						autoComplete="off"
						className="form-control"
						type="text"
						placeholder="Add something or better not..."
						onKeyPress={e => {
							if (e.target.value != " ") {
								if (e.key === "Enter") {
									{
										setDataFetch([
											...dataFetch,
											{
												label: e.target.value,
												done: false
											}
										]);
										e.target.value = "";
									}
								}
							}
						}}></input>
				</form>
				<div>
					<ol>{task}</ol>
				</div>
			</div>
		</div>
	);
};

export default Home;
