<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ['name', 'event_type_id', 'date', 'org_id', 'view', 'venue_id'];
}
