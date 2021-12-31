<?php

namespace App\Core;

class EventEmitter
{
    private $events;

    public function __construct()
    {
        $this->events = [];
    }

    public function on($event, $callback)
    {
        if (!$this->events[$event]) {
            $this->events[$event] = [];
        }

        $this->events[$event].push($callback);
    }

    public function trigger($event, ...$args)
    {
        if (!$this->events[$event]) {
            return false;
        }

        foreach ($this->events[$event] as $callback) {
            call_user_func($callback, ...$args);
        }

        return true;
    }
}
