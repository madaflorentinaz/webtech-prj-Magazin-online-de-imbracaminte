/*global $*/

$(document).ready(function () {
    readRecords(); // calling function
});
function readRecords() {
    $.get("/articoles/", {}, function (data, status) {
        data.forEach(function(value) {
            var row = '<tr id="row_id_'+ value.id +'">'
            			+ displayColumns(value)
        				+ '</tr>';
            $('#articles').append(row);
        });
    });
}

function displayColumns(value) {
    return 	'<td>'+value.id+'</td>'
            + '<td class="denumire">'+value.denumire+'</td>'
			+ '<td class="tip_material">'+value.tip_material+'</td>'
			+ '<td class="culoare">'+value.culoare+'</td>'
			+ '<td align="center">'
			+	'<button onclick="viewRecord('+ value.id +')" class="button2">Modifica</button>'
			+ '</td>'
			+ '<td align="center">'
			+	'<button onclick="deleteRecord('+ value.id +')" class="button1">Sterge</button>'
			+ '</td>';
}
function addRecord() {
    $('#id').val('');
    $('#denumire').val('');
    $('#tip_material').val('');
    $('#culoare').val('');
  
    
    $('#myModalLabel').html('Add New Article');
    $('#add_new_record_modal').modal('show');
}
function viewRecord(id) {
    var url = "/articoles/" + id;
    
    $.get(url, {}, function (data, status) {
        //bind the values to the form fields
        $('#denumire').val(data.denumire);
        $('#tip_material').val(data.tip_material);
        $('#culoare').val(data.culoare);
        
        $('#id').val(id);
        $('#myModalLabel').html('Editeaza articolul');
        
        $('#add_new_record_modal').modal('show');
    });
}
function saveRecord() {
    var formData = $('#record_form').serializeObject();
    if(formData.id) {
        updateRecord(formData);
    } else {
        createRecord(formData);
    }
}

function createRecord(formData) {
    $.ajax({
        url: '/articoles/',
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#add_new_record_modal').modal('hide');
            
            var row = '<tr id="row_id_'+ data.id +'">'
            			+ displayColumns(data)
        				+ '</tr>';
            $('#articles').append(row);
        } 
    });
}

function updateRecord(formData) {
    $.ajax({
        url: '/articoles/'+formData.id,
        type: 'PUT',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#row_id_'+formData.id+'>td.denumire').html(formData.denumire);
            $('#row_id_'+formData.id+'>td.tip_material').html(formData.tip_material);
            $('#row_id_'+formData.id+'>td.culoare').html(formData.culoare);
            $('#add_new_record_modal').modal('hide');
        } 
    });
}
function deleteRecord(id) {
    $.ajax({
        url: '/articoles/'+id,
        type: 'DELETE',
        success: function(data) {
            $('#row_id_'+id).remove();
        }
    });
}

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
