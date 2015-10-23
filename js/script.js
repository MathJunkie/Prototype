var graph;
var paper;
$(document).ready(function() {
    graph = new joint.dia.Graph;

    paper = new joint.dia.Paper({
        el: $('#canvas'),
        width: 800,
        height: 800,
        model: graph,
        gridSize: 1
    });
//Drag and drop Menu
});

$(function() {
    $( ".drag" ).draggable({
        appendTo:"body",
        cursor: "move",
        cursorAt: {top: 0, left: -20},
        helper: function (event) {
            console.log(event);
            return $("<div class='helper' key="+'"'+event.currentTarget.id+'"' +">"+event.currentTarget.text+"</div>");
        }
    });
    $("#canvas").droppable({
        activeClass: "red",
        hoverClass: "blue",
        drop: function( event, ui ) {
            var el;
            console.log(event);
            console.log(ui);

            switch (ui.helper[0].attributes.getNamedItem("key").value) {
                case "drag_input":
                    el = new joint.shapes.devs.Model({
                        position: {x: event.offsetX, y: event.offsetY},
                        size: {width: 90, height: 90},
                        outPorts: ['out'],
                        attrs: {
                            '.label': {text: ui.draggable.text(), 'ref-x': .4, 'ref-y': .2},
                            rect: {fill: '#2ECC71'},
                            '.inPorts circle': {fill: '#16A085'},
                            '.outPorts circle': {fill: '#E74C3C'}
                        }
                    });
                    break;
                case "drag_plot":
                    el = new joint.shapes.devs.Model({
                        position: {x: event.offsetX, y: event.offsetY},
                        size: {width: 90, height: 90},
                        inPorts: ['var'],
                        attrs: {
                            '.label': {text: "Plot", 'ref-x': .4, 'ref-y': .2},
                            rect: {fill: '#2ECC71'},
                            '.inPorts circle': {fill: '#16A085'},
                            '.outPorts circle': {fill: '#E74C3C'}
                        }
                    });
                    break;
            }
            graph.addCell(el);
        }
    });
});