<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Org extends Model
{
    protected $fillable = ['name', 'description', 'profile', 'admin_id'];
}
