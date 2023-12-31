jsondata = d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")

let dropdownValues = []
let subjectCase = []
let demoinfo = []

d3.select("#selDataset").on("change", optionChanged)
d3.select("#sample-metadata").on("change", optionChanged)

jsondata.then(function(x)
{
    console.log(x);
    for (let i=0; i < x.samples.length; i++){
        dropdownValues.push(x.names[i])
        subjectCase.push(x.samples[i])
        demoinfo.push(x.metadata[i])
        //console.log(x.names[i])
    }

    let dropdownMenu = document.getElementById("selDataset");
    for (let value of dropdownValues) {
        let option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        dropdownMenu.appendChild(option);
    }
});

console.log(demoinfo)

function optionChanged(individual){
    if (dropdownValues.includes(individual)) {
        //console.log(individual);
        index = dropdownValues.indexOf(individual)
        //console.log(subjectCase[index].otu_ids)
        
        
        let labels = subjectCase[index].otu_labels.slice(0, 10);
        let ids = subjectCase[index].otu_ids.slice(0, 10);
        let values = subjectCase[index].sample_values.slice(0, 10);
        //console.log(values)

        let demographicInfo = document.getElementById("sample-metadata");
        
            
        //console.log(demoinfo[index])
        for (let key in demoinfo[index]){
            // console.log(key)
            // console.log(meta[key])
            let item = document.createElement("p");
            console.log(`${key}: ${demoinfo[index][key]}`)
            item.textContent = `${key}: ${demoinfo[index][key]}`
            demographicInfo.appendChild(item);
        }

        let colors = ["#efeeb4", "#dad873", "#58b368", "#309975", "#454d66"]

        let guageSettings = [{
                domain: { x: [0, 1], y: [0, 1] },
                value: demoinfo[index].wfreq,
                title: { text: "belly button washing frequency" },
                type: "indicator",
                mode: "gauge+number+delta",
                gauge: {
                    axis: { range: [0, 5] },
                    steps: Array.from({ length: 5 }, (_, i) => ({
                        range: [i, i + 1],
                        color: colors[i]
                    })),
                    },
            }
        ];
        
        let top10OTUsGraphTrace = {
            x: values,
            y: ids.map(id => `OTU ${id}`),
            text: labels,
            type: "bar",
            orientation: "h"
        }
        let top10OTUsGraph = [top10OTUsGraphTrace]

        let bubble = {
            x: ids,
            y: values,
            
            text: labels,
            mode: "markers", // markers mode for bubble chart
            marker: {
                size: values, // size of bubbles
                color: ids // color scale for bubbles
            }
        }
        let bubbleGraph = [bubble]
        

        let layout = {
            width: 800, 
            height: 400, 
        }
        
        Plotly.newPlot("individualData", top10OTUsGraph, layout)
        Plotly.newPlot("bubbleData", bubbleGraph)
        Plotly.newPlot('guage', guageSettings)
    }
}





function init(){
    bargraph = [{
        x: biodivdata.samples.otu_ids,
        y: biodivdata.samples
    }]
}