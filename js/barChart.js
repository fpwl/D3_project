var barData = [12, 49, 39, 20, 10, 4, 23, 54, 23, 100, 56, 90, 12, 70, 32];
var height = 400;
    width = 600;
    barWidth = 50;
    barOffSet = 5;


d3.select('body').append('svg')
    .attr('width',width)
    .attr('height', height)
    .style('background-color', '7f8c8d')
    .selectAll('rect') //rect is svg term for rectangle
        .data(barData)
        .enter().append('rect')

            .style('fill', '#c0392b')
            .attr('width', barWidth)
            .attr('height', function(d){ //d for data
                return d
            })
            .attr('x', function(d, i) { //i for iteration
                return i * (barWidth+barOffSet)
            })
            .attr('y', function(d) {
                return height - d
            }).exit()
            // must put exit() at the end to stop the 'loop'