let vehicleData = [];

// DOM Elements
const yearSelect = document.getElementById("year");
const makeSelect = document.getElementById("make");
const modelSelect = document.getElementById("model");
const productTypeSelect = document.getElementById("product-type");
const errorMessage = document.getElementById("error-message");

// Helper function to reset irrelevant dropdown options
function resetSelect(select, placeholder) {
	const sanitizedPlaceholder = placeholder.toString().replace(/<[^>]*>/g, "");
	select.innerHTML = `<option value="" disabled selected>${sanitizedPlaceholder}</option>`;
	const wrapper = select.closest(".custom-select");
	if (wrapper) {
		rebuildOptions(wrapper);
		const display = wrapper.querySelector(".selected-value");
		if (display) display.textContent = sanitizedPlaceholder;
		select.dispatchEvent(new Event("change"));
	}
}

// Populate Years After Loading
function populateYears() {
	// 1) clear out anything from the dependent selects
	resetSelect(yearSelect, "Year");
	resetSelect(makeSelect, "Make");
	resetSelect(modelSelect, "Model");
	resetSelect(productTypeSelect, "Product Type");

	let optionsHTML = "";
	optionsHTML += `<option value="" >Year</option>`;
	const years = [...new Set(vehicleData.map((data) => data.year))].sort(
		(a, b) => b - a
	);
	years.forEach((year) => {
		optionsHTML += `<option value="${year}">${year}</option>`;
	});
	yearSelect.innerHTML = optionsHTML;
	if (years.length === 1) {
		yearSelect.value = years[0];
	}
	yearSelect.dispatchEvent(new Event("change"));
}

// Populate Makes After Year Selection
function populateMakes() {
	resetSelect(modelSelect, "Model");
	resetSelect(productTypeSelect, "Product Type");
	resetSelect(makeSelect, "Make");

	if (!yearSelect.value) return;
	let optionsHTML = "";
	const makes = [
		...new Set(
			vehicleData
				.filter((data) => data.year === yearSelect.value)
				.map((v) => v.make)
		),
	];

	optionsHTML += `<option value="">Make</option>`;
	makes.forEach((make) => {
		optionsHTML += `<option value="${make}">${make}</option>`;
	});
	makeSelect.innerHTML = optionsHTML;
	// Auto-select if only one make is available
	if (makes.length === 1) {
		makeSelect.value = makes[0];
	}

	makeSelect.dispatchEvent(new Event("change"));
	autoOpenCustomDropdown(makeSelect);
}

// Populate Models After Make Selection
function populateModels() {
	resetSelect(modelSelect, "Model");
	resetSelect(productTypeSelect, "Product Type");

	if (!makeSelect.value) return;
	let optionsHTML = "";
	const models = [
		...new Set(
			vehicleData
				.filter(
					(data) =>
						data.year === yearSelect.value && data.make === makeSelect.value
				)
				.map((v) => v.model)
		),
	];
	optionsHTML += `<option value="">Model</option>`; // Add placeholder
	models.forEach(
		(model) => (optionsHTML += `<option value="${model}">${model}</option>`)
	);
	modelSelect.innerHTML = optionsHTML;
	if (models.length === 1) {
		modelSelect.value = models[0];
	}

	modelSelect.dispatchEvent(new Event("change"));
	autoOpenCustomDropdown(modelSelect);
}

// Populate Product Types After Model Selection
function populateProductType() {
	if (!modelSelect.value) return; // TODO: could return a warning
	let optionsHTML = "";
	const productTypes = [
		...new Set(
			vehicleData
				.filter(
					(data) =>
						data.year === yearSelect.value &&
						data.make === makeSelect.value &&
						data.model === modelSelect.value
				)
				.map((v) => v.productTypes)
		),
	];
	optionsHTML += `<option value="">Product Type</option>`; // Add placeholder

	productTypes.forEach(
		(productType) =>
			(optionsHTML += `<option value="${productType}">${productType}</option>`)
	);
	productTypeSelect.innerHTML = optionsHTML;

	if (productTypes.length === 1) {
		productTypeSelect.value = productTypes[0];
	}
	productTypeSelect.dispatchEvent(new Event("change"));
	autoOpenCustomDropdown(productTypeSelect);
}

yearSelect.addEventListener("change", () => {
	populateMakes();
	updateSubmitButtonState();
});
makeSelect.addEventListener("change", () => {
	populateModels();
	updateSubmitButtonState();
});
modelSelect.addEventListener("change", () => {
	populateProductType();
	updateSubmitButtonState();
});
productTypeSelect.addEventListener("change", () => {
	updateSubmitButtonState();
});

// Handle Submit
//
document
	.getElementById("vehicle-form")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		if (errorMessage) errorMessage.textContent = "";
		const year = yearSelect.value;
		const make = makeSelect.value;
		const model = modelSelect.value;
		const productType = productTypeSelect.value;

		if (!year || !make || !model || !productType) {
			if (errorMessage)
				errorMessage.textContent = "Please select Year, Make, and Model.";
			return;
		}
		const key = `${year}-${make}-${model}-${productType}`;
		const url = vehicleData.filter((v) => v.key === key)[0].url;
		if (!url) {
			errorMessage.textContent = "Sorry, no parts found for that combination.";
			return;
		}
		console.log(url);

		// visit the website for parts
		window.location.href = url;
	});

// Fetch and parse data from csv file
function fetchAndParseCSV() {
	fetch("Year Make Model Product Type Dataset Updated.csv")
		.then((response) => response.text())
		.then((csvText) => {
			Papa.parse(csvText, {
				header: true,
				skipEmptyLines: true,
				complete: function (results) {
					vehicleData = results.data.map((row) => {
						const key = `${row.Year}-${row.Make}-${row.Model}-${row["Product Type"]}`;
						return {
							year: row.Year,
							make: row.Make,
							model: row.Model,
							productTypes: row["Product Type"],
							url: row.URL.replace(/ /g, "+"),
							key: key,
						};
					});
					// Now populate the form!
					populateYears();
					console.log(vehicleData);
				},
			});
		})
		.catch((err) => {
			console.error("Error loading CSV:", err);
		});
}
document.addEventListener("DOMContentLoaded", fetchAndParseCSV);

document.querySelectorAll(".custom-select").forEach((wrapper) => {
	const native = wrapper.querySelector(".native-select");
	const trigger = wrapper.querySelector(".select-trigger");
	const list = wrapper.querySelector(".options");
	const display = trigger.querySelectorAll("span")[1];
	// initial & on-change rebuild
	native.addEventListener("change", () => rebuildOptions(wrapper));
	rebuildOptions(wrapper);
	trigger.addEventListener("click", () => wrapper.classList.toggle("open"));
	list.addEventListener("click", (e) => {
		if (e.target.tagName === "LI") {
			display.textContent = e.target.textContent;
			native.value = e.target.dataset.value;
			wrapper.classList.remove("open");
			native.dispatchEvent(new Event("change"));
		}
	});
	document.addEventListener("click", (e) => {
		if (!wrapper.contains(e.target)) wrapper.classList.remove("open");
	});
});

// Custom dropdown rebuild
function rebuildOptions(wrapper) {
	const native = wrapper.querySelector(".native-select");
	const list = wrapper.querySelector(".options");
	list.innerHTML = "";
	native.querySelectorAll("option").forEach((opt) => {
		if (!opt.disabled) {
			const li = document.createElement("li");
			li.textContent = opt.textContent;
			li.dataset.value = opt.value;
			list.appendChild(li);
		}
	});
	const display = wrapper.querySelector(".selected-value");
	if (display && native) {
		display.textContent =
			native.options[native.selectedIndex]?.textContent || "";
	}
}

// Function to update the submit button state
function updateSubmitButtonState() {
	const submitButton = document.querySelector(
		'#vehicle-form button[type="submit"]'
	);
	const allSelected =
		yearSelect.value &&
		makeSelect.value &&
		modelSelect.value &&
		productTypeSelect.value;
	submitButton.disabled = !allSelected;
}

// Function to open a custom dropdown
function autoOpenCustomDropdown(select) {
	const wrapper = select.closest(".custom-select");
	if (!wrapper) return;
	const options = select.querySelectorAll("option:not([disabled])");
	if (options.length > 2) {
		rebuildOptions(wrapper);
		const options = select.querySelectorAll("option:not([disabled])");
		setTimeout(() => {
			rebuildOptions(wrapper);
			wrapper.classList.add("open");
		}, 0);
	}
}
