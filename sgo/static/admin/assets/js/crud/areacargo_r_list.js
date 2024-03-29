var tblAreaCargo;
var modal_title;
var requerimiento = null;
var enviando = false;
var boton_numero1 = document.getElementById("boton");
boton_numero1.addEventListener("click", guardar_area_cargo);


function getData2() {
    tblAreaCargo = $('#data-table-default').DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        deferRender: true,
        ajax: {
            url: '/requerimientos/'+requerimiento+'/acr/',
            type: 'POST',
            data: {
                'action': 'searchdata2'
            },
            dataSrc: ""
        },
        columns: [
            {"data": "cantidad",
            "render": function(data, type, meta){
                data = ''+ data;
                return data;
            }},
            {"data": "area"},
            {"data": "cargo"},
            {"data": "id"},
        ],
        columnDefs: [
            {
                targets: [-1],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    var buttons = '<a href="#" rel="edit" title="Editar" class="btn btn-warning btn-xs btn-flat btnEdit"><i class="fas fa-edit"></i></a> &nbsp &nbsp &nbsp &nbsp';
                    buttons += '<a href="#" rel="delete" title="Eliminar" class="btn btn-danger btn-xs btn-flat"><i class="fas fa-trash-alt"></i></a> &nbsp &nbsp &nbsp &nbsp';
                    buttons += '<a href="#" data-toggle="modal" data-target="#myModalRequerTrab" rel="agg" title="Agregar Trabajador(es)" class="btn btn-primary btn-xs btn-flat btnAgg"><i class="fas fa-users"></i></a>';
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
    requerimiento = document.getElementById("requerimiento_id").value;

    getData2();

    $('.btnAdd').on('click', function () {
        $('input[name="action"]').val('acr_add');
        modal_title.find('span').html('<b style="font-size: 1.25rem;">Área-Cargo Requerimiento </b><small style="font-size: 80%;">Nuevo</small>');
        console.log(modal_title.find('i'));
        modal_title.find('i').removeClass().addClass();
        $('form')[2].reset();
        var btn = document.getElementById("boton");
        btn.style.borderColor= '#153264';
        btn.style.backgroundColor= '#153264';
        btn.innerHTML = 'Guardar';
        $('#myModalACR').modal('show');
    });

    $('#data-table-default tbody').on('click', 'a[rel="edit"]', function (){
    
        modal_title.find('span').html('<b style="font-size: 1.25rem;">Área-Cargo Requerimiento </b><small style="font-size: 80%;">Editar</small>');
        modal_title.find('i').removeClass().addClass('fas fa-edit');
        var tr = tblAreaCargo.cell($(this).closest('td, li')).index();
        var data = tblAreaCargo.row(tr.row).data();
        $('input[name="action"]').val('acr_edit');
        $('input[name="id"]' ).val(data.id);
        $('input[name="cantidad"]').val(data.cantidad);
        $('input[name="valor_aprox"]').val(data.valor_aprox);
        $('input[name="fecha_ingreso"]').val(data.fecha_ingreso);
        $('select[name="area"]').val(data.area_id).trigger("change");
        $('select[name="cargo"]').val(data.cargo_id).trigger("change");
        var btn = document.getElementById("boton");
        btn.style.borderColor= '#153264';
        btn.style.backgroundColor= '#153264';
        btn.innerHTML = 'Editar';
        $('#myModalACR').modal('show');
        return data;
    });

    $('#data-table-default tbody').on('click', 'a[rel="delete"]', function (){
    
        modal_title.find('span').html('<b style="font-size: 1.25rem;">Área-Cargo Requerimiento </b><small style="font-size: 80%;">Eliminar</small>');
        modal_title.find('i').removeClass().addClass('fa fa-trash');
        var tr = tblAreaCargo.cell($(this).closest('td, li')).index();
        var data = tblAreaCargo.row(tr.row).data();
        $('input[name="action"]').val('acr_delete');
        $('input[name="id"]').val(data.id);
        $('input[name="cantidad"]').val(data.cantidad);
        $('input[name="valor_aprox"]').val(data.valor_aprox);
        $('input[name="fecha_ingreso"]').val(data.fecha_ingreso);
        $('select[name="area"]').val(data.area_id).trigger("change");
        $('select[name="cargo"]').val(data.cargo_id).trigger("change");
        var btn = document.getElementById("boton");
        btn.style.borderColor= '#de555e';
        btn.style.backgroundColor= '#de555e';
        btn.innerHTML = 'Eliminar';
        $('#myModalACR').modal('show');
    });

    $('#data-table-default tbody').on('click', 'a[rel="agg"]', function (){
        $('input[name="action"]').val('requeri_trab_add');
        modal_title.find('span').html('Trabajador(es) <small style="font-size: 80%;">Nuevo</small>' );
        console.log(modal_title.find('i'));
        modal_title.find('i').removeClass().addClass();
        var tr = tblAreaCargo.cell($(this).closest('td, li')).index();
        var data = tblAreaCargo.row(tr.row).data();
        $('form')[3].reset();
        $('input[name="area_cargo_id"]').val(data.id);
        console.log(data.id);
    
        $('#myModalRequerTrab').modal('show');
    });

    $('#myModalACR').on('shown.bs.modal', function () {
        // $('form')[0].reset();
    });

    $('.btnAdd1').on('click', function () {

        $('CrearRequeriForm').on('submit', function (e) {
            e.preventDefault();
            var parameters = new FormData(this);
            console.log(FormData);
            submit_with_ajax(window.location.pathname, 'Notificación', '¿Estas seguro de realizar la siguiente acción?', parameters, function () {
                $('#myModalACR').modal('hide');
                tblAreaCargo.ajax.reload();
                $('#myModalConvenioR').modal('hide');
                tblConvenioReq.ajax.reload();
                $('#myModalRequerTrab').modal('hide');
                $('#myModalRequerUser').modal('hide');
                tblRequeriTrab.ajax.reload();
            }); 
        });

    });

});

function guardar_area_cargo() { 
    if (enviando == false){
        $('form').on('submit', function (e) {
            e.preventDefault();
            var parameters = new FormData(this);
            console.log(FormData);
            submit_with_ajax(window.location.pathname, 'Notificación', '¿Estas seguro de realizar la siguiente acción?', parameters, function () {
                $('#myModalACR').modal('hide');
                tblAreaCargo.ajax.reload();
                $('#myModalConvenioR').modal('hide');
                tblConvenioReq.ajax.reload();
                $('#myModalRequerTrab').modal('hide');
                $('#myModalRequerUser').modal('hide');
                tblRequeriTrab.ajax.reload();
            });
            enviando = True;   
        });  
    }
  }
