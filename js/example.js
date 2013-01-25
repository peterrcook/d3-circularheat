var chart = circularHeatChart().segmentHeight(10).innerRadius(20).numSegments(24);

/* Simple chart */
var data = [];
for(var i=0; i<240; i++) {
    data[i] = i;
}

d3.select('#chart1')
    .selectAll('svg')
    .data([data])
    .enter()
    .append('svg')
    .call(chart);


/* An array of charts */
data = [];
for(var i=0; i<3; i++) {
	data[i] = [];
	for(var j=0; j<120; j++) {
	    data[i][j] = Math.random();
	}
}

chart.domain([0,1]).range(["white", "black"]);
d3.select('#chart2')
    .selectAll('svg')
    .data(data)
    .enter()
    .append('svg')
    .style('width', '200px')
    .style('height', '200px')
    .call(chart);


/* An array of objects */
var data = [];
for(var i=0; i<240; i++) {
    data[i] = {title: "Node "+i, value: Math.random()};
}

chart.accessor(function(d) {return d.value;});
d3.select('#chart3')
    .selectAll('svg')
    .data([data])
    .enter()
    .append('svg')
    .call(chart);

/* Add a mouseover event */
d3.selectAll("#chart3 path").on('mouseover', function() {
	var d = d3.select(this).data()[0];
    d3.select("#info").text(d.title + ' has value ' + d.value);
});
d3.selectAll("#chart3 svg").on('mouseout', function() {
    d3.select("#info").text('');	
});
