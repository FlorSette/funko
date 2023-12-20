// @ts-check

function setupGlide() {
	/** @type {import("@glidejs/glide")} */
	const glide = new Glide('.glide', {
		perView: 1,
		rewind: false,
		gap: 0,
		bound: true,
		dragThreshold: false,
	})
	glide.mount()
}

// function cloneGrid(num = 1) {
//     const productGrid = document.querySelector(".product-grid")
//     for (let i = 0; i < num; i++) {
//         productGrid.after(productGrid.cloneNode(true))
//     }
// }

// cloneGrid(4)
setupGlide()
