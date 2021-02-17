
/*Generic Functions*/

function activeEvents() {

    $("[data-delete-user]", "", "").unbind().on('click', function (e) {

        e.preventDefault();
        e.stopPropagation();

        let user_del = $(this).data().content.split(";");

        alertify.confirm('Mensagem', 'Deseja mesmo excluir o registro: ' + user_del[1] + ' ?',

            function () {
                deleteUser(user_del[0]);
            },

            function () {
                alertify.error('Cancelado');
            }
        );
    });

    $("[data-lock-user]", "", "").unbind().on('click', function (e) {

        e.preventDefault();
        e.stopPropagation();

        let user_del = $(this).data().content.split(";");

        alertify.confirm('Mensagem', 'Em desenvolvimento!<br />Deseja mesmo bloquear o registro: ' + user_del[1] + ' ?',

            function () {
                alertify.success('Confirmado');
            },

            function () {
                alertify.error('Cancelado');
            }
        );
    });

    $("[data-edit-user]", "", "").unbind().on('click', function (e) {

        e.preventDefault();
        e.stopPropagation();

        modalEditUser($(this).data().content);

    });
}

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

function validateForm(type) {

    if(
        !$("#usertype", "", "").val() ||
        !$("#username", "", "").val() ||
        !$("#usermail", "", "").val() ||
        !$("#usercountry", "", "").val() ||
        !$("#usergen", "", "").val()
    ) {
        return  false;
    }

    if(!$("#userpass", "", "").val() && type == "new") {
        return  false;
    }

    return true;
}

function flushForm() {
    $("#username, #usertype, #usergen, #usermail, #usercountry, #userpass", "", "").val('');
}

function modalEditUser(params) {

    $("#div_lock_screen", "", "").show('fast');
    $("#div_modal_users", "", "").show('fade');

    let user_edit = params.split(";");

    $("#username", "", "").val(user_edit[1]);
    $("#usermail", "", "").val(user_edit[2]);
    $("#usertype", "", "").val(user_edit[3]);
    $("#usergen", "", "").val(1);
    $("#usercountry", "", "").val(1);
    $("#userpass", "", "").val('');

    $("#a_save_new_user", "", "").unbind().on('click', function() {
        saveUser(user_edit[0], "edit");
    });

}

function saveUser(id, type) {

    let action = (type == "new") ? 'criar' : 'atualizar';

    if (validateForm(type)) {

        alertify.confirm('Mensagem', 'Deseja mesmo '+action+' o usuário ?',

            function () {

                if(type == "new") {//New
                    createUser();
                }

                if(type == "edit") {//Edit
                    updateUser(id);
                }

                flushForm();
                $("#div_lock_screen", "", "").hide('fast');
                $("#div_modal_users", "", "").hide('fade');
            },

            function () {
                alertify.error('Cancelado');
            }
        );

    } else {
        alertify.alert("Aviso", "Por favor informe todos os campos");
    }

    $("#a_save_new_user", "", "").unbind().on('click', function() {
        saveUser("", "new");
    });
}

/*
*
* CRUD Requests
*
* */

//Create
function createUser() {

    $.ajax({

        type: "POST",
        url: "http://joinner.test/api/users",
        data: JSON.stringify({
            "user_level": $("#usertype", "", "").val(),
            "name": $("#username", "", "").val(),
            "email": $("#usermail", "", "").val(),
            "password": $("#userpass", "", "").val(),
            "country": $("#usercountry", "", "").val(),
            "gender": $("#usergen", "", "").val()
        }),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        async: false,

        beforeSend: function(data) {
            console.log("Ajax-beforeSend...");
        },

        success: function (rsp, status, xhr) {

            if(rsp.status == 1) {
                alertify.success(rsp.message);
                readUsers();
                activeEvents();
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
function readUsers() {

    $.ajax({

        type: "GET",
        url: "http://joinner.test/api/users",
        data: {},
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        async: false,

        beforeSend: function(data) {
            console.log("Ajax-beforeSend...");
            $("#table_users_list", "", "").fadeOut();
        },

        success: function (rsp, status, xhr) {

            var resp = JSON.stringify(rsp);
            var json = JSON.parse(resp);

            $("#tbody_users_list", "", "").html('');

            $.each(json, function (i, obj) {

                let data_set_user = obj.id+';'+obj.name+';'+obj.email+';'+obj.user_level;

                $("#tbody_users_list", "", "").append('\
                            <tr>\
                                <td style="text-align: center;">'+ obj.id +'</td>\
                                <td style="text-align: center;">'+ obj.user_level +'</td>\
                                <td>'+ obj.name +'</td>\
                                <td>'+ obj.email +'</td>\
                                <td>'+ obj.created_at +'</td>\
                                <td>'+ obj.updated_at +'</td>\
                                <td style="text-align: center;">\
                                    <a data-edit-user data-content="' + data_set_user + '"  class="btn btn-primary btn-xs">\
                                        <i class="fa fa-edit"></i> \
                                        Editar\
                                    </a>\
                                    <a data-lock-user data-content="' + data_set_user + '" class="btn btn-dark btn-xs">\
                                        <i class="fa fa-lock"></i>\
                                        Bloquear\
                                    </a>\
                                    <a data-delete-user data-content="' + data_set_user + '"  class="btn btn-danger btn-xs">\
                                        <i class="fa fa-trash"></i>\
                                        Excluir\
                                    </a>\
                                </td>\
                            </tr>');
            });

            $("#table_users_list", "", "").fadeIn();

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
function updateUser(id) {

    let data_request = {
        "user_level": $("#usertype", "", "").val(),
        "name": $("#username", "", "").val(),
        "email": $("#usermail", "", "").val(),
        "password": $("#userpass", "", "").val(),
        "country": $("#usercountry", "", "").val(),
        "gender": $("#usergen", "", "").val()
    }

    //Nao é obrigatorio mudar a senha quando a action for [UPDATE] => PUT
    if(!$("#userpass", "", "").val()) {
        data_request = {
            "user_level": $("#usertype", "", "").val(),
            "name": $("#username", "", "").val(),
            "email": $("#usermail", "", "").val(),
            "country": $("#usercountry", "", "").val(),
            "gender": $("#usergen", "", "").val()
        };

    }

    $.ajax({

        type: "PUT",
        url: "http://joinner.test/api/users/"+id,
        data: JSON.stringify(data_request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        async: false,

        beforeSend: function(data) {
            console.log("Ajax-beforeSend...");
        },

        success: function (rsp, status, xhr) {

            if(rsp.status == 1) {
                alertify.success(rsp.message);
                readUsers();
                activeEvents();
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
function deleteUser(id) {

    $.ajax({

        type: "DELETE",
        url: "http://joinner.test/api/users/"+id,
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
                readUsers();
                activeEvents();
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

    $("#data-list-users", "", "").unbind().on('click', function() {
        readUsers();
        activeEvents();
        createPager('users', 5, 1, 2, 5);//Teste
    });

    $("#data-create-new-user", "", "").unbind().on('click', function() {
        $("#div_lock_screen", "", "").show('fast');
        $("#div_modal_users", "", "").show('fade');
    });

    $("#a_close_modal", "", "").unbind().on('click', function() {
        $("#div_lock_screen", "", "").hide('fast');
        $("#div_modal_users", "", "").hide('fade');
    });

    $("#a_save_new_user", "", "").unbind().on('click', function() {
        saveUser("", "new");
    });

    $("#a_cancel_new_user", "", "").unbind().on('click', function() {
        flushForm();
        $("#div_lock_screen", "", "").hide('fast');
        $("#div_modal_users", "", "").hide('fade');
    });

    readUsers();
    activeEvents();
    createPager('users', 5, 1, 2, 5);//Teste

});
