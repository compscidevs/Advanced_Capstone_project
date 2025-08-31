<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Swahara Admin Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h1>Agreements List</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Party A Phone</th>
                    <th>Party B Phone</th>
                    <th>Extracted Terms</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($agreements as $agreement)
                    <tr>
                        <td>{{ $agreement->id }}</td>
                        <td>{{ $agreement->party_a_phone }}</td>
                        <td>{{ $agreement->party_b_phone }}</td>
                        <td>{{ json_encode($agreement->extracted_terms) }}</td>
                        <td>{{ $agreement->status }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>
</html>