<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz App</title>
    <link href="node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
    <?php 
    require_once 'db_connection.php';

    try {
        $stmt = $conn->prepare("SELECT * FROM questions");
        $stmt->execute();
        $results = $stmt->fetchAll();

        if (count($results) > 0) {
            foreach ($results as $row) { ?>
                <div> 
                    <h4><?php echo htmlspecialchars($row['question']); ?></h4>
                    <input type="radio" name="<?php echo htmlspecialchars($row['id'])?>" id="<?php echo htmlspecialchars($row['id'])?> " value="A">
                    <label for="<?php echo htmlspecialchars($row['id'])?>"><?php echo htmlspecialchars($row['answer_a'])?></label>

                    <input type="radio" name="<?php echo htmlspecialchars($row['id'])?>" id="<?php echo htmlspecialchars($row['id'])?> " value="B">
                    <label for="<?php echo htmlspecialchars($row['id'])?>"><?php echo htmlspecialchars($row['answer_b'])?></label>

                    <input type="radio" name="<?php echo htmlspecialchars($row['id'])?>" id="<?php echo htmlspecialchars($row['id'])?> " value="C">
                    <label for="<?php echo htmlspecialchars($row['id'])?>"><?php echo htmlspecialchars($row['answer_c'])?></label>
                </div>
        <?php 
            }
        } else {
            echo "No questions found.";
        }
    }
    catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
?>


    </div>
    
<script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>