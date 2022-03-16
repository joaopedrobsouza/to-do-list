import React, { useState } from "react";

function Item({ key, item, handleUpdate }) {
	const [tempText, setTempText] = useState("");

	function handleStatus() {
		const tempItem = { ...item, active: !item.active };
		handleUpdate(tempItem);
	}

	function handleEdit() {
		const tempItem = { ...item, edit: true };
		handleUpdate(tempItem);
	}

	function handleDelete() {
		const tempItem = { ...item, delete: true };
		handleUpdate(tempItem);
	}

	function handleKeyPress(e) {
		const tempItem = { ...item, text: tempText, active: true, edit: false };
		if (e.charCode === 13 || e.type === "blur") {
			handleUpdate(tempItem);
		}
	}


	return (
		<div className="card">
			<input
				type="checkbox"
				key={key}
				onClick={() => {
					handleStatus();
				}}
				checked={!item.active}
			/>
			<div className="rowContainer">
				
				{item.text && !item.edit ? (
					<span
						onClick={() => handleEdit()}
						style={
							item.active
								? {}
								: { textDecoration: "line-through" }
						}
					>
						{item.text}
					</span>
				) : (
					<input
						type="text"
						value={tempText}
						onChange={(e) => setTempText(e.target.value)}
						onKeyPress={(e) => handleKeyPress(e)}
						onBlur={(e) => handleKeyPress(e)}
					/>
				)}
			</div>

			<button onClick={handleDelete}>Apagar</button>
		</div>
	);
}

export default Item;
