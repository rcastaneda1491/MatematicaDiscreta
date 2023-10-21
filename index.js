const svg = d3.select("svg");
const anchoGrafica = 500;
const altoGrafica = 500;

//Definir escala para plano cartesiano en x y
const xScale = d3.scaleLinear().domain([-10, 10]).range([0, anchoGrafica]);
const yScale = d3.scaleLinear().domain([-10, 10]).range([altoGrafica, 0]); 

//Crear plano cartesiano
for (let i = -10; i <= 10; i++) {
    //Crear lineas horizontales en el plano
    svg.append("line")
        .attr("x1", xScale(-10))
        .attr("y1", yScale(i))
        .attr("x2", xScale(10))
        .attr("y2", yScale(i))
        .attr("stroke", "#e0e0e0")
        .attr("stroke-width", 1);

    //Crear lineas verticales en el plano
    svg.append("line")
        .attr("x1", xScale(i))
        .attr("y1", yScale(-10))
        .attr("x2", xScale(i))
        .attr("y2", yScale(10))
        .attr("stroke", "#e0e0e0")
        .attr("stroke-width", 1);

    //Escribir números impares en el plano
    if (i % 2 !== 0) {
        //Números en eje x
        svg.append("text")
            .attr("x", xScale(i) - 5)
            .attr("y", yScale(0) + 15)
            .text(i)
            .attr("font-size", "12px")
            .attr("text-anchor", "middle");

        //Números en eje y
        svg.append("text")
            .attr("x", xScale(0) - 15)
            .attr("y", yScale(i) + 5)
            .text(i)
            .attr("font-size", "12px")
            .attr("text-anchor", "end");
    }
}

//Dibujar ejes en el plano cartesiano
svg.append("line").attr("x1", xScale(-10)).attr("y1", yScale(0)).attr("x2", xScale(10)).attr("y2", yScale(0)).attr("stroke", "black");
svg.append("line").attr("x1", xScale(0)).attr("y1", yScale(-10)).attr("x2", xScale(0)).attr("y2", yScale(10)).attr("stroke", "black");

//Crear puntos y línea de la ecuación
function setPoints() {
    //Obtener valores de la función
    const m = parseFloat(document.getElementById("xValue").value) || 0;
    const b = parseFloat(document.getElementById("iValue").value) || 0;

    //Calcular valores cuando x=0 y x=1
    const puntoA = { x: 0, y: m * 0 + b };
    const puntoB = { x: 1, y: m * 1 + b };

    //Limpiar lineas anteriores
    svg.selectAll(".dynamic").remove();

    //Dibujar puntos en el plano
    svg.append("circle")
        .attr("cx", xScale(puntoA.x))
        .attr("cy", yScale(puntoA.y))
        .attr("r", 5.3)
        .attr("fill", "orange")
        .classed("dynamic", true);

    svg.append("circle")
        .attr("cx", xScale(puntoB.x))
        .attr("cy", yScale(puntoB.y))
        .attr("r", 5.3)
        .attr("fill", "orange")
        .classed("dynamic", true);

    //Mostrar la línea hasta los bordes del plano
    const yInicio = m * (-10) + b;
    const yFinal = m * 10 + b;

    //Dibujar línea de la ecuación
    svg.append("line")
        .attr("x1", xScale(-10))
        .attr("y1", yScale(yInicio))
        .attr("x2", xScale(10))
        .attr("y2", yScale(yFinal))
        .attr("stroke", "orange")
        .attr("stroke-width", 2.5)
        .classed("dynamic", true);
}
