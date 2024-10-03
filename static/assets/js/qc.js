'use strict';

// Function to toggle visibility of content based on menu clicks
document.addEventListener('DOMContentLoaded', function() {
    // Function to toggle visibility of content based on menu clicks
    function toggleQCmenu() {
        var qcdashboardlink = document.getElementById('qcdashboardlink');
        var fileReceptionlink = document.getElementById('FileReceptionlink');
        
        // Get references to the content sections
        var fileReceptionCard = document.getElementById('fileReceptionCard');
        var qcDashboardContent = document.getElementById('qcDashboardContent');
        var statusDetailsContent = document.getElementById('statusDetailsContent');
       
        
        // Add event listeners to each menu item
        qcdashboardlink.addEventListener('click', function() {
            qcDashboardContent.style.display = 'block';
            fileReceptionCard.style.display = 'none';
            statusDetailsContent.style.display = 'none';
           
            setActiveMenuLink(qcdashboardlink);
        });

        fileReceptionlink.addEventListener('click', function() {
            fileReceptionCard.style.display = 'block';
            qcDashboardContent.style.display = 'none';
            statusDetailsContent.style.display = 'none';
           
            fetchQCFiles();
            setActiveMenuLink(fileReceptionlink);
        });
    }

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

    // Function to fetch QC files
     // Function to fetch QC files
     function fetchQCFiles() {
        fetch('/get_qc_files')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const projectsContainer = document.getElementById('QCProjectsContainer');
                projectsContainer.innerHTML = ''; // Clear any existing content
    
                if (data.files && data.files.length > 0) {
                    const table = document.createElement('table');
                    table.classList.add('table', 'table-hover', 'project-table');
                    table.style.width = '100%';
                    table.style.borderCollapse = 'collapse';
    
                    // Create table header row
                    const headerRow = document.createElement('tr');
                    headerRow.innerHTML = `
                        <th style="padding: 5px; border: 1px solid #ddd;">S.No</th>
                        <th style="padding: 5px; border: 1px solid #ddd;">proj_id</th>
                        <th style="padding: 5px; border: 1px solid #ddd;">project</th>
                        <th style="padding: 5px; border: 1px solid #ddd;">file</th>
						<th style="padding: 5px; border: 1px solid #ddd;">Task Description</th>
                        <th style="padding: 5px; border: 1px solid #ddd;">Upload</th>
                        <th style="padding: 5px; border: 1px solid #ddd;">submitted_modeller</th>
                        <th style="padding: 5px; border: 1px solid #ddd;">Assigned_by</th>
                        <th style="padding: 5px; border: 1px solid #ddd;">additional_notes</th>
                        <th style="padding: 5px; border: 1px solid #ddd;">Score</th>
                        <th style="padding: 5px; border: 1px solid #ddd;">QC Review</th>
                        <th style="padding: 5px; border: 1px solid #ddd;">Actions</th>
                        <th style="padding: 5px; border: 1px solid #ddd;">Uploads</th>
                    `;
                    table.appendChild(headerRow);
    
                    // Create table body rows
                    data.files.forEach((file, index) => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td style="padding: 5px; border: 1px solid #ddd;">${index + 1}</td>
                            <td style="padding: 5px; border: 1px solid #ddd;">${file.proj_id}</td>
                            <td style="padding: 5px; border: 1px solid #ddd;">${file.project}</td>
                            <td style="padding: 5px; border: 1px solid #ddd;">${file.file}</td>
							<td style="padding: 5px; border: 1px solid #ddd;">${file.task_description}</td>
							
							
                            <td style="padding: 5px; border: 1px solid #ddd;">
                            ${file.upload ? `<a href="/upload/${encodeURIComponent(getFilenameFromPath(file.upload))}" target="_blank">View Checklist</a>` : 'No file uploaded'}
                        </td>

                            <td style="padding: 5px; border: 1px solid #ddd;">${file.submitted_modeller}</td>
                            <td style="padding: 5px; border: 1px solid #ddd;">${file.assigned_by}</td>
                            <td style="padding: 5px; border: 1px solid #ddd;">${file.additional_notes}</td>
                            <td style="padding: 5px; border: 1px solid #ddd;">
                                <input type="number" class="score-input" data-submission-id="${file.submission_id}" placeholder="Enter score" ${file.score ? 'disabled' : ''} value="${file.score || ''}" style="width: 100px;">
                            </td>
                            <td style="padding: 5px; border: 1px solid #ddd;">
                                <textarea class="qc-review-textarea" data-submission-id="${file.submission_id}" rows="1" style="width: 100px;" ${file.QC_REVIEW ? 'disabled' : ''}>${file.QC_REVIEW || ''}</textarea>
                            </td>
                            <td style="padding: 5px; border: 1px solid #ddd;">
                                <button type="button" class="btn btn-sm btn-primary submit-btn" data-submission-id="${file.submission_id}" ${file.score || file.QC_REVIEW ? 'disabled' : ''}>Submit</button>
                            </td>
                            <td style="padding: 5px; border: 1px solid #ddd; overflow: visible;">
    <div class="file-upload" style="display: flex; align-items: center;">
        <input type="file" class="upload-input" data-submission-id="${file.submission_id}" accept="image/*" style="display: none;" ${file.upload_file ? 'disabled' : ''}>
        <button type="button" class="btn btn-sm btn-success upload-btn" data-submission-id="${file.submission_id}" ${file.upload_file ? 'disabled' : ''}>Upload file</button>
        <span class="uploaded-file-name" data-submission-id="${file.submission_id}" style="margin-left: 10px; overflow: hidden; text-overflow: ellipsis;">${file.upload_file || ''}</span>
    </div>
</td>

                        `;
                        
                        table.appendChild(row);
                    });

                    

    
                    // Append the table to the container
                    projectsContainer.appendChild(table);
                    projectsContainer.style.display = 'block'; // Ensure container is visible

                    
    
                    // Add event listeners to submit buttons
                    document.querySelectorAll('.submit-btn').forEach(button => {
                        button.addEventListener('click', function() {
                            const submissionId = this.getAttribute('data-submission-id');
                            const scoreInput = document.querySelector(`.score-input[data-submission-id="${submissionId}"]`);
                            const qcReviewTextarea = document.querySelector(`.qc-review-textarea[data-submission-id="${submissionId}"]`);
    
                            const score = scoreInput.value.trim();
                            const qcReview = qcReviewTextarea.value.trim();
    
                            if (!score || isNaN(score)) {
                                alert('Please enter a valid numeric score.');
                                return;
                            }
    
                            submitData(submissionId, score, qcReview);
                        });
                    });
    
                    // Add event listeners to upload buttons
                    document.querySelectorAll('.upload-btn').forEach(button => {
                        button.addEventListener('click', function() {
                            const submissionId = this.getAttribute('data-submission-id');
                            const uploadInput = document.querySelector(`.upload-input[data-submission-id="${submissionId}"]`);
                            uploadInput.click(); // Trigger file input click
                        });
                    });
    
                    // Add event listener for file input change
                    document.querySelectorAll('.upload-input').forEach(uploadInput => {
                        uploadInput.addEventListener('change', function() {
                            const submissionId = this.getAttribute('data-submission-id');
                            const file = this.files[0];
                            const fileNameSpan = document.querySelector(`.uploaded-file-name[data-submission-id="${submissionId}"]`);
                            fileNameSpan.textContent = file.name;
    
                            // Upload file to the server
                            uploadFile(submissionId, file);
                        });
                    });
    
                } else {
                    projectsContainer.innerHTML = '<p>No files found.</p>';
                    projectsContainer.style.display = 'none'; // Hide container if no files found
                }
            })
            .catch(error => {
                console.error('Error fetching QC files:', error);
                const projectsContainer = document.getElementById('QCProjectsContainer');
                projectsContainer.innerHTML = `<p>Error fetching QC files: ${error.message}</p>`;
                projectsContainer.style.display = 'none'; // Hide container on error
            });
    }
    
    // Function to handle uploading a file
    function uploadFile(submissionId, file) {
        const formData = new FormData();
        formData.append('submission_id', submissionId);
        formData.append('file', file);
    
        fetch('/upload_file', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
                // Disable the upload button and input after successful upload
                const uploadButton = document.querySelector(`.upload-btn[data-submission-id="${submissionId}"]`);
                const uploadInput = document.querySelector(`.upload-input[data-submission-id="${submissionId}"]`);
                uploadButton.disabled = true;
                uploadInput.disabled = true;
            } else if (data.error) {
                alert(`Error: ${data.error}`);
            }
        })
        .catch(error => {
            console.error('Error uploading photo:', error);
            alert('An error occurred while uploading the photo. Please try again.');
        });
    }
    
    // Function to submit score and QC review
    function submitData(submissionId, score, qcReview) {
        fetch(`/assign_score_and_qc_review/${submissionId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                score: score,
                qc_review: qcReview  // Ensure this matches your backend field name
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
    
                // Disable score input and QC review textarea after submission
                const scoreInput = document.querySelector(`.score-input[data-submission-id="${submissionId}"]`);
                const qcReviewTextarea = document.querySelector(`.qc-review-textarea[data-submission-id="${submissionId}"]`);
                scoreInput.disabled = true;
                qcReviewTextarea.disabled = true;
            } else if (data.error) {
                alert(`Error: ${data.error}`);
            }
        })
        .catch(error => {
            console.error('Error assigning score and QC review:', error);
            alert('An error occurred while assigning score and QC review. Please try again.');
        });
    }
    

    // Call the function to toggle the QC menu
    toggleQCmenu();
});
//qc dashboard
$(document).ready(function() {
    fetchQcProjects();
    $('#filterInput').on('keyup', filterTable);
    $('#filterDropdown').on('change', filterTable);
});

function fetchQcProjects() {
    $.ajax({
        url: '/get_qcdashboard_projects',
        type: 'GET',
        success: function(response) {
            $('#qcDashboardContent').show();
            displayQcProjects(response.projects);
        },
        error: function(error) {
            console.error('Error fetching modeller project data:', error);
            $('#qcDashboardCardBodyContent').html('<p>Error fetching modeller project data. Please try again later.</p>');
        }
    });
}

function displayQcProjects(projects) {
    let qcDashboardCardBodyContent = $('#qcDashboardCardBodyContent');
    qcDashboardCardBodyContent.empty();  // Clear previous content
    
    console.log('Projects:', projects);  // Debugging line to check the projects array

    projects.forEach(function(project) {
        qcDashboardCardBodyContent.append(`
            <div class="card mb-2 custom-card" data-project-name="${project.ProjectName}">
                <div class="card-body">
                    <p class="project_id project-name">${project.ProjectID} (${project.ProjectName})</p>
                    <p class="manager-name">Assigned By: ${project.AssignedBy}</p>
                    <p class="team-leader">Team Leader: ${project.TeamLeader}</p>
                </div>
            </div>
        `);
    });

    $('.custom-card').on('click', function() {
        const projectName = $(this).data('project-name');
        fetchStatusDetails(projectName);
    });

    // Make the card body content visible after content has been added
    qcDashboardCardBodyContent.show();
}

document.getElementById('fileName').addEventListener('input', function() {
        let input = this.value;
        let nonSpaceLength = input.replace(/\s/g, '').length; // Calculate length excluding spaces
        
        if (nonSpaceLength > 50) {
            let truncated = input.replace(/\s/g, ''); // Remove spaces to truncate properly
            truncated = truncated.substring(0, 50);  // Ensure maximum length of 50 characters (non-space)
            this.value = truncated;  // Update the input value
        }
    });