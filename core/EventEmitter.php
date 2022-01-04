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
        if (!array_key_exists($event, $this->events)) {
            $this->events[$event] = [];
        }

        array_push($this->events[$event], $callback);
    }

    public function trigger($event, ...$args)
    {
        if (!array_key_exists($event, $this->events)) {
            return false;
        }

        foreach ($this->events[$event] as $callback) {
            $callback(...$args);
        }

        return true;
    }

    public function remove($event)
    {
        if ($this->events[$event]) {
            unset($this->events[$event]);
        }
    }
}
