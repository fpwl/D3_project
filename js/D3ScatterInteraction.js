
var data;

d3.json("js/mockData.json", function (error, jsonData) {
    if (error) {
        console.log("something went wrong");
        return;
    }

    data = jsonData;

    var margin = {
        top: 50,
        right: 50,
        left: 50,
        bottom:50
    };

    // adding/minus to add padding/margin
    var height = 400 - margin.top - margin.bottom;
        width = 600 - margin.left - margin.right;

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

    // Defining the y and x axis values
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


   var graph = d3.select('#NodeContainer').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .style('background-color', 'lightBlue')
        .append('g') //g means group
        .attr('transform', 'translate('+ margin.left +','+ margin.top +')')
            .selectAll('circle')
                .data(data)
                .enter().append('circle')
                    .classed('circle', true)
                    .style('fill', function (d, i) {
                        return color(d.weight)
                    })
                    .attr('r', '8')
                    .attr('cx', 0)
                    .attr('cy', height)
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
                    .on('click', function(d){
                        console.log(d);
                    })

                    // adding Animation
                    graph.transition()
                        .attr('cx', function (d) { //d for data
                            return xScale(d.weight)
                        })
                        .attr('cy', function (d) {
                            return height - yScale(d.age)
                        })
                        .delay(function(d, i){
                            return i * 20
                        })
                        .duration(1500)
                        .ease(d3.easeBounce)


                    // Adding and setting value for vertical axis
                    var vGuideScale = d3.scaleLinear()
                        .domain([0, yMax])
                        .range([height, 0])
                    
                    var vAxis = d3.axisLeft(vGuideScale)
                        .ticks(10) 

                    // making another group for the axis info
                    var vGuide = d3.select('svg').append('g')
                    // linking vAxis and vGuide
                    // this makes a line in the graph but the ticks are a bit off
                    vAxis(vGuide)
                    // this is to align the axis info to the graph
                    vGuide.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                    

                    // Adding and setting value for horizontal axis
                    var hGuideScale = d3.scaleLinear()
                        .domain([0, xMax])
                        .range([0, width])
                    
                    var xAxis = d3.axisBottom(hGuideScale)
                        .ticks(10) 

                    // making another group for the axis info
                    var hGuide = d3.select('svg').append('g')
                    // linking vAxis and vGuide
                    // this makes a line in the graph but the ticks are a bit off
                    xAxis(hGuide)
                    // this is to align the axis info to the graph
                    hGuide.attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')

});

