
/*Generic Vars*/

var endpointCustomer  = "http://joinner.test/api/customer";
var endpointCountry   = "http://joinner.test/api/country";
var endpointByCountry = "http://joinner.test/api/by_country";

/*Generic Functions*/

function activeEvents() {

    $("[data-delete-customer]", "", "").unbind().on('click', function (e) {

        e.preventDefault();
        e.stopPropagation();

        let customer_del = $(this).data().content.split(";");

        alertify.confirm('Mensagem', 'Deseja mesmo excluir: ' + customer_del[1] + ' ?',

            function () {
                deleteCustomer(customer_del[0]);
            },

            function () {
                alertify.error('Cancelado');
            }
        );
    });

    $("[data-lock-customer]", "", "").unbind().on('click', function (e) {

        e.preventDefault();
        e.stopPropagation();

        let customer_del = $(this).data().content.split(";");

        alertify.confirm('Mensagem', 'Em desenvolvimento!<br />Deseja mesmo bloquear: ' + customer_del[1] + ' ?',

            function () {
                alertify.success('Confirmado');
            },

            function () {
                alertify.error('Cancelado');
            }
        );
    });

    $("[data-edit-customer]", "", "").unbind().on('click', function (e) {

        e.preventDefault();
        e.stopPropagation();

        modalEditCustomer($(this).data().content);

    });
}

/*TODO: Configurar Paginador Personalizado*/
function createPager(el, total, item, itens, limit) {

    var currentIten = 0;
    var pagerTotal = Math.ceil(total / itens);
    var itensSide = Math.floor(limit / 2);
    var pagerTarget = $("#ul-pager-"+el);

    pagerTarget.html('');

    //Primeiro Restultado
    pagerTarget.append("<li class='page-item'><a class='page-link pointer' data-item-value-"+el+"='"+currentIten+"'>Primeira</a></li>");

    for(var k = (item - itensSide); k <= (item - 1); k++) {

        if(k >= 0) {
            currentIten = k + 1;
            pagerTarget.append("<li class='page-item'><a class='page-link pointer' data-item-value-"+el+"='"+k+"'>"+currentIten+"</a></li>");
        }
    }

    //Item Atual
    pagerTarget.append("<li class='page-item active'><a class='page-link pointer' data-item-value-"+el+"='"+item+"'>"+(currentIten+1)+"</a></li>");

    for(var k = (item + 1); k <= (item + itensSide); k++) {

        if(k < pagerTotal) {
            currentIten = k + 1;
            pagerTarget.append("<li class='page-item'><a class='page-link pointer' data-item-value-"+el+"='"+k+"'>"+currentIten+"</a></li>");
        }
    }

    //Ultimo Restultado
    pagerTarget.append("<li class='page-item'><a class='page-link pointer' data-item-value-"+el+"='"+(pagerTotal-1)+"'>Ultima</a></li>");

    $("[data-item-value-"+el+"]").on('click', function(e){
        if(el === 'openbuy') {
            openBuyPagination($(this).data('itemValueOpenbuy'));
        }
        if(el === 'morebuy') {
            moreBuyPagination($(this).data('itemValueMorebuy'));
        }
    });

}

function dateView(d) {
    let date_view;
    let tmp_date = d.split("-");

    date_view = tmp_date[2]+'/'+tmp_date[1]+'/'+tmp_date[0];

    if(tmp_date[2].search(" ") != -1) {
        date_view = tmp_date[1]+'/'+tmp_date[0];
        tmp_date = tmp_date[2].split(" ");
        date_view = tmp_date[0]+'/'+date_view+' '+tmp_date[1];
    }

    return date_view;
}

function validateForm() {

    let date_current = new Date();
    let date_form = new Date($("#customer_date").val());

    if(+date_form > +date_current) {
        alertify.error("Data de Nascimento Invalida !");
        return false;
    }

    if(
        !$("#customer_name", "", "").val() ||
        !$("#customer_mail", "", "").val() ||
        !$("#select_country_new", "", "").val() ||
        !$("#customer_gen", "", "").val() ||
        !$("#customer_date", "", "").val()
    ) {
        return false;
    }

    return true;
}

function flushForm() {
    $(
        "#customer_name, " +
        "#customer_gen, " +
        "#customer_mail, " +
        "#select_country_new, " +
        "#customer_date", "", "").val('');
    $("#span_title_modal").html("Novo Cliente");
    $("#a_save_new_customer", "", "").unbind().on('click', function() {
        saveCustomer("", "new");
    });
}

function modalEditCustomer(params) {

    $("#div_lock_screen", "", "").show('fast');
    $("#div_modal_customer", "", "").show('fade');
    $("#span_title_modal").html("Atualizar Cliente");

    let customer_edit = params.split(";");

    $("#select_country_new", "", "").val(customer_edit[3]);
    $("#customer_name", "", "").val(customer_edit[1]);
    $("#customer_mail", "", "").val(customer_edit[2]);
    $("#customer_gen", "", "").val(customer_edit[4]);
    $("#customer_date", "", "").val(customer_edit[5]);

    if(customer_edit[4] == 'null') {
        $("#customer_gen", "", "").val("");
    }

    $("#a_save_new_customer", "", "").unbind().on('click', function() {
        saveCustomer(customer_edit[0], "edit");
    });

}

function saveCustomer(id, type) {

    let action = (type == "new") ? 'cadastrar' : 'atualizar';

    if (validateForm()) {

        alertify.confirm('Mensagem', 'Deseja mesmo '+action+' o registro ?',

            function () {

                if(type == "new") {//New
                    createCustomer();
                }

                if(type == "edit") {//Edit
                    updateCustomer(id);
                }

                flushForm();
                $("#div_lock_screen", "", "").hide('fast');
                $("#div_modal_customer", "", "").hide('fade');
            },

            function () {
                alertify.error('Cancelado');
            }
        );

    } else {
        alertify.alert("Aviso", "Por favor informe todos os campos");
    }
}

function requestSanitize(_option) {

    let request = {
        "country_id": $("#select_country_new", "", "").val(),
        "name": $("#customer_name", "", "").val(),
        "email": $("#customer_mail", "", "").val(),
        "gender": $("#customer_gen", "", "").val(),
        "birth_date": $("#customer_date", "", "").val()
    };

    if(_option == "Nao_informado") {
        request.gender = null;
    }

    return request;
}

function _errorAlertify(msg_error) {

    // Extend existing 'alert' dialog
    if(!alertify.errorAlert){
        //define a new errorAlert base on alert
        alertify.dialog('errorAlert',function factory(){
            return{
                build:function(){
                    var errorHeader = '<span class="fa fa-times-circle fa-2x" '
                        +    'style="vertical-align:middle;color:#e10000;">'
                        + '</span> Application Error';
                    this.setHeader(errorHeader);
                }
            };
        },true,'alert');
    }
    //launch it.
    // since this was transient, we can launch another instance at the same time.
    alertify.errorAlert(msg_error);

}

/*
*
* CRUD Requests
*
* */

//Create
function createCustomer() {

    let dataReq = requestSanitize($("#customer_gen", "", "").val());

    $.ajax({

        type: "POST",
        url: endpointCustomer,
        data: JSON.stringify(dataReq),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        async: false,

        beforeSend: function(data) {
            console.log("Ajax-beforeSend...");
        },

        success: function (rsp, status, xhr) {

            if(rsp.status == 1) {
                alertify.success(rsp.message);
                readCustomer("");
                activeEvents();
            } else if(rsp.status == 2) {
                _errorAlertify(atob(rsp.message));
            } else {
                alertify.error(rsp.message);
            }

        },

        complete: function(data) {
            console.log("Ajax-complete...");
        },

        error: function (err, status, xhr) {
            console.error(err, status, xhr);
        }
    });
}

//Read
function readCustomer(country) {

    let endpoint = endpointCustomer;

    if(country) {
        endpoint = endpointByCountry + "/" + country;
    }

    $.ajax({

        type: "GET",
        url: endpoint,
        data: {},
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        async: false,

        beforeSend: function(data) {
            console.log("Ajax-beforeSend...");
        },

        success: function (rsp, status, xhr) {

            var resp = JSON.stringify(rsp);
            var json = JSON.parse(resp);

            $("#tbody_customer_list", "", "").html('');

            if(json.length == 0) {
                alertify.error("Nada encontrado");
                return false;
            }

            if(json.status == 2) {
                _errorAlertify(atob(rsp.message));
                return false;
            }

            $.each(json, function (i, obj) {

                /*Salva os dados do registro para uso posterior*/
                let data_set_customer =
                    obj.id+';'+
                    obj.name+';'+
                    obj.email+';'+
                    obj.country_id+';'+
                    obj.gender+';'+
                    obj.birth_date;

                obj.birth_date = dateView(obj.birth_date);
                obj.created_at = dateView(obj.created_at);
                obj.updated_at = dateView(obj.updated_at);

                $("#tbody_customer_list", "", "").append('\
                            <tr>\
                                <td style="text-align: center;">'+ obj.id +'</td>\
                                <td style="text-align: center;">'+ obj.country_name +'</td>\
                                <td>'+ obj.name +'</td>\
                                <td>'+ obj.email +'</td>\
                                <td>'+ obj.gender +'</td>\
                                <td>'+ obj.birth_date +'</td>\
                                <td>'+ obj.created_at +'</td>\
                                <td>'+ obj.updated_at +'</td>\
                                <td style="text-align: center;">\
                                    <a data-edit-customer data-content="' + data_set_customer + '"  class="btn btn-primary btn-xs">\
                                        <i class="fa fa-edit"></i> \
                                        Editar\
                                    </a>\
                                    <a data-lock-customer data-content="' + data_set_customer + '" class="btn btn-outline-secondary btn-xs">\
                                        <i class="fa fa-lock"></i>\
                                        Bloquear\
                                    </a>\
                                    <a data-delete-customer data-content="' + data_set_customer + '"  class="btn btn-danger btn-xs">\
                                        <i class="fa fa-trash"></i>\
                                        Excluir\
                                    </a>\
                                </td>\
                            </tr>');
            });

        },

        complete: function(data) {

            setTimeout(function() {
                $("#table_customer_list", "", "").fadeIn();
            }, 600);

            console.log("Ajax-complete...");
        },

        error: function (err, status, xhr) {
            console.error(err, status, xhr);
        }
    });
}

function readCountries(target) {

    $.ajax({

        type: "GET",
        url: endpointCountry,
        data: {},
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        async: false,

        beforeSend: function(data) {
            console.log("Ajax-beforeSend...");
        },

        success: function (rsp, status, xhr) {

            var resp = JSON.stringify(rsp);
            var json = JSON.parse(resp);

            if(json.status == 2) {
                _errorAlertify(atob(rsp.message));
                return false;
            }

            for(var k = 0; k < target.length; k++) {

                $("#" + target[k], "", "").html('<option value="">Selecione um pais</option>');

                $.each(json, function (i, obj) {
                    $("#" + target[k], "", "").append(
                        '<option value="' + obj.id + '">' + obj.country_name + '</option>'
                    );
                });

            }

        },

        complete: function(data) {
            console.log("Ajax-complete...");
        },

        error: function (err, status, xhr) {
            console.error(err, status, xhr);
        }
    });
}

//Update
function updateCustomer(id) {

    let dataReq = requestSanitize($("#customer_gen", "", "").val());

    $.ajax({

        type: "PUT",
        url: endpointCustomer+"/"+id,
        data: JSON.stringify(dataReq),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        async: false,

        beforeSend: function(data) {
            console.log("Ajax-beforeSend...");
        },

        success: function (rsp, status, xhr) {

            if(rsp.status == 1) {
                alertify.success(rsp.message);
                readCustomer("");
                activeEvents();
            } else if(json.status == 2) {
                _errorAlertify(atob(rsp.message));
                return false;
            } else {
                alertify.error(rsp.message);
            }

        },

        complete: function(data) {
            console.log("Ajax-complete...");
        },

        error: function (err, status, xhr) {
            console.error(err, status, xhr);
        }
    });

}

//Delete
function deleteCustomer(id) {

    $.ajax({

        type: "DELETE",
        url: endpointCustomer+"/"+id,
        data: {},
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        async: false,

        beforeSend: function(data) {
            console.log("Ajax-beforeSend...");
        },

        success: function (rsp, status, xhr) {

            if(rsp.status == 1) {
                alertify.success(rsp.message);
                readCustomer("");
                activeEvents();
            } else if(json.status == 2) {
                _errorAlertify(atob(rsp.message));
                return false;
            } else {
                alertify.error(rsp.message);
            }

        },

        complete: function(data) {
            console.log("Ajax-complete...");
        },

        error: function (err, status, xhr) {
            console.error(err, status, xhr);
        }
    });
}

$(document, "", "").ready(function() {

    $('.dropdown', '', '').unbind().on('click', function() {
        $('.dropdown-menu', '', '').toggle();
    });

    $("#data-list-customer", "", "").unbind().on('click', function() {
        readCustomer("");
        activeEvents();
        /*TODO: Paginador Personalizado*/
        createPager('customer', 10, 10, 10, 10);
    });

    $("#data-create-new-customer", "", "").unbind().on('click', function() {
        $("#div_lock_screen", "", "").show('fast');
        $("#div_modal_customer", "", "").show('fade');
    });

    $("#a_save_new_customer", "", "").unbind().on('click', function() {
        saveCustomer("", "new");
    });

    $("#a_cancel_new_customer, #a_close_modal", "", "").unbind().on('click', function() {
        flushForm();
        $("#div_lock_screen", "", "").hide('fast');
        $("#div_modal_customer", "", "").hide('fade');
    });

    $("#select_country_content", "", "").on('change', function(){
        if($(this).val()) {
            readCustomer($(this).val());
        }
    });

    readCustomer("");
    activeEvents();
    readCountries(['select_country_content', 'select_country_new']);

    /*TODO: Paginador Personalizado*/
    createPager('customer', 10, 10, 10, 10);

});
