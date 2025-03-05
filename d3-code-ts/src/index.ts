import * as d3 from 'd3';

const data = [30, 50, 80, 120, 180, 230];

const width = 500;
const height = 300;
const margin = { top: 20, right: 30, bottom: 40, left: 40 };

// Criar um SVG onde o gráfico será desenhado
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Escalas para o gráfico
const x = d3.scaleBand()
  .domain(d3.range(data.length).map(String)) // Definir os valores no eixo X
  .range([0, width - margin.left - margin.right])
  .padding(0.1);

const y = d3.scaleLinear()
  .domain([0, d3.max(data)]) // Definir o valor máximo no eixo Y
  .nice() // Ajuste automático dos limites do eixo
  .range([height - margin.top - margin.bottom, 0]);

// Criar as barras do gráfico
svg.selectAll(".bar")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("x", (d, i) => x(String(i))) // Definir a posição das barras no eixo X
  .attr("y", d => y(d)) // Definir a altura das barras no eixo Y
  .attr("width", x.bandwidth()) // Definir a largura das barras
  .attr("height", d => height - margin.top - margin.bottom - y(d)) // Altura das barras

// Adicionar rótulos no eixo X
svg.append("g")
  .selectAll(".tick")
  .data(data)
  .enter().append("text")
  .attr("x", (d, i) => x(String(i)) + x.bandwidth() / 2) // Centralizar o rótulo
  .attr("y", height - margin.bottom + 10) // Definir a posição do rótulo
  .attr("text-anchor", "middle")
  .text((d, i) => i);
