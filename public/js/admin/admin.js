const applyHandlerDeleteBtn = (aDeleteBtn, positionBtn) => {
	aDeleteBtn.addEventListener('click', () => {
		const aProductId = document.querySelectorAll('.tdWithProductId')[positionBtn].textContent
		fetch(`/admin/delete/${aProductId}`,{
			method:'DELETE',
			headers: {
			  'Content-type': 'application/json'
			},
		  }).then( (res) => {
			return res.json()
		}).then((data) => {
            // Recargar la página después de la eliminación
            location.reload();
        }).catch( (error) => {
			console.error("Entro a la excepcion del fetch: Error:", error)
		})
	})
}

document.querySelectorAll('.deleteBtn').forEach(applyHandlerDeleteBtn)


/*
buttonsDelete.forEach(button => {
	button.addEventListener('click', async e => {
		const id = button.dataset.id ?? ''

		const confirmDelete = confirm(`En verdad quieres borrar el item del id '${id}' ?`)
		if (!confirmDelete) return

		const response = await fetch(`/admin/delete/${id}`, {
			method: 'DELETE',
		})
		if (response.ok) {
			window.location.reload()
		} else {
			const errorMessage = await response.text()
			console.error(errorMessage)
			alert(errorMessage)
		}
	})
})
*/