<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class ByCountryController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     * @method GET
     */
    public function show($id)
    {
        try {

            $customers = DB::table('customers')
                ->join('countries', 'customers.country_id', '=', 'countries.id')
                ->where('customers.country_id', $id)
                ->select('customers.*', 'countries.country_name')
                ->orderBy('customers.id')
                ->paginate(5);

            if($customers) {
                return $customers;
            }

            return errorReturn("listar todos");

        } catch (Throwable $exception) {
            return exceptionReturn($exception->getMessage());
        }
    }

}
