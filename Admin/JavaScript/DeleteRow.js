function deleteRow(button, rowId) {
    $.ajax({
        type: "POST",
        url: "PHP/DeleteRow.php",
        data: { row_id: rowId },
        success: function (response) {
            if (response === 'success') {
                // Remove the row from the table on success
                $('#row_' + rowId).remove();

                $(button).removeClass("btn btn-danger")
                $(button).addClass("deleted")
            } else {
                alert("Failed to delete the row.")
            }
        },
        error: function () {
            alert("An error occurred while deleting the row.")
        }
    });
}
