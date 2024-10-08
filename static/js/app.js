d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(function(data) {




function buildBarChart(sample) {
  let sampleData = data.samples.find(s => s.id === sample);
  let topTenOTUs = sampleData.sample_values.slice(0, 10).reverse();
  let topTenIDs = sampleData.otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`);
  let topTenLabels = sampleData.otu_labels.slice(0, 10).reverse();

  let trace = {
    x: topTenOTUs,
    y: topTenIDs,
    text: topTenLabels,
    type: "bar",
    orientation: "h"
  };

  let layout = {
    title: "Top 10 OTUs",
    margin: { t: 30, l: 150 }
  };

  Plotly.newPlot("bar", [trace], layout);
}

function buildBubbleChart(sample) {
  let sampleData = data.samples.find(s => s.id === sample);

  let trace = {
    x: sampleData.otu_ids,
    y: sampleData.sample_values,
    text: sampleData.otu_labels,
    mode: 'markers',
    marker: {
      size: sampleData.sample_values,
      color: sampleData.otu_ids,
      colorscale: 'Earth'
    }
  };

  let layout = {
    title: 'Bacteria Cultures Per Sample',
    xaxis: { title: 'OTU ID' },
    yaxis: { title: 'Sample Value' }
  };

  Plotly.newPlot('bubble', [trace], layout);
}

function displayMetadata(sample) {
  let metadata = data.metadata.find(m => m.id.toString() === sample);
  let panel = d3.select("#sample-metadata");
  panel.html("");
  Object.entries(metadata).forEach(([key, value]) => {
    panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
  });
}

function init() {
  let dropdown = d3.select("#selDataset");
  data.names.forEach(name => {
    dropdown.append("option").text(name).property("value", name);
  });
  updateCharts(data.names[0]);
}

function updateCharts(sample) {
  buildBarChart(sample);
  buildBubbleChart(sample);
  displayMetadata(sample);
}

d3.select("#selDataset").on("change", function() {
  updateCharts(this.value);
});

init();

console.log(data);
});