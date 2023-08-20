jsondata = d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")

jsondata.then(function(x) //to see the data
{
    console.log(x);
    //let biodivdata = getdata(x => x);
    //let biodivdata
    
    /*console.log(x.names.length);
    console.log(x.metadata.length);
    console.log(x.samples.length);
    console.log(x.samples[0]);*/


    d3.select("#selDataset").on("change", optionChanged)

    function optionChanged(individual) {
        //let individual = d3.select("#selDataset")

        for (let i=0; i < x.samples.length; i++){ // i = each individual
            //console.log(x.samples[i])

            if (individual === x.samples[i].otu_ids){

                let labels = x.samples[i].otu_labels.slice(0, 10);
                let ids = x.samples[i].otu_ids.slice(0, 10);
                let values = x.samples[i].sample_values.slice(0, 10);
                //console.log(values)

        

               let top10OTUsGraphTrace = {
                    x: values,
                    y: ids.map(id => `OTU ${id}`),
                    text: labels,
                    type: "bar",
                    orientation: "h"
               }

               let top10OTUsGraph = [top10OTUsGraphTrace]

                let layout = {
                   width: 800, 
                    height: 400, 
                    //
                };

                Plotly.newPlot("individualData", top10OTUsGraph, layout)}
        }
    }

    

    
});

/*
function getdata(data){
    return data;
};
*/



function init(){
    bargraph = [{
        x: biodivdata.samples.otu_ids,
        y: biodivdata.samples
    }]
}