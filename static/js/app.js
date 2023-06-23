jsondata = d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")

jsondata.then(function(x) //to see the data
{
    console.log(x);
    let biodivdata = getdata(x);
    console.log(biodivdata);
    console.log(biodivdata.names.length);
    console.log(biodivdata.metadata.length);
    console.log(biodivdata.samples.length);
});

function getdata(data){
    return data;
};




function init(){
    bargraph = [{
        x: biodivdata.samples.otu_ids,
        y: biodivdata.samples
    }]
}