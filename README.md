

# Vehicle Parts Finder

This project is a web-based Parts Finder application designed to help users locate vehicle parts by selecting their vehicle’s Year, Make, Model, and Product Type. The application dynamically populates dropdown menus based on user selections and redirects to the appropriate parts page upon submission. It loads data from a CSV file and parses it client-side to populate dependent dropdowns.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [File Structure](#file-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Future Improvements](#future-improvements)

## Overview

This project provides a seamless interface for users to find vehicle parts through a four-step selection:

**Year → Make → Model → Product Type**

Each dropdown is dynamically updated based on the previous selection, leveraging client-side CSV parsing to ensure available options reflect the dataset.

## Features
- **Dynamic Dependent Dropdowns**: Cascading menus update as users select Year, Make, Model, and Product Type.
- **Custom Dropdown Styling**: Implements a custom-styled dropdown with hover effects and smooth transitions.
- **Responsive Layout**: Uses CSS media queries for an optimized desktop (≥1024px) step-counter layout.
- **Auto-Selection**: Automatically selects the only available option when a category has a single choice.
- **Form Validation**: Disables the submit button until all fields are selected and displays error messages for invalid or incomplete combinations.
- **Data-Driven**: Parses a CSV dataset with PapaParse to load vehicle data and URLs.
- **Submit Functionality**: Redirects to the corresponding URL from the dataset when all fields are validly selected.

## Technologies
- **HTML5**: `parts_finder_custom_option.html` – Structures the form and dropdown elements.
- **CSS3**: `style_parts_finder_custom_option.css` – Custom styles and responsive design.
- **JavaScript (ES6)**: `main_parts_finder_custom_option.js` – Handles dropdown logic, form submission, and CSV parsing.
- **PapaParse**: Client-side CSV parsing library for efficient dataset loading.

## File Structure

```
.
├── parts_finder_custom_option.html       # Main HTML template with form
├── style_parts_finder_custom_option.css  # Custom styles and responsive layout
├── main_parts_finder_custom_option.js    # JS logic: data loading, dropdown management, form handling
├── Year Make Model Product Type Dataset Updated.csv  # Vehicle dataset with URLs
└── README.md                             # Project documentation
```

## Setup Instructions
1. Ensure you have a web server or local development environment.
2. Place `parts_finder_custom_option.html`, `style_parts_finder_custom_option.css`, and `main_parts_finder_custom_option.js` in the same directory.
3. Include `Year Make Model Product Type Dataset Updated.csv` in the directory or update the `fetchAndParseCSV` function path accordingly.
4. Open `parts_finder_custom_option.html` in your browser to launch the application.

## Usage
1. Select Year, Make, Model, and Product Type from the dropdown menus.
2. Click "Find Parts" to be redirected to the parts page based on your selection.
3. If the selection is invalid or incomplete, an error message will appear.

## Future Improvements
- Refactor & streamline code, make logic more coherent and concise, eliminate redundancies, and enhance maintainability.
- Improve accessibility with ARIA roles and keyboard navigation support.
- Enhance error messaging with more detailed feedback.
- Add validation for the CSV data format before parsing.
- Write unit tests for dropdown logic and form validation.

