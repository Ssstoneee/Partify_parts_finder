Vehicle Parts Finder

This project is a web-based Parts Finder application designed to help users locate vehicle parts by selecting their vehicle's Year, Make, Model, and Product Type. The application dynamically populates dropdown menus based on user selections and redirects to the appropriate parts page upon submission.
The application loads data from a CSV file and parses it client-side to dynamically populate dependent dropdowns.

Table of Contents
	•	Overview
	•	Features
	•	Technologies
	•	File Structure
	•	Usage
	•	Future Improvements

Overview

This project provides a seamless interface for users to find vehicle parts through a four-step selection: Year → Make → Model → Product Type. It uses client-side CSV parsing to dynamically update each dropdown and redirects to the correct parts page upon submission.

Features
	•	Dynamic Dependent Dropdowns: The application features cascading dropdown menus that update based on the previous selection (Year → Make → Model → Product Type).
	•	Custom Dropdown Styling: Implements a custom-styled dropdown menu with hover effects and smooth transitions.
	•	Responsive Layout: Includes CSS media queries for a better user experience on desktops and larger screens, with step counters for form items.
	•	Desktop (≥1024px): Inline, step-counter layout.
	•	Auto-Selection: Automatically selects the only available option when a single choice exists for a category.
	•	Form Validation: Disables the submit button until all fields are chosen and shows error messages for invalid selections.
	•	Data-Driven: Utilizes a CSV file to populate vehicle data, ensuring the selections are based on available parts. Utilizes PapaParse to load and parse data efficiently.
	•	Submit Functionality: Redirects to the corresponding URL from the dataset when all fields are validly selected.

Technologies
	•	HTML5: parts_finder_custom_option.html --> Structures the form and dropdown elements.
	•	CSS3: style_parts_finder_custom_option.css --> Styles the application with custom dropdowns and responsive design.
	•	JavaScript (ES6): main_parts_finder_custom_option.js --> Handles dynamic population of dropdowns, form submission, and CSV data parsing.
	•	PapaParse: Client-side CSV parsing --> Library used to parse CSV data.

File Structure

.
├── parts_finder_custom_option.html                            # Main HTML template with form
├── style_parts_finder_custom_option.css                       # Custom styles and responsive layout
├── main_parts_finder_custom_option.js                         # JS logic: data loading, dropdown management, form handling
├── Year Make Model Product Type Dataset Updated.csv  # Vehicle dataset with URLs
└── README.md                        # Project documentation

Setup Instructions
	1.	Ensure you have a web server or local development environment set up.
	2.	Place the parts_finder_custom_option.html, style_parts_finder_custom_option.css, and main_parts_finder_custom_option.js in the same directory.
	3.	Include the Year Make Model Product Type Dataset Updated.csv file in the same directory or update the fetchAndParseCSV function path accordingly.
	4.	Open the parts_finder_custom_option.html file in a browser to use the application.

Usage
	1.	Select the Year, Make, Model, and Product Type from the dropdown menus.
	2.	Click "Find Parts" to be redirected to the parts page based on the selected combination.
	3.	An error message will appear if the combination is invalid or incomplete.

Future Improvements
	•	Improve accessibility (ARIA roles, keyboard navigation).
 	•	Enhance error messaging with more detailed feedback.
 	•	Add validation for the CSV data format.
	•	Write unit tests for dropdown logic and form validation.
