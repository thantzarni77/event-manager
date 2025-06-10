<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ['name', 'event_type_id', 'start_date', 'end_date', 'org_id', 'venue_id'];
}
