// Binding the values using data. True will change the style stated underneath
    // d3.selectAll('.node')
    //     .data([true, true, true])
    //     .style('background-color', '#2688d2');


// var styles = ["#2688d2", "#8e44ad", "#e74c3c", "#16a085"];

// for (let i = 0; i < array.length; i++) {
//     const element = array[i];
    
// }

// var styles = [
//     {
//         color: '#2688d2',
//         width: 200,
//         text: 'hello'
//     },
//     {
//         color: '#8e44ad',
//         width: 300,
//         text: 'Im'
//     },
//     {
//         color: '#e74c3c',
//         width: 250,
//         text: 'trying'
//     },
//     {
//         color: '#16a085',
//         width: 350,
//         text: 'to'
//     },
//     {
//         color: '#f1c40f',
//         width: 150,
//         text: 'make a'
//     },
//     {
//         color: '#16a085',
//         width: 100,
//         text: 'bar'
//     },
//     {
//         color: '#34495e',
//         width: 50,
//         text: 'graph'
//     }
// ];


// this will loop through the first styles array to change thee background color
// d3.selectAll('.node')
//     .data(styles)
//     .style('background-color', function(d){
//         return d;
//     })

// this will loop through the first styles array to change thee background color
// d3.selectAll('.node')
//     .data(styles)
//     .style('background-color', function (d) {
//         return d.color
//     })
//     .style('width', function (d) {
//         return d.width
//     })




// Generate random colors, width and text
    var styles = [];
    var number = 100;

    for (var i = 0; i < number; i++) {
        var width = Math.floor(Math.random() *100) + "px";
        styles.push({
            color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
            width: width,
            text: width,
        })
        
    }

// enter and append divs (the amount of values in the style array/object)
// having select, and targeting exactly where you want it and then append child div under.
    d3.select('#NodeContainer').selectAll('.newNodes')
        .data(styles)
        .enter().append('div')
            .text(function(d) {
                return d.text
            })
            .style('background-color', function(d){
                return d.color
            })
            .style('width', function(d){
                return d.width
            }).exit();



        
