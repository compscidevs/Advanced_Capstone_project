<?php
session_start();
require_once 'config.php';
require_once 'Program.php';

$program = new Program($conn);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'create':
                $name = $_POST['name'];
                $description = $_POST['description'];
                $nationalAlignment = $_POST['nationalAlignment'];
                $focusAreas = $_POST['focusAreas'];
                $phases = $_POST['phases'];
                $program->create($name, $description, $nationalAlignment, $focusAreas, $phases);
                break;
            case 'update':
                $programId = $_POST['programId'];
                $name = $_POST['name'];
                $description = $_POST['description'];
                $nationalAlignment = $_POST['nationalAlignment'];
                $focusAreas = $_POST['focusAreas'];
                $phases = $_POST['phases'];
                $program->update($programId, $name, $description, $nationalAlignment, $focusAreas, $phases);
                break;
            case 'delete':
                $programId = $_POST['programId'];
                $program->delete($programId);
                break;
        }
    }
}

$programs = $program->readAll();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced Programming Capstone - Programs</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .container {
            margin-top: 20px;
        }
        .table-responsive {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Programs Management</h1>
        <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#programModal">Add Program</button>

        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>National Alignment</th>
                        <th>Focus Areas</th>
                        <th>Phases</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($programs as $prog): ?>
                    <tr>
                        <td><?php echo $prog['ProgramId']; ?></td>
                        <td><?php echo $prog['Name']; ?></td>
                        <td><?php echo $prog['Description']; ?></td>
                        <td><?php echo $prog['NationalAlignment']; ?></td>
                        <td><?php echo $prog['FocusAreas']; ?></td>
                        <td><?php echo $prog['Phases']; ?></td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editProgram(<?php echo $prog['ProgramId']; ?>)">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteProgram(<?php echo $prog['ProgramId']; ?>)">Delete</button>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="programModal" tabindex="-1" aria-labelledby="programModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="programModalLabel">Add/Edit Program</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form method="POST" action="">
                            <input type="hidden" name="action" id="action">
                            <input type="hidden" name="programId" id="programId">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" id="name" name="name" required>
                            </div>
                            <div class="mb-3">
                                <label for="description" class="form-label">Description</label>
                                <textarea class="form-control" id="description" name="description" required></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="nationalAlignment" class="form-label">National Alignment</label>
                                <input type="text" class="form-control" id="nationalAlignment" name="nationalAlignment" required>
                            </div>
                            <div class="mb-3">
                                <label for="focusAreas" class="form-label">Focus Areas</label>
                                <input type="text" class="form-control" id="focusAreas" name="focusAreas" required>
                            </div>
                            <div class="mb-3">
                                <label for="phases" class="form-label">Phases</label>
                                <input type="text" class="form-control" id="phases" name="phases" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        function editProgram(programId) {
            fetch(`api.php?action=read&programId=${programId}`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('programId').value = data.ProgramId;
                    document.getElementById('name').value = data.Name;
                    document.getElementById('description').value = data.Description;
                    document.getElementById('nationalAlignment').value = data.NationalAlignment;
                    document.getElementById('focusAreas').value = data.FocusAreas;
                    document.getElementById('phases').value = data.Phases;
                    document.getElementById('action').value = 'update';
                    new bootstrap.Modal(document.getElementById('programModal')).show();
                });
        }

        function deleteProgram(programId) {
            if (confirm('Are you sure you want to delete this program?')) {
                document.getElementById('programId').value = programId;
                document.getElementById('action').value = 'delete';
                document.querySelector('#programModal form').submit();
            }
        }
    </script>
</body>
</html>