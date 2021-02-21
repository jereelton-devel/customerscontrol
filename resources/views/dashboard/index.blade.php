@extends('layouts.admin_header')

@section('content')
    <!-- Content Header (Page header) -->
    <section class="content-header">

        <h1>Controle de Clientes</h1>

        <div id="div_bt_new_customer">
            <select class="bg-dark" id="select_country_content">
            </select>

            <a id="data-create-new-customer" class="btn btn-success">
                <i class="fa fa-plus"></i>
                Cadastrar
            </a>

            <a id="data-list-customer" class="btn btn-warning">
                <i class="fa fa-list"></i>
                Recarregar
            </a>
        </div>

    </section>

    <section class="content customer_list">

        <div class="box-body no-padding">
            <table id="table_customer_list" class="table table-striped table-hover table-dark">
                <thead>
                <tr>
                    <th style="width: 10px; text-align: center;">Id</th>
                    <th style="text-align: center;">País</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th style="width: 140px;">Gênero</th>
                    <th style="width: 140px;">Nascimento</th>
                    <th style="width: 140px;">Criado em</th>
                    <th style="width: 140px;">Atualizado em</th>
                    <th style="width: 320px; text-align: center;">Ação</th>
                </tr>
                </thead>
                <tbody id="tbody_customer_list">
                </tbody>
            </table>
        </div>

        <div id="div-pager-customer">
            <ul id="ul-pager-customer" class="pagination"></ul>
            <div id="div-pager-info"></div>
        </div>

    </section>

    <!-- /.content -->
@endsection
