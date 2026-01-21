
//Build Tabulator
var table = new Tabulator("#userTable",{
    ajaxURL:"http://localhost:3000/api/users",
    ajaxResponse:function(url, params, response){
        return response.data; 
    },
    layout:"fitColumns",
    pagination:true,
    paginationSize:10,
    paginationSizeSelector:[10,25,50,100],
    printHeader:"<h1>print Html<h1>",
    printFooter:" ",
    placeholder:"No Data Set",
    columns:[
        {title:"Name", field:"name",headerFilter:"input"},
        {title:"Email", field:"email",headerFilter:"input"},
        {title:"Age", field:"age"},
        {
            title:"Actions",
            formatter:function(){
                return `
                 <button onclick="viewUser()">View</button>
                 <button onclick="updateUser()">Update</button>
                 <button onclick="deleteUser()">Delete</button>
                `
            }
        }
    ],
});
// searching
var fieldEle = document.getElementById("filter-field");
var typeEle = document.getElementById("filter-type");
var valueEle = document.getElementById("filter-value");

function updateFilter(){
    var filterValue = fieldEle.value,
        typeValue = typeEle.value,
        value = valueEle.value;
    if(filterValue)
    {
        table.setFilter(filterValue,typeValue,value)
    }
}
valueEle.addEventListener("keyup",updateFilter)

// print buttons
document.querySelector("#print-table").addEventListener("click",function(e){
    console.log(e);
    
    table.print(false,true)
})
// download data.csv file
document.querySelector("#download-csv").addEventListener("click",function(){
     table.download("csv","data.csv")
})
//trigger download of data.json file
document.getElementById("download-json").addEventListener("click", function(){
    table.download("json", "data.json");
});

//trigger download of data.xlsx file
document.getElementById("download-xlsx").addEventListener("click", function(){
    table.download("xlsx", "data.xlsx", {sheetName:"My Data"});
});

//trigger download of data.pdf file
document.getElementById("download-pdf").addEventListener("click", function(){
    table.download("pdf", "data.pdf", {
        orientation:"portrait", //set page orientation to portrait
        title:"Example Report", //add title to report
    });
});

//trigger download of data.html file
document.getElementById("download-html").addEventListener("click", function(){
    table.download("html", "data.html", {style:true});
    });