<?php

namespace App\Core\Database;

use PDO;
use PDOException;

class QueryBuilder
{
    protected $conn;

    protected $sql = '';

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function raw($query)
    {
        try {
            $qry = $this->conn->prepare($query);
            $qry->execute();

            if (false !== mb_stripos($query, 'select')) {
                return $qry->fetchAll(PDO::FETCH_CLASS);
            } else {
                return $qry->rowCount();
            }
        } catch (PDOException $err) {
            return $err->getMessage();
        }
    }

    public function select($table)
    {
        $this->sql = "select * from {$table}";

        return $this;
    }

    public function where()
    {
        $params = func_get_args();

        if (2 == count($params)) {
            $this->sql .= " where {$params[0]} = '{$params[1]}'";
        } else {
            $this->sql .= " where {$params[0]} {$params[1]} '{$params[2]}'";
        }

        return $this;
    }

    public function all()
    {
        try {
            $qry = $this->conn->prepare($this->sql);
            $qry->execute();

            return $qry->fetchAll(PDO::FETCH_CLASS);
        } catch (PDOException $err) {
            throw new \Exception($err->message(), 1);
        }
    }

    public function first()
    {
        return $this->all()[0];
    }

    public function insert($table, $params)
    {
        $sql = sprintf(
            'insert %s (%s) values (%s)',
            $table,
            implode(', ', array_keys($params)),
            ':' . implode(', :', array_keys($params))
        );

        try {
            $qry = $this->conn->prepare($sql);
            $qry->execute($params);
        } catch (PDOException $err) {
            throw new \Exception($err->message(), 1);
        }

        $id = $this->conn->lastInsertId();
        return $id;
    }
}
