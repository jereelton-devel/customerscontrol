
/*Generic Vars*/

var endpointCustomer  = "http://joinner.test/api/customer";
var endpointCountry   = "http://joinner.test/api/country";
var endpointByCountry = "http://joinner.test/api/by_country";

/*Generic Functions*/

function lockerControl() {

    /**
     * Projeto Name: noback v0.0.1
     * Description: library for prevent backbutton
     * Author: Kiko Mesquita (http://twitter.com/kikomesquita) Copyright (c) 2015 @kikomesquita
     * Comments: Based on stackoverflow
     * Adapted by: Jereelton Teixeira
     */

    (function (window) {
        'use strict';

        var x_back_denied = {

            //globals
            version: '0.0.1',
            history_api: typeof history.pushState !== 'undefined',

            init: function () {
                window.location.hash = '#x-to-lock';
                x_back_denied.configure();
            },

            configure: function () {
                if (window.location.hash == '#x-to-lock') {
                    if (this.history_api) {
                        history.pushState(null, '', '#x-padlock');
                    } else {
                        window.location.hash = '#x-padlock';
                    }
                }
                x_back_denied.checkCompat();
                x_back_denied.hasChanged();
            },

            checkCompat: function () {
                if (window.addEventListener) {
                    window.addEventListener("hashchange", x_back_denied.hasChanged, false);
                } else if (window.attachEvent) {
                    window.attachEvent("onhashchange", x_back_denied.hasChanged);
                } else {
                    window.onhashchange = x_back_denied.hasChanged;
                }
            },

            hasChanged: function () {
                if (window.location.hash == '#x-to-lock') {
                    window.location.hash = '#x-padlock';
                    alertify.dialog('alert')
                        .set({
                            transition:'zoom',
                            title: 'Aviso',
                            message: 'Não é permitido usar esse controle'
                        }).show();
                }
            }
        };

        // AMD support
        if (typeof define === 'function' && define.amd) {
            define(function () {
                return x_back_denied;
            });
        }
        // For CommonJS and CommonJS-like
        else if (typeof module === 'object' && module.exports) {
            module.exports = x_back_denied;
        } else {
            window.x_back_denied = x_back_denied;
        }

        x_back_denied.init();

    }(window));

} lockerControl();

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

function createPager(args) {

    //Pagina atual
    var currentPage = 0;

    //Total de paginas
    var pagerTotal = args._last_page;

    //Quantidade de itens de cada lado da page atual
    var qtyItemsEachSide = Math.floor(args._max_pager / 2);

    //Elemento alvo para mostrar o pagiandor e informações
    var pagerTarget = $(args._target);
    var pagerTargetInfo = $(args._pager_info);

    //Flush no paginador
    pagerTarget.html('');

    //Acesso a Primeira Page
    pagerTarget.append("" +
        "<li class='page-item'>" +
            "<a class='page-link pointer_first' data-paginate-result data-content='"+currentPage+"'>" +
                "Inicio" +
            "</a>" +
        "</li>");

    //Pagina Anterior
    pagerTarget.append("" +
        "<li class='page-item'>" +
        "<a class='page-link pointer' data-paginate-result data-content='"+(args._page-1)+"'>" +
            "<" +
        "</a>" +
        "</li>");

    //Processa o lado esquerdo do paginador, antes do item atual (active)
    for(var k = (args._page - qtyItemsEachSide); k <= (args._page - 1); k++) {

        if(k >= 1) {
            currentPage = k;
            pagerTarget.append("" +
                "<li class='page-item'>" +
                    "<a class='page-link pointer' data-paginate-result data-content='"+currentPage+"'>" +
                        currentPage +
                    "</a>" +
                "</li>");
        }
    }

    currentPage++;

    //Item Atual
    pagerTarget.append("" +
        "<li class='page-item active'>" +
            "<a class='page-link pointer' data-paginate-result data-content='"+currentPage+"'>" +
                currentPage +
            "</a>" +
        "</li>");

    //Processa o lado direito do paginador, apos o item atual (active)
    for(var k = (args._page + 1); k <= (args._page + qtyItemsEachSide); k++) {

        if(k <= pagerTotal) {
            currentPage = k;
            pagerTarget.append("" +
                "<li class='page-item'>" +
                    "<a class='page-link pointer' data-paginate-result data-content='"+k+"'>"+ k +"</a>" +
                "</li>");
        }
    }

    //Pagina Posterior
    pagerTarget.append("" +
        "<li class='page-item'>" +
        "<a class='page-link pointer' data-paginate-result data-content='"+(args._page+1)+"'>" +
        ">" +
        "</a>" +
        "</li>");

    //Acesso a Ultima Page
    pagerTarget.append("" +
        "<li class='page-item'>" +
            "<a class='page-link pointer_last' data-paginate-result data-content='"+(pagerTotal)+"'>" +
                "Fim" +
            "</a>" +
        "</li>");

    if(args._pager_info) {
        //Mostra informações sobre o resultado
        pagerTargetInfo.html(
            "Exibindo resultados de " + args._from_item + " a " + args._to_item + " para " + args._total_items + " encontrado(s)"
        );
    }

    //Ativa evento de paginação
    $("[data-paginate-result]").on('click', function(e){
        if(args._page != $(this).data().content) {
            readCustomer($("#select_country_content", "", "").val(), $(this).data().content);
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

                $("#select_country_content").val($("#select_country_new").val());

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

function writeTableResult(target, json) {

    $.each(json.data, function (i, obj) {

        /*Salva os dados do registro para uso posterior*/
        let data_set_customer =
            obj.id + ';' +
            obj.name + ';' +
            obj.email + ';' +
            obj.country_id + ';' +
            obj.gender + ';' +
            obj.birth_date;

        obj.birth_date = dateView(obj.birth_date);
        obj.created_at = dateView(obj.created_at);
        obj.updated_at = dateView(obj.updated_at);

        $(target, "", "")
            .append('\
                <tr>\
                    <td style="text-align: center;">' + obj.id + '</td>\
                    <td style="text-align: center;">' + obj.country_name + '</td>\
                    <td>' + obj.name + '</td>\
                    <td>' + obj.email + '</td>\
                    <td>' + obj.gender + '</td>\
                    <td>' + obj.birth_date + '</td>\
                    <td>' + obj.created_at + '</td>\
                    <td>' + obj.updated_at + '</td>\
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

    activeEvents();

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
                readCustomer($("#select_country_content").val(), "");
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
function readCustomer(country, page) {

    console.log(country, page);

    $("#table_customer_list", "", "").fadeOut();

    let endpoint = endpointCustomer;

    if(country && page) {
        endpoint = endpointByCountry + "/" + country + "?page=" + page;
    } else if(country) {
        endpoint = endpointByCountry + "/" + country;
    } else if(page) {
        endpoint = endpointCustomer + "?page=" + page;
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

            if(json.data.length == 0) {
                alertify.error("Nada encontrado");
                return false;
            }

            if(json.status == 2) {
                _errorAlertify(atob(rsp.message));
                return false;
            }

            setTimeout(function(){
                writeTableResult("#tbody_customer_list", json);
                $("#table_customer_list", "", "").fadeIn();
            }, 300);

            createPager({
                '_target': '#ul-pager-customer',
                '_pager_info': '#div-pager-info',
                '_total_items': json.total,
                '_page': json.current_page,
                '_last_page': json.last_page,
                '_max_pager': 6,
                '_from_item': json.from,
                '_to_item': json.to
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

                $(target[k], "", "").html('<option value="">Selecione um pais</option>');

                $.each(json, function (i, obj) {
                    $(target[k], "", "").append(
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
                readCustomer($("#select_country_content").val(), 1);
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
                readCustomer($("#select_country_content").val(), 1);
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

/*DOM READY Functions*/

$(document, "", "").ready(function() {

    $('.dropdown', '', '').unbind().on('click', function() {
        $('.dropdown-menu', '', '').toggle();
    });

    $("#data-list-customer", "", "").unbind().on('click', function() {
        flushForm();
        readCustomer($("#select_country_content", "", "").val(), 1);
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
            readCustomer($(this).val(), "");
        }
    });

    readCustomer("", "");
    readCountries(['#select_country_content', '#select_country_new']);

});
