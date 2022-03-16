import "./App.css";
import Item from "../src/components/item";
import React, { useEffect, useState } from "react";
import todoApi from './services/apiHandler';

function App() {
	const [itens, setItens] = useState([]);
	const [filter, setFilter] = useState({ filter: false, active: false })

	function getList() {
		fetch('http://localhost:3000/to-do/list')
			.then(response => response.json())
			.then(data => {
				setItens(data.data)
			});
	}

	function handleUpdate(item) {
		if (item.delete) {
			todoApi('delete', 'delete', item).then(data => {
				getList()
			})
			return;
		}

		todoApi('update', 'put', item).then(data => {
			getList()
		})
	}

	function handleAdd() {
		todoApi('insert', 'post', { "text": "", "active": "true" })
			.then(data => {
				console.log(data)
				getList()
			})
	}

	const itensToShow = filter.filter
		? itens.filter(item => item.active === filter.active)
		: itens

	useEffect(() => {
		getList()
	}, [])

	return (

		<div className="main">
			<div className="to-do-list">
				<h1>To Do List</h1>

				{itensToShow.map((item) => {
					return (
						<Item
							key={item._id}
							itens={itens}
							item={item}
							handleUpdate={handleUpdate}
						/>
					);
				})}
				<div className="rowContainer">
					<span className={"filter"} style={filter.filter ? {} : { fontWeight: "bold" }} onClick={() => setFilter({ filter: false })}>Todos</span>
					<span className={"filter"} style={(filter.filter && filter.active === true) ? { fontWeight: "bold" } : {}} onClick={() => setFilter({ filter: true, active: true })}>Pendentes</span>
					<span className={"filter"} style={(filter.filter && filter.active === false) ? { fontWeight: "bold" } : {}} onClick={() => setFilter({ filter: true, active: false })}> Concluídos</span>
				</div>
				<div className="rowContainer">
					<button onClick={handleAdd}>Adicionar To Do</button>
				</div>
			</div>
		</div>
	);
}

export default App;
