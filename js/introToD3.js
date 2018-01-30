// selecting something on the screen/browser, and changing the text on the first div.
	// d3.select('.node').text('selected');

// This is the same as above but selects all the divs
	// d3.selectAll('.node').text('selected');

// This is the same as above but selects a certian div. It's like css choosing nth-child.
	// d3.select('.node:nth-child(3)').text('selected');

// This is the same as above but selects all the odd/even divs. (it can also be used with even numbers).
	// d3.selectAll('.node:nth-child(even)').text('selected');

// This is the same as above but selects all the odd/even divs. (it can also be used with even numbers).
// .html adding html elements
	// d3.selectAll('.node:nth-child(even)').html('<strong>selected</strong>');

// This is selecting a node, changing the text and then appending a div to it, and adding a html element into it. 
	// d3.select('.node')
	// 	.text('this is the parent node div')
	// 	.append('div')
	// 		.html('<strong>This div was appended</strong>')
	// 		// this can keep going, we could add element within elements, within elements
	// 		.append('div')
	// 			.html('<strong>This div was appended withing another div</strong>');

// *reminder
// append() = add after
// prepend() = add before
// insert() = add exactly where i want it
// remove() = remove element

// intsert example
	// d3.select('#NodeContainer')
	// 	.insert('span', ':nth-child(3)')
		// 	.html('<strong>Inserted in the 3rd child</strong>')

// remove element
	// d3.select('#NodeContainer .node:nth-child(4)')
	// 	.remove();

// changing the class name of the original class name
	// d3.selectAll('.node')
	// 	.attr('class', 'newClass')

// adding more classes, and by adding true is adds it, 
// by having false it will remove the stated class. 
	// d3.selectAll('.node')
	// 	.classed('newClass node divs', true)
	// 	.classed('node', false)

// changing styles from d3, this case changing the 3r child.
// to change the style it is like css.
	d3.selectAll('.node:nth-child(3)')
		.style('color', 'red')
		.style('background-color', 'blue')
		.style('text-decoration', 'underline')

		