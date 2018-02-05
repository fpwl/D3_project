// var data;

// d3.json("js/mockData.json", function (error, jsonData) {
//     if (error) {
//         console.log("something went wrong");
//         return;
//     }

//     data = jsonData;
var graph = d3.select('#NodeContainer') //selecting the NodeContainer div
    .append('svg') //appending a svg into the div
    .attr('width', 960)
    .attr('height', 500)

var svg = d3.select("svg"),
    width = + svg.attr("width"),
    height = +svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var pie = d3.pie()
    .sort(null)
    .value(function (d) { return d.population; });

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);


d3.json("js/data/populationAgeData.json", function (error, jsonData) {
    if (error) {
        console.log("something went wrong");
        return;
    }

    var arc = g.selectAll(".arc")
        .data(pie(jsonData))
        .enter().append("g")
        .attr("class", "arc");

    arc.append("path")
        .attr("d", path)
        .attr("fill", function (d) { return color(d.data.age); });

    arc.append("text")
        .attr("transform", function (d) { return "translate(" + label.centroid(d) + ")"; })
        .attr("dy", "0.35em")
        .text(function (d) { return d.data.age; });
});

