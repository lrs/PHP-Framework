<?php

namespace App\Core;

class Storage
{
    protected $disks = [];
    protected $disk = null;

    public function __construct()
    {
    }

    public static function disk(string $disk)
    {
        $storage = new static();

        if (0 == count($storage->disks)) {
            $storage->disks = include __DIR__ . '/../config/storage.php';

            if (array_key_exists($disk, $storage->disks)) {
                $storage->disk = $storage->disks[$disk];
            }
        }

        return $storage;
    }

    public function exists(string $path)
    {
        if ($this->diskExists()) {
            return file_exists("{$this->disk}/{$path}");
        }

        return false;
    }

    public function append(string $path, string $msg)
    {
        if ($this->diskExists()) {
            file_put_contents("{$this->disk}/{$path}", "$msg\n", FILE_APPEND);
        }
    }

    public function put(string $path, string $msg)
    {
        if ($this->diskExists()) {
            file_put_contents("{$this->disk}/{$path}", "$msg\n");
        }
    }

    private function diskExists()
    {
        return isset($this->disk);
    }
}
