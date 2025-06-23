<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class TaskMigration extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'title' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
            ],
            'description' => [
                'type' => 'TEXT',
                'constraint' => 500,
                'null' => true,
            ],
            'start_date' => [
                'type' => 'DATETIME',
                'null' => false,
            ],
            'end_date' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'status' => [
                'type' => 'ENUM',
                'constraint' => ['Pending', 'In Progress', 'Completed'],
                'default' => 'Pending',
            ],
            'priority' => [
                'type' => 'ENUM',
                'constraint' => ['Low', 'Medium', 'High'],
                'default' => 'Low',
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'default' => date('Y-m-d H:i:s'),
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'default' => date('Y-m-d H:i:s'),
                'null' => true,
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('tasks', true);
    }

    public function down()
    {
        $this->forge->dropTable('tasks', true);
    }
}
