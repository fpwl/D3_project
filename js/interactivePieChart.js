
var graph = d3.select('#NodeContainer') //selecting the NodeContainer div
    .append('svg') //appending a svg into the div
    .append('g') //appending a group withing the svg

// targeting the variable graph
// appending groups to the group element
// each group append we are also adding a attribute of class to each. 
graph.append('g')
    .attr('class','slices');
graph.append('g')
    .attr('class', 'labels');
graph.append('g')
    .attr("class", 'line');

// defining the width and hight and radius of the pie chart.
// the radius value is taking the width and height and dividing it by 2.
var width = 960,
    height = 450,
    radius = Math.min(width, height) / 2;

// ?
var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {
        return d.value;
    })

// ?
var arc = d3.svg.arc()
    .outerRadius(radius * 0.8)
    .innerRadius(radius * 0.4);

// ?
var outerArc = d3.svg.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9)

graph.attr('transform', 'translate(' + width / 2 + ',' + height / 2 +')');

var key = function(d){
    return d.data.label;
}

var color = d3.scale.ordinal()
    .domain(['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'])
    .range(['#eb3b5a', '#fd9644', '#fed330', '#26de81', '#45aaf2', '#095275', '#a55eea'])

function randomData(){
    var labels = color.domain();
    return labels.map(function(label){
        return{
            label: label,
            value: Math.random()
        }
    });
}

change(randomData());

d3.select('.randomize')
    .on('click', function(){
        change(randomData());
    });

function change(data) {
    /* ------- PIE SLICES -------*/
    var slice = graph.select(".slices").selectAll("path.slice")
        .data(pie(data), key);

    slice.enter()
        .insert("path")
        .style("fill", function (d) { return color(d.data.label); })
        .attr("class", "slice");

    slice
        .transition().duration(1000)
        .attrTween("d", function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        })

    slice.exit()
        .remove();

    /* ------- TEXT LABELS -------*/

    var text = graph.select(".labels").selectAll("text")
        .data(pie(data), key);

    text.enter()
        .append("text")
        .attr("dy", ".35em")
        .text(function (d) {
            return d.data.label;
        });

    function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    text.transition().duration(1000)
        .attrTween("transform", function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                return "translate(" + pos + ")";
            };
        })
        .styleTween("text-anchor", function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                var d2 = interpolate(t);
                return midAngle(d2) < Math.PI ? "start" : "end";
            };
        });

    text.exit()
        .remove();

    /* ------- SLICE TO TEXT POLYLINES -------*/

    var polyline = graph.select(".lines").selectAll("polyline")
        .data(pie(data), key);

    polyline.enter()
        .append("polyline");

    polyline.transition().duration(1000)
        .attrTween("points", function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                return [arc.centroid(d2), outerArc.centroid(d2), pos];
            };
        });

    polyline.exit()
        .remove();
};
