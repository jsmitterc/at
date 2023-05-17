<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/{search}', function ($search) {
    $client = new GuzzleHttp\Client();
    try{
        $res = $client->get("https://global.atdtravel.com/api/products?geo=en&title=$search");
        $products = $res->getBody();

        return $products;

    }catch (GuzzleHttp\Exception\ClientException $e) {
        
        return json_encode(array("data"=> array()));
    }
});
