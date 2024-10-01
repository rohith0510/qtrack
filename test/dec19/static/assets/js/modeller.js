'use strict';
 
//modeller menus
document.addEventListener('DOMContentLoaded', function () {
    // Function to toggle visibility of content based on menu clicks
    function toggleModellerMenu() {
        // Get references to the menu items
        var modellerdashboardlink = document.getElementById('Modellerdashboardlink');
        var receiveProjectLink = document.getElementById('ReceiveProjectLink');
 
        // Get references to the content sections
        var receiveProjectsFormCard = document.getElementById('receiveProjectsFormCard');
        var modellerDashboardContent = document.getElementById('modellerDashboardContent');
        var statusDetailsContent = document.getElementById('statusDetailsContent');
        // Add event listeners to each menu item
        modellerdashboardlink.addEventListener('click', function () {
            // Show Modeller dashboard content
            modellerDashboardContent.style.display = 'block';
            receiveProjectsFormCard.style.display = 'none';
            statusDetailsContent.style.display = 'none';
 
            // Add active class to clicked menu item
            setActiveMenuLink(modellerdashboardlink);
        });
 
        receiveProjectLink.addEventListener('click', function () {
            // Show receive projects form card
            modellerDashboardContent.style.display = 'none';
            receiveProjectsFormCard.style.display = 'block';
             statusDetailsContent.style.display = 'none';
 
            // Add active class to clicked menu item
            setActiveMenuLink(receiveProjectLink);
        });
    }
 
    // Function to add active class to clicked menu item
    function setActiveMenuLink(activeLink) {
        // Remove active class from all menu items
        var menuLinks = document.querySelectorAll('.menu-link');
        menuLinks.forEach(function (link) {
            link.classList.remove('active-menu-link');
        });
        // Add active class to clicked menu item
        activeLink.classList.add('active-menu-link');
    }
 
    // Call the toggleModellerMenu function to initialize menu functionality
    toggleModellerMenu();
});
 
//display projects
function displayProjects(projects) {
    if (!projects || projects.length === 0) {
        $('#tableContainer').html('<p>No projects assigned.</p>');
        return;
    }
 
    var table = $('<table>').addClass('table table-hover project-table').attr('style', 'width: 100%; border-collapse: collapse;');
    var headerRow = $('<tr>').append(
        $('<th>').text('S.No').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
        $('<th>').text('Project ID').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
        $('<th>').text('Project').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
        $('<th>').text('File').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
		$('<th>').text('Task').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
		$('<th>').text('Checklist').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
		
        $('<th>').text('Modeller').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
        $('<th>').text('Assigned By').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
        $('<th>').text('Date of Assignment').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
		$('<th>').text('Deadline').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
		
        $('<th>').text('Checklist').attr('style', 'padding: 10px; border: 1px solid #ddd;')
    );
    table.append(headerRow);
 
   projects.forEach(function(project, index) {
    var formId = `uploadForm_${project.project_id}`;
    var row = $('<tr>').append(
        $('<td>').text(index + 1).attr('style', 'padding: 10px; border: 1px solid #ddd;'),
        $('<td>').text(project.project_id).attr('style', 'padding: 10px; border: 1px solid #ddd;'),
        $('<td>').text(project.project_name).attr('style', 'padding: 10px; border: 1px solid #ddd;'),
        $('<td>').text(project.file_name).attr('style', 'padding: 10px; border: 1px solid #ddd;'),
        $('<td>').text(project.task_description).attr('style', 'padding: 10px; border: 1px solid #ddd;'),
        $('<td>').html(project.file_checklist ? `<a href="/file_checklist/${encodeURIComponent(getFilenameFromPath(project.file_checklist))}" target="_blank">View Checklist</a>` : 'No file uploaded').css('padding', '10px').css('border', '1px solid #ddd'),
        $('<td>').text(project.modeller).attr('style', 'padding: 10px; border: 1px solid #ddd;'),
        $('<td>').text(project.assigned_by).attr('style', 'padding: 10px; border: 1px solid #ddd;'),
        $('<td>').text(project.date_of_assignment).attr('style', 'padding: 10px; border: 1px solid #ddd;'),
		$('<td>').text(project.deadline).attr('style', 'padding: 10px; border: 1px solid #ddd;'),
        $('<td>').attr('style', 'padding: 10px; border: 1px solid #ddd; white-space: nowrap; overflow-x: auto;').append(
            $('<span>').text(project.checklist || 'No file uploaded'),
            $('<form>').attr('id', formId).attr('enctype', 'multipart/form-data').attr('method', 'POST').attr('action', '/upload_completed_file').append(
                $('<input>').attr('type', 'file').attr('name', 'file').addClass('form-control-file').attr('required', true).attr('style', 'margin-bottom: 5px;'),
                $('<input>').attr('type', 'hidden').attr('name', 'file_name').val(project.file_name),
                $('<input>').attr('type', 'hidden').attr('name', 'project_id').val(project.project_id),
                $('<input>').attr('type', 'hidden').attr('name', 'assigned_by').val(project.assigned_by),
                $('<button>').attr('type', 'submit').addClass('btn btn-primary').text('Upload').attr('style', 'margin-top: 5px;')
            ).on('submit', function(e) {
                e.preventDefault();
                var formData = new FormData(this);

                // Debugging statement
                console.log('Form data before sending:', [...formData.entries()]);

                $.ajax({
                    url: '/upload_completed_file',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        alert(response.message || 'File uploaded successfully');
                        getAssignedProjectsToModeller(); // Refresh the table
                    },
                    error: function(xhr, status, error) {
                        alert('Error: ' + (xhr.responseJSON.error || 'File upload failed'));
                    }
                });
            })
        )
    );
    table.append(row);
});

    $('#tableContainer').html(table);
}
 
function getAssignedProjectsToModeller() {
    $.ajax({
        url: '/get_assigned_projects_to_modeller',
        method: 'GET',
        success: function(data) {
            if (data.projects) {
                displayProjects(data.projects);
            } else {
                $('#tableContainer').html('<p>No projects assigned.</p>');
            }
        },
        error: function(error) {
            console.error('Error fetching projects:', error);
        }
    });
}
 
$(document).ready(function() {
    getAssignedProjectsToModeller();
});
//modeller dashboard
$(document).ready(function() {
    fetchModellerProjects();
    $('#filterInput').on('keyup', filterTable);
    $('#filterDropdown').on('change', filterTable);
});
 function fetchModellerProjects() {
    $.ajax({
        url: '/get_modeller_projects',
        type: 'GET',
        success: function(response) {
            $('#modellerDashboardContent').show();
            displayModellerProjects(response.projects);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching modeller project data:');
            console.error('Status:', status);
            console.error('Error:', error);
            console.error('Response Text:', xhr.responseText);
            $('#ModellerDashboardCardBodyContent').html('<p>Error fetching modeller project data. Please try again later.</p>');
        }
    });
}
 
 
function displayModellerProjects(projects) {
    let ModellerDashboardCardBodyContent = $('#ModellerDashboardCardBodyContent');
    ModellerDashboardCardBodyContent.empty();  // Clear previous content
    console.log('Projects:', projects);  // Debugging line to check the projects array
 
    projects.forEach(function(project) {
        ModellerDashboardCardBodyContent.append(`
<div class="card mb-2 custom-card" data-project-name="${project.ProjectName}">
<div class="card-body">
<p class="project_id project-name">${project.ProjectID} (${project.ProjectName})</p>
<p class="manager-name">Assigned By: ${project.AssignedBy}</p>
<p class="team-leader">Team Leader: ${project.TeamLeader}</p>
<p class="QC">QC: ${project.QCPerson}</p>
</div>
</div>
        `);
    });
 
    $('.custom-card').on('click', function() {
        const projectName = $(this).data('project-name');
        fetchStatusDetails(projectName);
    });
 
    // Make the card body content visible after content has been added
    ModellerDashboardCardBodyContent.show();
}
