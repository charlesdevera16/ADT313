<h1>Hands -on Activity </h1>
<?php
$table = array(
    "header" => array(
        "StudentID",
        "FirstName",
        "MiddleName",
        "LastName",
        "Section",
        "Course",
        "Yearlevel"
    ),
    "body" => array(
        array(
            "FirstName" => "FirstName",
            "MiddleName" => "MiddleName",
            "LastName" => "LastName",
            "Section" => "Section",
            "Course" => "Course",
            "Yearlevel" => "Yearlevel"
        ),
        array(
            "FirstName" => "FirstName",
            "MiddleName" => "MiddleName",
            "LastName" => "LastName",
            "Section" => "Section",
            "Course" => "Course",
            "Yearlevel" => "Yearlevel"
        ),
        array(
            "FirstName" => "FirstName",
            "MiddleName" => "MiddleName",
            "LastName" => "LastName",
            "Section" => "Section",
            "Course" => "Course",
            "Yearlevel" => "Yearlevel"
        ),
        array(
            "FirstName" => "FirstName",
            "MiddleName" => "MiddleName",
            "LastName" => "LastName",
            "Section" => "Section",
            "Course" => "Course",
            "Yearlevel" => "Yearlevel"
        ),
        array(
            "FirstName" => "FirstName",
            "MiddleName" => "MiddleName",
            "LastName" => "LastName",
            "Section" => "Section",
            "Course" => "Course",
            "Yearlevel" => "Yearlevel"
        ),
        array(
            "FirstName" => "FirstName",
            "MiddleName" => "MiddleName",
            "LastName" => "LastName",
            "Section" => "Section",
            "Course" => "Course",
            "Yearlevel" => "Yearlevel"
        ),
        array(
            "FirstName" => "FirstName",
            "MiddleName" => "MiddleName",
            "LastName" => "LastName",
            "Section" => "Section",
            "Course" => "Course",
            "Yearlevel" => "Yearlevel"
        ),
        array(
            "FirstName" => "FirstName",
            "MiddleName" => "MiddleName",
            "LastName" => "LastName",
            "Section" => "Section",
            "Course" => "Course",
            "Yearlevel" => "Yearlevel"
        ),
        array(
            "FirstName" => "FirstName",
            "MiddleName" => "MiddleName",
            "LastName" => "LastName",
            "Section" => "Section",
            "Course" => "Course",
            "Yearlevel" => "Yearlevel"
        ),
        array(
            "FirstName" => "FirstName",
            "MiddleName" => "MiddleName",
            "LastName" => "LastName",
            "Section" => "Section",
            "Course" => "Course",
            "Yearlevel" => "Yearlevel"
        )
    )
)  
?>


<table border ="1">
<thead>
    <?php
    for ($i = 0; $i <= count ($table["header"])- 1; $i++){
        echo "<th>" ,$table["header"][$i], "</th>";
    }        
    ?>  
</thead>

   <tbody>
<?php
    for ($i =0; $i <= count ($table["body"])- 1; $i++){
    echo "<tr>";
    echo "<td>", $i, "<?td>";
    echo "<td>", $table["body"][$i]["FirstName"] , "<?td>";
    echo "<td>", $table["body"][$i]["MiddleName"] , "<?td>";
    echo "<td>", $table["body"][$i]["LastName"] , "<?td>";
    echo "<td>", $table["body"][$i]["Section"] , "<?td>";
    echo "<td>", $table["body"][$i]["Course"] , "<?td>";
    echo "<td>", $table["body"][$i]["Yearlevel"] , "<?td>";
    echo "</tr>";
}
    ?>
    </tbody>
</table/>