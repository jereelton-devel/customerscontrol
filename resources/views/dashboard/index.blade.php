@extends('layouts.admin')

@section('content')
    <!-- Content Header (Page header) -->
    <section class="content-header">

        <h1>Controle de Usuários</h1>

        <div id="div_bt_new_user">
            <select class="bg-dark">
                <option value="">Selecione um País</option>
                <option value="Brasil">Brasil</option>
                <option value="Russia">Russia</option>
                <option value="EUA">EUA</option>
                <option value="Alemanha">Alemanha</option>
            </select>

            <a id="data-create-new-user" class="btn btn-success">
                <i class="fa fa-plus"></i>
                Criar Usuário
            </a>

            <a id="data-list-users" class="btn btn-secondary">
                <i class="fa fa-list"></i>
                Listar Usuários
            </a>
        </div>

    </section>

    <section class="content user_list">

        <div class="box-body no-padding">
            <table id="table_users_list" class="table table-striped table-hover table-dark">
                <thead>
                <tr>
                    <th style="width: 10px; text-align: center;">#</th>
                    <th style="text-align: center;">User Level</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th style="width: 140px;">Data Cadastro</th>
                    <th style="width: 140px;">Data Atualização</th>
                    <th style="width: 320px; text-align: center;">Ação</th>
                </tr>
                </thead>
                <tbody id="tbody_users_list">
                @unless(empty($listusers))
                    @foreach ($listusers as $user)
                        <tr>
                            <td>{{ $user->id }}</td>
                            <td style="text-align: center;">{{ $user->user_level }}</td>
                            <td>{{ $user->name }}</td>
                            <td>{{ $user->email }}</td>
                            <td>{{ $user->created_at }}</td>
                            <td>{{ $user->updated_at }}</td>
                            <td>
                                <a href="/edituser/{{ $user->id }}" class="btn btn-primary btn-xs"><i class="fa fa-edit"></i> Editar</a>
                                <a href="/deleteuser/{{ $user->id }}" onclick="return confirm('Deseja realmente excluir este registro?')" class="btn btn-warning btn-xs"><i class="fa fa-lock"></i> Bloquear</a>
                                <a href="/deleteuser/{{ $user->id }}" onclick="return confirm('Deseja realmente excluir este registro?')" class="btn btn-danger btn-xs"><i class="fa fa-trash"></i> Excluir</a>
                            </td>
                        </tr>
                    @endforeach
                @endunless
                </tbody>
            </table>
        </div>

        <div id="div-pager-users">
            <ul id="ul-pager-users" class="pagination"></ul>
        </div>

    </section>

    <!-- /.content -->
@endsection
