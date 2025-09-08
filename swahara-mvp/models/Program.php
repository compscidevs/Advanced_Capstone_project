<?php
class Program {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create($name, $description, $nationalAlignment, $focusAreas, $phases) {
        $sql = "INSERT INTO Programs (Name, Description, NationalAlignment, FocusAreas, Phases) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$name, $description, $nationalAlignment, $focusAreas, $phases]);
    }

    public function readAll() {
        $sql = "SELECT * FROM Programs";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($programId, $name, $description, $nationalAlignment, $focusAreas, $phases) {
        $sql = "UPDATE Programs SET Name = ?, Description = ?, NationalAlignment = ?, FocusAreas = ?, Phases = ? WHERE ProgramId = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$name, $description, $nationalAlignment, $focusAreas, $phases, $programId]);
    }

    public function delete($programId) {
        $sql = "DELETE FROM Programs WHERE ProgramId = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$programId]);
    }
}
?>