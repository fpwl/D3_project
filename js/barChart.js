// var barData = [0, 20, 40, 60, 80, 100, 120, 100, 80, 60, 40, 20, 10, 30, 50, 70, 90];
var chartData = [0, 40, 20, 50, 24, 32, 32, 54, 87, 34, 94, 120, 37, 73, 12, 9, 40];
var height = 400;
    width = 600;
    barWidth = 50;
    barOffSet = 5;

var yScale = d3.scaleLinear()
    // Which values represent the range. d3.max is finding the maximum value in barData array
    .domain([0, d3.max(barData)])
    // what is the range/dimensions of the container
    .range([0, height])

    // ScaleBand, re ajusting width of graph
var xScale = d3.scaleBand()
    // d3.range will give two values and will give increments between the two. It will take barData length.
    .domain(d3.range(0, barData.length))
    .range([0, width])


d3.select('body').append('svg')
    .attr('width',width)
    .attr('height', height)
    .style('background-color', '7f8c8d')
    .selectAll('rect') //rect is svg term for rectangle
        .data(barData)
        .enter().append('rect')
            .style('fill', '#c0392b')
            .attr('width', xScale.bandwidth())
            .attr('height', function(d){ //d for data
                return yScale(d)
            })
            .attr('x', function(d, i) { //i for iteration
                return xScale(i)
            })
            .attr('y', function(d) {
                return height - yScale(d)
            }).exit()
            // must put exit() at the end to stop the 'loop' of data

