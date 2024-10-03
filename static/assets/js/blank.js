'use strict';
//manager menus:
document.addEventListener('DOMContentLoaded', function() {
    // Function to toggle visibility of content based on menu clicks
    function toggleManagerMenu() {
        // Get references to the menu items
        var managerdashboardlink = document.getElementById('Managerdashboardlink');
        var assignprojectslink = document.getElementById('Assignprojectslink');
        var QCreportslink = document.getElementById('QCreportslink');
        var userListLink=document.getElementById('userListLink');
        var viewsLink=document.getElementById('viewslink');
 
 
        // Get references to the content sections
        var ManagerDashboardContent = document.getElementById('ManagerDashboardContent');
        var AssignProjectsContent = document.getElementById('AssignProjectsContent');
        var QCcontent = document.getElementById('QCcontent');
        var statusDetailsContent = document.getElementById('statusDetailsContent');
        var userDetailsContent=document.getElementById('userDetailsContent');
        var viewsContent=document.getElementById('viewsContent');
       
       
 
        // Add event listeners to each menu item
        managerdashboardlink.addEventListener('click', function() {
            // Show dashboard content, hide others
            ManagerDashboardContent.style.display = 'block';
            AssignProjectsContent.style.display = 'none';
            QCcontent.style.display = 'none';
         
         
            // Add active class to clicked menu item
            setActiveMenuLink(managerdashboardlink);
        });
 
        assignprojectslink.addEventListener('click', function() {
            // Show assign projects content, hide others
            ManagerDashboardContent.style.display = 'none';
            AssignProjectsContent.style.display = 'block';
            QCcontent.style.display = 'none';
            statusDetailsContent.style.display = 'none';
           
            // Add active class to clicked menu item
            setActiveMenuLink(assignprojectslink);
        });
 
        QCreportslink.addEventListener('click', function() {
            // Show QC reports content, hide others
            ManagerDashboardContent.style.display = 'none';
            AssignProjectsContent.style.display = 'none';
            QCcontent.style.display = 'block';
            statusDetailsContent.style.display = 'none';
           
            // Add active class to clicked menu item
            setActiveMenuLink(QCreportslink);
        });
        userListLink.addEventListener('click',function(){
            ManagerDashboardContent.style.display = 'none';
            AssignProjectsContent.style.display = 'none';
            userDetailsContent.style.display = 'block';
            statusDetailsContent.style.display = 'none';
            viewsContent.style.display = 'none';
            QCcontent.style.display = 'none';
            setActiveMenuLink( userListLink);
           
        });
           viewsLink.addEventListener('click',function(){
            ManagerDashboardContent.style.display = 'none';
            AssignProjectsContent.style.display = 'none';
            userDetailsContent.style.display = 'none';
            statusDetailsContent.style.display = 'none';
            viewsContent.style.display = 'block';
            QCcontent.style.display = 'none';
            setActiveMenuLink( viewsLink);
           
        });
 
        // Function to add active class to clicked menu item
        function setActiveMenuLink(activeLink) {
            // Remove active class from all menu items
            var menuLinks = document.querySelectorAll('.menu-link');
            menuLinks.forEach(function(link) {
                link.classList.remove('active-menu-link');
            });
            // Add active class to clicked menu item
            activeLink.classList.add('active-menu-link');
        }
    }
 
    // Call the toggleManagerMenu function to initialize menu functionality
    toggleManagerMenu();
});
 
 
 
$(document).ready(function() {
    // Fetch team leaders when the page loads
    fetchTeamLeaders();
 
    // Handle button click for assigning projects
    $('#assignButton').on('click', function(event) {
        event.preventDefault(); // Prevent default form submission
 
        // Get form data
        var formData = {
            projectID: $('#projectID').val(),
            projectName: $('#projectName').val(),
            teamLeader: $('#TeamLeader option:selected').text(), // Send name instead of user_id
            status: $('#Status').val(),
            assignedBy: $('#assignedBy').val()
        };
 
        // Log form data for debugging (optional)
        console.log('Form Data:', formData);
 
        // Validate form data
        if (!formData.projectName) {
            alert('Project Name is required!');
            return; // Exit if project name is empty
        }
 
        // Submit AJAX POST request
        $.ajax({
            type: 'POST',
            url: '/assign_projects',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                // Handle successful response
                console.log('Success:', response.message);
                $('#assignProjectsForm')[0].reset(); // Reset form fields
                fetchProjectDetails(); // Fetch updated project details
                // Display success message
                alert('Project details saved successfully!');
            },
            error: function(xhr, status, error) {
                // Handle error response
                console.error('Error:', error);
                alert('An error occurred while saving project details.');
            }
        });
    });
 
    // Fetch project details when the page loads
    fetchProjectDetails();
});
 
// Function to fetch team leaders and populate the dropdown
function fetchTeamLeaders() {
    $.ajax({
        type: 'GET',
        url: '/get_team_leaders', // Ensure this matches the route in your backend
        success: function(response) {
            var teamLeaderDropdown = $('#TeamLeader');
            teamLeaderDropdown.empty(); // Clear any existing options
            
            // Add the default "Select Team Leader" option
            teamLeaderDropdown.append(
                $('<option>', {
                    value: '',
                    text: 'Select Team Leader',
                    disabled: true,
                    selected: true
                })
            );

            // Loop through the response and create option elements
            $.each(response, function(index, leader) {
                teamLeaderDropdown.append(
                    $('<option>', {
                        value: leader.user_id,
                        text: leader.first_name
                    })
                );
            });
        },
        error: function(xhr, status, error) {
            console.error('Error fetching team leaders:', error);
            alert('An error occurred while fetching team leaders.');
        }
    });
}

 
/////
 
function fetchProjectDetails() {
    fetch('/get_project_details')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('projectDetails');
            tableBody.innerHTML = '';
 
            data.projects.forEach((project, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${project.project_id}</td>
                    <td>${project.project_name}</td>
                    <td>${project.team_leader}</td>
                    <td>${project.date_submission}</td>
                    <td>${project.status}</td>
                    <td>${project.assigned_by}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching project details:', error);
        });
}
 
 
 
//Display qc reports data.
$(document).ready(function() {
    fetchReportsData();
});
 
function fetchReportsData() {
    $.ajax({
        url: '/api/reports_data',
        type: 'GET',
        success: function(response) {
            displayReportsData(response.reports);
        },
        error: function(error) {
            console.error('Error fetching QC reports:', error);
            $('#reporttableContainer').html('<p>Error fetching QC reports. Please try again later.</p>');
        }
    });
}
 
function displayReportsData(reports) {
    if (reports.length > 0) {
        var table = $('<table>').addClass('table table-striped');
        var thead = $('<thead>').append(
            $('<tr>').append(
                $('<th>').text('S.No').addClass('table-header'),
                $('<th>').text('Project_ID').addClass('table-header'),
                $('<th>').text('Project').addClass('table-header'),
                $('<th>').text('File').addClass('table-header'),
                $('<th>').text('Modeller').addClass('table-header'),
                $('<th>').text('QC_Person').addClass('table-header'),
                $('<th>').text('Assigned_By').addClass('table-header'),
                $('<th>').text('manager').addClass('table-header'),
                $('<th>').text('Additional_Notes').addClass('table-header'),
                $('<th>').text('Score').addClass('table-header'),
                $('<th>').text('QC_Review').addClass('table-header'),
                $('<th>').text('Status').addClass('table-header'),
                $('<th>').text('Date_of_completion').addClass('table-header')
               
            )
        );
        var tbody = $('<tbody>');
 
        reports.forEach(function(report, index) {
            var scoreColorClass = report.score < 90 ? 'below-90' : 'above-90';
 
            var row = $('<tr>').append(
                $('<td>').text(index + 1).addClass('table-header'),
                $('<td>').text(report.proj_id).addClass('table-header'),
                $('<td>').text(report.project).addClass('table-header'),
                $('<td>').text(report.file).addClass('table-header'),
                $('<td>').text(report.submitted_modeller).addClass('table-header'),
                $('<td>').text(report.qc_person).addClass('table-header'),
                $('<td>').text(report.assigned_by).addClass('table-header'),
                $('<td>').text(report.manager).addClass('table-header'),
                $('<td>').text(report.additional_notes).addClass('table-header'),
                $('<td>').text(report.score).addClass('score-cell ' + scoreColorClass).addClass('table-header'),
                $('<td>').text(report.qc_review).addClass('table-header'),
                $('<td>').text(report.status).addClass('table-header'),
                $('<td>').text(report.date_of_completion).addClass('table-header')
            );
            tbody.append(row);
        });
 
        table.append(thead).append(tbody);
        var tableContainer = $('<div>').css({
            'max-height': '400px',
            'overflow-y': 'auto'
        }).append(table);
 
        $('#reporttableContainer').html(tableContainer);
          // Ensure the correct ID is used
    } else {
        $('#reporttableContainer').html('<p>No QC reports found.</p>');
    }
}
 
 
 
//manager dashboard
$(document).ready(function() {
    fetchDistinctProjects();
    $('#filterInput').on('keyup', filterTable);
    $('#sortDropdown').on('change', sortTable);
});
 
function fetchDistinctProjects() {
    $.ajax({
        url: '/get_distinct_projects',
        type: 'GET',
        success: function(response) {
            $('#DashboardContent').show();
            displayDistinctProjects(response.projects);
        },
        error: function(error) {
            console.error('Error fetching project data:', error);
            $('#dashboardCardBody').html('<p>Error fetching project data. Please try again later.</p>');
        }
    });
}
 
function displayDistinctProjects(projects) {
    let dashboardCardBody = $('#dashboardCardBody');
    dashboardCardBody.empty(); // Clear any existing content
 
    if (projects.length === 0) {
        dashboardCardBody.append('<p>No projects available.</p>');
    } else {
        projects.forEach(function(project) {
            dashboardCardBody.append(`
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
 
        // Add click event to cards
        $('.custom-card').on('click', function() {
            const projectName = $(this).data('project-name');
            fetchStatusDetails(projectName);
        });
    }
}
 
function filterTable() {
    let filterValue = $('#filterInput').val().toLowerCase();
 
    $('#statusDetails tr').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(filterValue) > -1);
    });
}
 
function sortTable() {
    let sortValue = $('#sortDropdown').val();
    let rows = $('#statusDetails tr').get();
 
    rows.sort(function(a, b) {
        let aValue, bValue;
 
        switch (sortValue) {
            case 'DateAssignedAsc':
                aValue = new Date($(a).find('td:nth-child(4)').text());
                bValue = new Date($(b).find('td:nth-child(4)').text());
                return aValue - bValue;
            case 'DateAssignedDesc':
                aValue = new Date($(a).find('td:nth-child(4)').text());
                bValue = new Date($(b).find('td:nth-child(4)').text());
                return bValue - aValue;
            case 'SubmissionDateAsc':
                aValue = new Date($(a).find('td:nth-child(5)').text());
                bValue = new Date($(b).find('td:nth-child(5)').text());
                return aValue - bValue;
            case 'SubmissionDateDesc':
                aValue = new Date($(a).find('td:nth-child(5)').text());
                bValue = new Date($(b).find('td:nth-child(5)').text());
                return bValue - aValue;
            case 'CompletionDateAsc':
                aValue = new Date($(a).find('td:nth-child(6)').text());
                bValue = new Date($(b).find('td:nth-child(6)').text());
                return aValue - bValue;
            case 'CompletionDateDesc':
                aValue = new Date($(a).find('td:nth-child(6)').text());
                bValue = new Date($(b).find('td:nth-child(6)').text());
                return bValue - aValue;
            case 'ScoreLessThan90':
                return $(a).find('td:nth-child(7)').text() < 90 ? -1 : 1;
            case 'ScoreGreaterThan90':
                return $(a).find('td:nth-child(7)').text() > 90 ? -1 : 1;
            default:
                return 0;
        }
    });
 
    // Append sorted rows to the table body
    $.each(rows, function(index, row) {
        $('#statusDetails').append(row);
    });
}
 
function fetchStatusDetails(projectName) {
    $.ajax({
        url: `/get_status_details/${projectName}`,
        type: 'GET',
        success: function(response) {
            displayStatusDetails(projectName, response.details);
        },
        error: function(error) {
            console.error('Error fetching project details:', error);
            $('#statusDetails').html('<p>Error fetching project details. Please try again later.</p>');
        }
    });
}
 
function displayStatusDetails(projectName, details) {
    let statusDetails = $('#statusDetails');
    statusDetails.empty(); // Clear any existing content
 
    // Set the project name in the card header
    $('#projectName').text(projectName);
 
    if (details.length === 0) {
        statusDetails.append('<tr><td colspan="9">No project details available.</td></tr>');
    } else {
        details.forEach(function(detail) {
            statusDetails.append(`
                <tr>
                    <td>${detail.ProjectName}</td>
                    <td>${detail.Modeller}</td>
                    <td class="wrap-text">${detail.Filename}</td>
                    <td>${detail.Status}</td>
                    <td>${detail.DateAssigned}</td>
                    <td>${detail.SubmissionDate}</td>
                    <td>${detail.CompletionDate}</td>
					<td>${detail.Deadline}</td>
                    <td>${detail.Score}</td>
                    
                </tr>
            `);
        });
    }
 
    // Show the project details section
    $('#statusDetailsContent').show();
    $('#dashboardCardBody').show();
}
 
 
 

$(document).ready(function() {
    var projectMapping = {};

    $.ajax({
        url: '/get-project-ids',
        method: 'GET',
        success: function(response) {
            if (response.projects && response.projects.length > 0) {
                var select = $('#projectID');
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

    $('#projectID').on('change', function() {
        var selectedProjectId = $(this).val();
        if (selectedProjectId in projectMapping) {
            $('#projectName').empty();
            $('#projectName').append('<option value="' + projectMapping[selectedProjectId] + '">' + projectMapping[selectedProjectId] + '</option>');
        } else {
            $('#projectName').empty();
            $('#projectName').append('<option value="">Select Project Name</option>');
        }
    });
});








