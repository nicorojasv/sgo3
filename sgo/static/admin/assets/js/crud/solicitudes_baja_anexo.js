var tblSolicitudAnex;
var modal_title;

function getData() {
    tblSolicitudAnex = $('#data-table-default').DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        deferRender: true,
        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data: {
                'action': 'searchdata'
            },
            dataSrc: ""
        },
        columns: [
            {"data": "solicitante"},
            {"data": "trabajador"},
            {"data": "plazos"},
            {"data": "anexo"},
            {"data": "estados"},
            {"data": "motivo"},
            {"data": "id_contrato"},
   
        ],
        columnDefs: [
            {
                targets: [-1],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) { 

                    var buttons = buttons = '<a href="#" rel="aprobar" title="Aprobar" class="btn btn-green btn-xs btn-flat btnEdit"><i class="fa fa-check-square"></i></a> &nbsp &nbsp &nbsp &nbsp';
                    // buttons += '<a href="#" rel="rechazar" title="Rechazar" class="btn btn-danger btn-xs btn-flat"><i class="fa fa-window-close"></i></a> &nbsp &nbsp &nbsp &nbsp';
                    buttons += '<button data-id="'+data+'" onclick="myFunction('+data+')"  id="btn-view-anexo" type="button" title="Ver Anexo" class="btn btn-xs btn-outline-primary"><i class="fas fa-eye"></i></button>';
                    return buttons;
                }
            },
        ],
        initComplete: function (settings, json) {

        }
    });
}

function myFunction(data) {
      var id = data;
      var URL = '/contratos/'+id+'/solicitudes-pendientes-anexo/';
      $.ajax({
            url: URL,
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
              $("#modal-anexo").modal("show");
            },
            success: function (data) {
                $("#modal-anexo .modal-content").html(data.html_form);
            }
          });
  }

  function myFunction2(data) {
        var id = data;
        var URL = '/contratos/'+id+'/solicitudes-pendientes-anexo-baja/';
        $.ajax({
              url: URL,
              type: 'get',
              dataType: 'json',
              beforeSend: function () {
                $("#modal-anexo").modal("show");
              },
              success: function (data) {
                  $("#modal-anexo .modal-content").html(data.html_form);
              }
            });
    }

$(function () {

    modal_title = $('.modal-title');

    getData();


    $('#data-table-default tbody').on('click', 'a[rel="aprobar"]', function (){
        var tr = tblSolicitudAnex.cell($(this).closest('td, li')).index();
        var data = tblSolicitudAnex.row(tr.row).data();
        modal_title.find('span').html('Aprobar Baja del Anexo <small style="font-size: 80%;">'+data.nombre+'</small>');
        modal_title.find('i').removeClass().addClass('fas fa-edit');
        $('input[name="action"]').val('aprobar');
        $('input[name="id"]' ).val(data.id);
        $('input[name="anexo_id"]' ).val(data.id_contrato);
        document.getElementById('observacion').style.display = 'none';
        var btn = document.getElementById("boton");
        btn.style.borderColor= '#32a932';
        btn.style.backgroundColor= '#32a932';
        btn.innerHTML = 'Aprobar';
        $('#solicitudes_anexo').modal('show');
    });

    $('#data-table-default tbody').on('click', 'a[rel="rechazar"]', function (){
        var tr = tblSolicitudAnex.cell($(this).closest('td, li')).index();
        var data = tblSolicitudAnex.row(tr.row).data();
        modal_title.find('span').html('Rechazar Baja del Anexo <small style="font-size: 80%;">'+data.nombre+'</small>');
        modal_title.find('i').removeClass().addClass('fas fa-edit');
        $('input[name="action"]').val('rechazar');
        $('input[name="id"]' ).val(data.id);
        document.getElementById('observacion').style.display = 'block';
        var btn = document.getElementById("boton");
        btn.style.borderColor= '#ff5b57';
        btn.style.backgroundColor= '#ff5b57';
        btn.innerHTML = 'Rechazar';
        $('#solicitudes_anexo').modal('show');
    });

    $('#solicitudes_anexo').on('shown.bs.modal', function () {
    });

    $('form').on('submit', function (e) {
        e.preventDefault();
        var parameters = new FormData(this);
        console.log(FormData);
        submit_with_ajax(window.location.pathname, 'Notificación', '¿Estas seguro de realizar la siguiente acción?', parameters, function () {
            $('#solicitudes_anexo').modal('hide');
            tblSolicitudAnex.ajax.reload();
        });   
    });
});