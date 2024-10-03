'use strict';

//menus for Tl:
document.addEventListener('DOMContentLoaded',function()  {
    // Function to toggle visibility of content based on menu clicks

    function toggleTeamleaderMenu() {
        // Get references to the menu items
        var tldashboardlink = document.getElementById('tldashboardlink');
        var receiveProjectsLink = document.getElementById('ReceiveProjectsLink');
        var assignProjectsToModellersLink = document.getElementById('AssignProjectsToModellersLink');
        var receiveFilesLink = document.getElementById('ReceiveFilesLink');
        var submitFilesToQCLink = document.getElementById('SubmitFilesToQCLink');
        var receiveQCReportsLink = document.getElementById('ReceiveQCReportsLink');
        
      


        // Get references to the content sections
        var tlDashboardContent = document.getElementById('tlDashboardContent');
        var receiveProjectsFormContainer = document.getElementById('receiveProjectsFormContainer');
        var assignProjectsToModellersFormContainer = document.getElementById('assignProjectsToModellersFormContainer');
        var receiveCompletedFilesFormContainer = document.getElementById('receiveCompletedFilesFormContainer');
        var submitFilesToQCFormContainer = document.getElementById('submitFilesToQCFormContainer');
        var receiveQCReportsFormContainer = document.getElementById('receiveQCReportsFormContainer');
        var statusDetailsContent = document.getElementById('statusDetailsContent');
        
       
        

// Add event listeners to each menu item
tldashboardlink.addEventListener('click', function () {
    // Show  projects
    tlDashboardContent.style.display = 'block';
    receiveProjectsFormContainer.style.display = 'none';
    assignProjectsToModellersFormContainer.style.display = 'none';
    receiveCompletedFilesFormContainer.style.display = 'none';
    submitFilesToQCFormContainer.style.display = 'none';
    receiveQCReportsFormContainer.style.display = 'none';
    statusDetailsContent.style.display = 'none';
    
    
   


    // Add active class to clicked menu
     setActiveMenuLink(tldashboardlink);

});

        // Add event listeners to each menu item
        receiveProjectsLink.addEventListener('click', function () {
            // Show  projects
            tlDashboardContent.style.display = 'none';
            receiveProjectsFormContainer.style.display = 'block';
            assignProjectsToModellersFormContainer.style.display = 'none';
            receiveCompletedFilesFormContainer.style.display = 'none';
            submitFilesToQCFormContainer.style.display = 'none';
            receiveQCReportsFormContainer.style.display = 'none';
            statusDetailsContent.style.display = 'none';
          


            // Add active class to clicked menu
             setActiveMenuLink(receiveProjectsLink);

        });

        assignProjectsToModellersLink.addEventListener('click',function(){
             // Show  projects
             tlDashboardContent.style.display = 'none';
            receiveProjectsFormContainer.style.display = 'none';
            assignProjectsToModellersFormContainer.style.display = 'block';
            receiveCompletedFilesFormContainer.style.display = 'none';
            submitFilesToQCFormContainer.style.display = 'none';
            receiveQCReportsFormContainer.style.display = 'none';
            statusDetailsContent.style.display = 'none';
           

            // Add active class to clicked menu
             setActiveMenuLink(assignProjectsToModellersLink);
        });

        receiveFilesLink.addEventListener('click',function(){
             // Show  projects
            
             tlDashboardContent.style.display = 'none';
            receiveProjectsFormContainer.style.display = 'none';
            assignProjectsToModellersFormContainer.style.display = 'none';
            receiveCompletedFilesFormContainer.style.display = 'block';
            submitFilesToQCFormContainer.style.display = 'none';
            receiveQCReportsFormContainer.style.display = 'none';
            statusDetailsContent.style.display = 'none';
           

            // Add active class to clicked menu
             setActiveMenuLink(receiveFilesLink);
        });

        submitFilesToQCLink.addEventListener('click',function(){
             // Show  projects
             tlDashboardContent.style.display = 'none';
            receiveProjectsFormContainer.style.display = 'none';
            assignProjectsToModellersFormContainer.style.display = 'none';
            receiveCompletedFilesFormContainer.style.display = 'none';
            submitFilesToQCFormContainer.style.display = 'block';
            receiveQCReportsFormContainer.style.display = 'none';
            statusDetailsContent.style.display = 'none';
         
          
            // Add active class to clicked menu
             setActiveMenuLink(submitFilesToQCLink);
        });

        receiveQCReportsLink.addEventListener('click',function(){
             // Show  projects
             tlDashboardContent.style.display = 'none';
            receiveProjectsFormContainer.style.display = 'none';
            assignProjectsToModellersFormContainer.style.display = 'none';
            receiveCompletedFilesFormContainer.style.display = 'none';
            submitFilesToQCFormContainer.style.display = 'none';
            receiveQCReportsFormContainer.style.display = 'block';
            statusDetailsContent.style.display = 'none';
          

            

            // Add active class to clicked menu
             setActiveMenuLink(receiveQCReportsLink);
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
    toggleTeamleaderMenu();
});

function fetchAssignedProjects() {
    // Make AJAX request to backend endpoint
    fetch('/get_assigned_projects')
        .then(response => response.json())
        .then(data => {
            // Get the table body element
            const tableBody = document.getElementById('projectTableBody');
            // Clear previous content
            tableBody.innerHTML = '';

            if (data.projects.length > 0) {
                // Populate table with project data
                data.projects.forEach((project, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${project.project_id}</td>
                        <td>${project.project_name}</td>
                        <td>${project.date_submission}</td>
                        <td>${project.assigned_by}</td>
                    `;
                    
                    // Add click event listener to each row
                    row.addEventListener('click', function() {
                        selectProjectForAssignment(project.project_id, project.project_name);
                    });

                    tableBody.appendChild(row);
                });
            }
        })
        .catch(error => console.error('Error fetching assigned projects:', error));
}

// Call fetchAssignedProjects() when the page loads
window.addEventListener('load', fetchAssignedProjects);

function selectProjectForAssignment(projectId, projectName) {
    // Show the Assign Projects to Modellers form container
    const assignProjectsToModellersFormContainer = document.getElementById('assignProjectsToModellersFormContainer');
    assignProjectsToModellersFormContainer.style.display = 'block';
    
    // Populate the Project ID and Project Name dropdowns
    const projectIdDropdown = document.getElementById('ProjectID');
    const projectNameDropdown = document.getElementById('ProjectName');
    
    // Clear existing options and set the selected project
    projectIdDropdown.innerHTML = `<option value="${projectId}" selected>${projectId}</option>`;
    projectNameDropdown.innerHTML = `<option value="${projectName}" selected>${projectName}</option>`;
    
  

    // Open the link directly if it is a separate section or modal
    const assignProjectsToModellersLink = document.getElementById('AssignProjectsToModellersLink');
    assignProjectsToModellersLink.click(); // This simulates a click on the link
}



document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('assignProjectsToModellersForm').addEventListener('submit', assignProjectToModeller);
});

function assignProjectToModeller(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append('ProjectID', document.getElementById('ProjectID').value);
    formData.append('ProjectName', document.getElementById('ProjectName').value);
    formData.append('fileName', document.getElementById('fileName').value);
    formData.append('task_description', document.getElementById('task_description').value);
    formData.append('file_checklist', document.getElementById('file_checklist').files[0]); // Add the file object
    formData.append('modeller', document.getElementById('modeller').value);
	formData.append('deadline', document.getElementById('deadline').value);
	
    formData.append('projectStatus', document.getElementById('projectStatus').value);

    // Log formData entries before sending
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }

    // Make a POST request to the Flask route
    fetch('/assign_project_to_modeller', {
        method: 'POST',
        body: formData // Send the FormData object directly
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response Data:", data); // Log the response data
        if (data.error) {
            alert('Error: ' + data.error); // Alert if there is an error
        } else {
            alert(data.message); // Alert the success message
            // Optionally, reset the form
            document.getElementById('assignProjectsToModellersForm').reset();
        }
    })
    .catch(error => {
        console.error('Error:', error); // Log any errors
    });
}


// Attach form submission event listener
document.getElementById('assignProjectsToModellersForm').addEventListener('submit', assignProjectToModeller);



// Function to fetch assigned projects and populate the table
fetch('/fetch_assigned_projects')
.then(response => response.json())
.then(data => {
    const tableBody = document.querySelector('#assignedProjectsTable tbody');
    tableBody.innerHTML = '';

    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.project_id}</td>
            <td>${row.project_name}</td>
            <td class="wrap-text">${row.file_name}</td>
			<td>${row.task_description}</td>
			
			
            <td>${row.modeller}</td>
			
			
            <td>${row.assigned_by}</td>
            <td>${row.status}</td>
            <td>${row.date_of_assignment}</td>
			<td>${row.deadline}</td>
        `;
        tableBody.appendChild(tr);
    });
})
.catch(error => console.error('Error fetching data:', error));



//modeller submited projects
document.getElementById('ReceiveFilesLink').addEventListener('click', function() {
    fetch('/get_submitted_projects')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const projectsContainer = document.getElementById('submittedProjectsContainer');
            projectsContainer.innerHTML = ''; // Clear any existing content

            if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
                const table = $('<table>').addClass('table table-hover project-table').css('width', '100%').css('border-collapse', 'collapse');

                // Create and append table header
                const headerRow = $('<tr>').append(
                    $('<th>').text('S.No').css('padding', '10px').css('border', '1px solid #ddd'),
                    $('<th>').text('Project ID').css('padding', '10px').css('border', '1px solid #ddd'),
                    $('<th>').text('Project Title').css('padding', '10px').css('border', '1px solid #ddd'),
                    $('<th>').text('File Name').css('padding', '10px').css('border', '1px solid #ddd'),
					$('<th>').text('Task Description').css('padding', '10px').css('border', '1px solid #ddd'),
                    $('<th>').text('Modeller Name').css('padding', '10px').css('border', '1px solid #ddd'),
                    $('<th>').text('Assigned By').css('padding', '10px').css('border', '1px solid #ddd'),
                    $('<th>').text('Date of Assignment').css('padding', '10px').css('border', '1px solid #ddd'),
                    $('<th>').text('Checklist').css('padding', '10px').css('border', '1px solid #ddd')
                );
                table.append($('<thead>').append(headerRow));

                // Create and append table body
                const tbody = $('<tbody>');
                data.projects.forEach((project, index) => {
                    const row = $('<tr>').append(
                        $('<td>').text(index + 1).css('padding', '10px').css('border', '1px solid #ddd'),
                        $('<td>').text(project.project_id).css('padding', '10px').css('border', '1px solid #ddd'),
                        $('<td>').text(project.project_name).css('padding', '10px').css('border', '1px solid #ddd'),
                        $('<td>').text(project.file_name).css('padding', '10px').css('border', '1px solid #ddd'),
						$('<td>').text(project.task_description).css('padding', '10px').css('border', '1px solid #ddd'),
                        $('<td>').text(project.modeller).css('padding', '10px').css('border', '1px solid #ddd'),
                        $('<td>').text(project.assigned_by).css('padding', '10px').css('border', '1px solid #ddd'),
                        $('<td>').text(project.date_of_assignment).css('padding', '10px').css('border', '1px solid #ddd'),
                        $('<td>').html(project.checklist ? `<a href="/checklist/${encodeURIComponent(getFilenameFromPath(project.checklist))}" target="_blank">View Checklist</a>` : 'No file uploaded').css('padding', '10px').css('border', '1px solid #ddd')

                    );
                    tbody.append(row);
                });
                table.append(tbody);

                // Append table to container
                $(projectsContainer).append(table);
            } else {
                projectsContainer.innerHTML = `<p>${data.message || 'No projects available.'}</p>`;
            }

            document.getElementById('receiveCompletedFilesFormContainer').style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('submittedProjectsContainer').innerHTML = `<p>Error fetching submitted projects: ${error.message}</p>`;
            document.getElementById('receiveCompletedFilesFormContainer').style.display = 'block';
        });
});

// Function to extract filename from the full path
function getFilenameFromPath(path) {
    return path.split(/[/\\]/).pop(); // Split by both / and \ to handle different path formats
}




// Function to submit form data to the server
document.getElementById('submitFilesToQCForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    submitfilestoqc(event); // Call your function with the event object
});
function submitfilestoqc(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(event.target);

    fetch('/submit_files_to_qc', {
        method: 'POST',
        body: formData // Use FormData directly
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
        } else if (data.error) {
            alert(`Error: ${data.error}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
}



//fetch qc files
$(document).ready(function() {
    fetchQCReports();
});

function fetchQCReports() {
    $.ajax({
        url: '/api/qc_reports',
        type: 'GET',
        success: function(response) {
            displayQCReports(response.files);
        },
        error: function(error) {
            console.error('Error fetching QC reports:', error);
            $('#qcReportsTableContainer').html('<p>Error fetching QC reports. Please try again later.</p>');
        }
    });
}

function displayQCReports(files) {
    if (files.length > 0) {
        var table = $('<table>').addClass('table table-striped');
        var thead = $('<thead>').append(
            $('<tr>').append(
                $('<th>').text('Select').addClass('table-header').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
                $('<th>').text('S.No').addClass('table-header').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
                $('<th>').text('Project_ID').addClass('table-header').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
                $('<th>').text('Project').addClass('table-header').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
                $('<th>').text('File').addClass('table-header').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
				$('<th>').text('Task Description').addClass('table-header').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
                $('<th>').text('Modeller').addClass('table-header').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
                $('<th>').text('QC_Person').addClass('table-header').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
                $('<th>').text('Assigned_By').addClass('table-header').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
				$('<th>').text('manager').addClass('table-header').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
				
                $('<th>').text('Additional_Notes').addClass('table-header').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
                $('<th>').text('Score').addClass('table-header').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
                $('<th>').text('QC_REVIEW').addClass('table-header').attr('style', 'padding: 10px; border: 1px solid #ddd;'),
                $('<th>').text('Upload File').addClass('table-header').attr('style', 'padding: 10px; border: 1px solid #ddd;')
            )
        );
        var tbody = $('<tbody>');

        files.forEach(function(file, index) {
			
            var scoreColorClass = file.score < 90 ? 'below-90' : 'above-90';

            var row = $('<tr>').append(
                $('<td>').html('<input type="checkbox" class="project-checkbox">').css({'text-align': 'center', 'vertical-align': 'middle', 'padding': '10px', 'border': '1px solid #ddd'}),
                $('<td>').text(index + 1).css({'text-align': 'center', 'vertical-align': 'middle', 'padding': '10px', 'border': '1px solid #ddd'}),
                $('<td>').text(file.proj_id).css({'text-align': 'center', 'vertical-align': 'middle', 'padding': '10px', 'border': '1px solid #ddd'}),
                $('<td>').text(file.project).css({'text-align': 'center', 'vertical-align': 'middle', 'padding': '10px', 'border': '1px solid #ddd'}),
                $('<td>').text(file.file).css({'text-align': 'center', 'vertical-align': 'middle', 'padding': '10px', 'border': '1px solid #ddd'}),
				$('<td>').text(file.task_description).css({'text-align': 'center', 'vertical-align': 'middle', 'padding': '10px', 'border': '1px solid #ddd'}),
                $('<td>').text(file.submitted_modeller).css({'text-align': 'center', 'vertical-align': 'middle', 'padding': '10px', 'border': '1px solid #ddd'}),
                $('<td>').text(file.qc_person).css({'text-align': 'center', 'vertical-align': 'middle', 'padding': '10px', 'border': '1px solid #ddd'}),
                $('<td>').text(file.assigned_by).css({'text-align': 'center', 'vertical-align': 'middle', 'padding': '10px', 'border': '1px solid #ddd'}),
				$('<td>').text(file.manager).css({'text-align': 'center', 'vertical-align': 'middle', 'padding': '10px', 'border': '1px solid #ddd'}),
                $('<td>').text(file.additional_notes).css({'text-align': 'center', 'vertical-align': 'middle', 'padding': '10px', 'border': '1px solid #ddd'}),
                $('<td>').text(file.score).addClass('score-cell ' + scoreColorClass).css({'text-align': 'center', 'vertical-align': 'middle', 'padding': '10px', 'border': '1px solid #ddd'}),
                $('<td>').text(file.QC_REVIEW).css({'text-align': 'center', 'vertical-align': 'middle', 'padding': '10px', 'border': '1px solid #ddd'}),
                $('<td>').html(file.upload_photo ? `<a href="/checklist/${encodeURIComponent(getFilenameFromPath(file.upload_photo))}" target="_blank">View File</a>` : 'No file uploaded').css('padding', '10px').css('border', '1px solid #ddd')
				
            );
            tbody.append(row);
        });

        table.append(thead).append(tbody);
        var tableContainer = $('<div>').css({
            'max-height': '400px', // Set maximum height here
            'overflow-y': 'auto'    // Add vertical scrollbar
        }).append(table);

        $('#qcReportsTableContainer').html(tableContainer);
    } else {
        $('#qcReportsTableContainer').html('<p>No QC reports found.</p>');
    }
}
// Function to extract filename from the full path
function getFilenameFromPath(path) {
    return path.split(/[/\\]/).pop(); // Split by both / and \ to handle different path formats
}

function submitHighScoreQCReports() {
    var selectedFiles = [];

    // Collect file details from selected checkboxes, filtering out scores below 90
    $('#qcReportsTableContainer table tbody tr').each(function() {
        var row = $(this);
        var checkbox = row.find('.project-checkbox');
        if (checkbox.prop('checked')) {
            var score = parseInt(row.find('td:eq(11)').text()); // Adjust index based on your table structure
            if (score > 90) {
                var fileDetails = {
                    proj_id: row.find('td:eq(2)').text(),
                    project: row.find('td:eq(3)').text(),
                    file: row.find('td:eq(4)').text(),
					task_description:row.find('td:eq(5)').text(),
                    submitted_modeller: row.find('td:eq(6)').text(),
                    qc_person: row.find('td:eq(7)').text(),
                    assigned_by: row.find('td:eq(8)').text(),
					manager: row.find('td:eq(9)').text(),

                    additional_notes: row.find('td:eq(10)').text(),
                    score: row.find('td:eq(11)').text(),
                    qc_review: row.find('td:eq(12)').text(),
                    upload_photo: row.find('td:eq(13)').text()
                };
                selectedFiles.push(fileDetails);
            }
        }
    });

    if (selectedFiles.length === 0) {
        alert('No files with a score above 90 selected to submit.');
        return;
    }

    $.ajax({
        url: '/submit_qc_report', // Backend route to handle submission
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            files: selectedFiles
        }),
        success: function(response) {
            alert('QC files with score above 90 successfully submitted to manager!');
            // Additional actions on success (e.g., clear form, update UI)
        },
        error: function(error) {
            console.error('Error submitting QC files to manager:', error);
            alert('Error submitting QC files. Please try again later.');
        }
    });
}
//tl dashboard
$(document).ready(function() {
    fetchTLProjects();
    $('#filterInput').on('keyup', filterTable);
    $('#sortDropdown').on('change', sortTable);
});

function fetchTLProjects() {
    $.ajax({
        url: '/get_tl_projects',
        type: 'GET',
        success: function(response) {
            $('#tlDashboardContent').show();
            displayTLProjects(response.projects);
        },
        error: function(error) {
            console.error('Error fetching TL project data:', error);
            $('#tlDashboardCardBodyContent').html('<p>Error fetching TL project data. Please try again later.</p>');
        }
    });
}

function displayTLProjects(projects) {
    let tlDashboardCardBodyContent = $('#tlDashboardCardBodyContent');
    tlDashboardCardBodyContent.empty();

    if (projects.length === 0) {
        tlDashboardCardBodyContent.append('<p>No projects available.</p>');
    } else {
        projects.forEach(function(project) {
            tlDashboardCardBodyContent.append(`
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
    }
}



 
    // Trigger change event to set the initial state
function trimFileName() {
    var fileNameInput = document.getElementById('fileName');//trim filename
    fileNameInput.value = fileNameInput.value.trim();
}



//submit qc files get from project table
$(document).ready(function() {
    $.ajax({
        url: '/get-project-id',
        method: 'GET',
        success: function(data) {
            var $select = $('#proj_ID');
            $select.empty(); // Clear existing options
            $select.append($('<option>').val('').text('Select Project')); // Add a default option
            $.each(data, function(index, project) {
                $select.append($('<option>').val(project.project_id).text(project.project_id));
            });
        }
    });
});

function fetchManager(projID) {
    console.log('Fetching details for project ID:', projID); // Debug log

    if (!projID) return;

    $.ajax({
        url: '/get-manager',
        type: 'POST',
        data: { proj_ID: projID },
        success: function(response) {
            console.log('Success response:', response); // Debug log
            const projectNameSelect = $('#project');
            const managerSelect = $('#manager');
            projectNameSelect.empty(); // Clear previous options
            managerSelect.empty(); // Clear previous options

            if (response.project_name && response.manager_name) {
                projectNameSelect.append(`<option value="${response.project_name}">${response.project_name}</option>`);
                managerSelect.append(`<option value="${response.manager_name}">${response.manager_name}</option>`);
            } else {
                projectNameSelect.append('<option value="" disabled>No Project Found</option>');
                managerSelect.append('<option value="" disabled>No Manager Found</option>');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', status, error); // Debug log
            alert('Failed to fetch project details.');
        }
    });
}
$(document).ready(function() {
    var projectMapping = {};

    $.ajax({
        url: '/get-tlassignproject-ids',
        method: 'GET',
        success: function(response) {
            if (response.projects && response.projects.length > 0) {
                var select = $('#ProjectID');
                select.empty();  // Clear existing options
                select.append('<option value="">Select Project</option>');  // Add default option
                
                response.projects.forEach(function(project) {
                    select.append('<option value="' + project.id + '">' + project.id + '</option>');
                    projectMapping[project.id] = project.name;
                });
            } else {
                console.error('No project IDs found');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error fetching project IDs:', error);
        }
    });

    $('#ProjectID').on('change', function() {  // Corrected ID selector here
        var selectedProjectId = $(this).val();
        if (selectedProjectId in projectMapping) {
            $('#ProjectName').empty();
            $('#ProjectName').append('<option value="' + projectMapping[selectedProjectId] + '">' + projectMapping[selectedProjectId] + '</option>');
        } else {
            $('#ProjectName').empty();
            $('#ProjectName').append('<option value="">Select Project Name</option>');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('modeller');

    // Add the default "Select Modeller" option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select Modeller';
    defaultOption.disabled = true;  // Make it unselectable
    defaultOption.selected = true;  // Make it the default selected option
    select.appendChild(defaultOption);

    // Fetch the modellers data and populate the dropdown
    fetch('/Modellers')
        .then(response => response.json())
        .then(data => {
            data.forEach(modeller => {
                const option = document.createElement('option');
                option.value = modeller.first_name;  // Assuming first_name is unique
                option.textContent = modeller.first_name;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching modellers:', error));
});

	
document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('smodeller');

    // Add the default "Select Modeller" option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select Modeller';
    defaultOption.disabled = true;  // Make it unselectable
    defaultOption.selected = true;  // Show it as the default selected option
    select.appendChild(defaultOption);

    // Fetch the modellers data and populate the dropdown
    fetch('/SubmitModellers')
        .then(response => response.json())
        .then(data => {
            data.forEach(modeller => {
                const option = document.createElement('option');
                option.value = modeller.first_name;  // Unique ID as the value
                option.textContent = modeller.first_name;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching modellers:', error));
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('/get-qc-persons')
        .then(response => response.json())
        .then(data => {
            const qcPersonSelect = document.getElementById('qc_person');
            qcPersonSelect.innerHTML = '<option value="" selected disabled>Select QC Person</option>'; // Placeholder option
            data.forEach(person => {
                const option = document.createElement('option');
                option.value = person.first_name;
                option.textContent = person.first_name;
                qcPersonSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching QC persons:', error));
});


document.addEventListener('DOMContentLoaded', function() {
        var today = new Date();
        today.setDate(today.getDate()); // Add 1 day to today (making it tomorrow)
        var tomorrow = today.toISOString().split('T')[0]; // Format it as YYYY-MM-DD
        document.getElementById('deadline').setAttribute('min', tomorrow); // Set the minimum selectable date
    });
 function setDefaultDateTime() {
            const now = new Date();
            const defaultTime = '23:00'; // Default time set to 23:00:00
            const defaultDateTime = now.toISOString().split('T')[0] + 'T' + defaultTime;
            document.getElementById('deadline').value = defaultDateTime;
        }

        // Call the function when the page loads
        window.onload = setDefaultDateTime;	
	