<?php

/*Generic Helpers*/

function errorReturn($type)
{
    return json_encode([
        "status" => 0,
        "message" => "Erro ao tentar {$type}"
    ]);
}

function successReturn($type)
{
    return json_encode([
        "status" => 1,
        "message" => "{$type} com sucesso"
    ]);
}

function exceptionReturn($ex)
{
    return json_encode([
        "status" => 2,
        "message" => base64_encode($ex)
    ]);
}
