
var data;
d3.json("js/mockData.json", function (error, jsonData) {
    if (error) {
        console.log("something went wrong");
        return;
    }

    data = jsonData;

    var height = 400;
    width = 600;

    var yMax = 0;
    var xMax = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i].age > yMax) {
            yMax = data[i].age
        }
        if (data[i].weight > xMax) {
            xMax = data[i].weight
        }
    }

    var yScale = d3.scaleLinear()
        .domain([0, yMax])
        .range([0, height])

    var xScale = d3.scaleLinear()
        .domain([0, xMax])
        .range([0, width])

    var color = d3.scaleLinear()
        // dividing xMax allows more colour range
        .domain([0, xMax / 2, xMax])
        .range(['#00a2ff', '#0e7aa5', '#d467ff'])

    d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background-color', 'lightBlue')
        .selectAll('circle')
        .data(data)
        .enter().append('circle')
        .classed('circle', true)
        .style('fill', function (d, i) {
            return color(d.weight)
        })
        .attr('r', '8')
        .attr('cx', function (d) { //d for data
            return xScale(d.weight)
        })
        .attr('cy', function (d) {
            return height - yScale(d.age)
        })
        .on('mouseover', function (d) {
            // to select 'this' object
            d3.select(this)
                .style('opacity', 0.5)
                .append('div')
                .style('background-color', 'white')
        })
        .on('mouseout', function (d) {
            // to select 'this' object
            d3.select(this)
                .style('opacity', 1)
        })

})

