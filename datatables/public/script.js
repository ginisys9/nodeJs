$(document).ready(function(){
    $('#userTable').DataTable( {
    ajax: {
        url: 'http://localhost:3000/api/users',
        dataSrc: 'data'
    },
    columns: [
        {
            data:null,
            title:'S.no',
            render:function(data,type,row,meta){
              return meta.row+1;
            }
        },
        {data:'name'},
        {data:'email'},
        {data:'age'},
        {
            data:'_id',
            render:function(data,type,row){
              return `
               <button onclik="viewUser('${data}')">View</button>
               <button onclik="updateUser('${data}')">Update</button>
               <button onclik="deleteUser('${data}')">Delete</button>
              `
            }
        }
    ],
     layout: {
        topStart: {
            buttons: ['excelHtml5','pdfHtml5','csvHtml5','copyHtml5']
        }
    }
} );
})
