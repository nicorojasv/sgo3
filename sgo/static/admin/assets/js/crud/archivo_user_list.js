var tblArchivoTrab;
var modal_title;
var trabajador = null;
var enviando = false;
var boton_numero3 = document.getElementById("boton2");
boton_numero3.addEventListener("click", guardar_archivo); 

function getData3() {
    tblArchivoTrab = $('#data-table-fixed-header').DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        deferRender: true,
        ajax: {
            url: '/users/'+trabajador+'/archivo_trabajadores/',
            type: 'POST',
            data: {
                'action': 'searchdata4'
            },
            dataSrc: ""
        },
        columns: [
            {"data": "tipo_archivo"},
            {"data": "archivo",
            "render": function(data, type, row, meta){
                data = '<a href="../../../media/' + data + '">' + ' <i class="fa fa-download" title="Descargar" aria-hidden="true"></i></a> ';
                return data;
            }},
            {"data": "id"},
        ],
        columnDefs: [
            {
                targets: [-1],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    var buttons = '<a href="#" rel="delete" title="Eliminar" class="btn btn-danger btn-xs btn-flat"><i class="fas fa-trash-alt"></i></a>';
                    // buttons = '<a href="#" rel="edit" class="btn btn-warning btn-xs btn-flat btnEdit"><i class="fas fa-edit"></i></a> &nbsp &nbsp &nbsp &nbsp';
                    return buttons;
                }
            },
        ],
        initComplete: function (settings, json) {

        }
    });
}

$(function () {

    modal_title = $('.modal-title');
    trabajador = document.getElementById("trabajador_id").value;

    getData3();

    $('.btnAddArchi').on('click', function () {
        $('input[name="action"]').val('archivo_add');
        modal_title.find('span').html('Archivo <small style="font-size: 80%;">Nuevo</small>' );
        console.log(modal_title.find('i'));
        modal_title.find('i').removeClass().addClass();
        $('form')[3].reset();
        var btn = document.getElementById("boton2");
        btn.style.borderColor= '#153264';
        btn.style.backgroundColor= '#153264';
        btn.innerHTML = 'Guardar';
        $('#myModalArchivoTrab').modal('show');
    });

    $('#data-table-fixed-header tbody').on('click', 'a[rel="edit"]', function (){
    
        modal_title.find('span').html('Archivo <small style="font-size: 80%;">Editar</small>');
        modal_title.find('i').removeClass().addClass('fas fa-edit');
        var tr = tblArchivoTrab.cell($(this).closest('td, li')).index();
        var data = tblArchivoTrab.row(tr.row).data();
        $('form')[3].reset();
        $('input[name="action"]').val('archivo_edit');
        $('input[name="id"]' ).val(data.id);
        $('select[name="tipo_archivo"]').val(data.tipo_archivo_id).trigger("change");
        $('file[name="archivo"]').val(data.archivo.trigger("change"));
        $('#myModalArchivoTrab').modal('show');
    });

    $('#data-table-fixed-header tbody').on('click', 'a[rel="delete"]', function (){
    
        modal_title.find('span').html('Archivo <small style="font-size: 80%;">Eliminar</small>');
        modal_title.find('i').removeClass().addClass('fa fa-trash');
        var tr = tblArchivoTrab.cell($(this).closest('td, li')).index();
        var data = tblArchivoTrab.row(tr.row).data();
        $('input[name="action"]').val('archivo_delete');
        $('input[name="id"]').val(data.id);
        $('select[name="tipo_archivo"]').val(data.tipo_archivo_id).trigger("change");
        $('File[name="archivo"]').val('../../../media/'+data.archivo);
        console.log(data.archivo);
        var btn = document.getElementById("boton2");
        btn.style.borderColor= '#de555e';
        btn.style.backgroundColor= '#de555e';
        btn.innerHTML = 'Eliminar';
        $('#myModalArchivoTrab').modal('show');
    }); 

    $('#myModalArchivoTrab').on('shown.bs.modal', function () {
        //$('form')[0].reset();
    });

});

function guardar_archivo() { 
    if (enviando == false){ 
        $('form').on('submit', function (e) {
            e.preventDefault();
            var parameters = new FormData(this);
            console.log(FormData);
            submit_with_ajax(window.location.pathname, 'Notificación', '¿Estas seguro de realizar la siguiente acción?', parameters, function () {
                $('#myModalArchivoTrab').modal('hide');
                tblArchivoTrab.ajax.reload();
            });
            enviando = True; 
        });
    }
  }