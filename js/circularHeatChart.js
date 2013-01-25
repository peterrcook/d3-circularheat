function circularHeatChart() {
    var margin = {top: 20, right: 20, bottom: 20, left: 20},
    innerRadius = 50,
    numSegments = 24,
    segmentHeight = 20,
    domain = null,
    range = ["white", "red"],
    accessor = function(d) {return d;};

    function chart(selection) {
        selection.each(function(data) {

            var svg = d3.select(this);

            var offset = innerRadius + Math.ceil(data.length / numSegments) * segmentHeight;
            g = svg.append('g')
                .attr("transform", "translate(" + parseInt(margin.left + offset) + "," + parseInt(margin.top + offset) + ")");

            if (domain === null)
                domain = d3.extent(data, accessor);

            console.log(domain);

            var color = d3.scale.linear().domain(domain).range(range);

            g.selectAll('path').data(data)
                .enter().append('path')
                .attr('d', d3.svg.arc().innerRadius(ir).outerRadius(or).startAngle(sa).endAngle(ea))
                .attr('fill', function(d) {return color(accessor(d));});
        });

    }

    /* Arc functions */
    ir = function(d, i) {
        return innerRadius + Math.floor(i/numSegments) * segmentHeight;
    }
    or = function(d, i) {
        return innerRadius + segmentHeight + Math.floor(i/numSegments) * segmentHeight;
    }
    sa = function(d, i) {
        return (i * 2 * Math.PI) / numSegments;
    }
    ea = function(d, i) {
        return ((i + 1) * 2 * Math.PI) / numSegments;
    }

    /* Configuration getters/setters */
    chart.margin = function(_) {
        if (!arguments.length) return margin;
        margin = _;
        return chart;
    };

    chart.innerRadius = function(_) {
        if (!arguments.length) return innerRadius;
        innerRadius = _;
        return chart;
    };

    chart.numSegments = function(_) {
        if (!arguments.length) return numSegments;
        numSegments = _;
        return chart;
    };

    chart.segmentHeight = function(_) {
        if (!arguments.length) return segmentHeight;
        segmentHeight = _;
        return chart;
    };

    chart.domain = function(_) {
        if (!arguments.length) return domain;
        domain = _;
        return chart;
    };

    chart.range = function(_) {
        if (!arguments.length) return range;
        range = _;
        return chart;
    };

    chart.accessor = function(_) {
        if (!arguments.length) return accessor;
        accessor = _;
        return chart;
    };

    return chart;
}
