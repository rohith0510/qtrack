'use strict';
 
// Set the minimum value of the date input field to the current date
document.addEventListener('DOMContentLoaded', function() {
    var currentDate = new Date().toISOString().split('T')[0];
    document.getElementById('date_submission').min = currentDate;
});
 
// Photo Preview Function
function displayPhotoPreview(input) {
    var photoPreview = document.getElementById('photoPreview');
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            photoPreview.style.display = 'block';
            photoPreview.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
 
// User Filter Function
document.addEventListener('DOMContentLoaded', function() {
    const userFilter = document.getElementById('userFilter');
    const userTableBody = document.getElementById('userTableBody');
 
    if (!userFilter || !userTableBody) {
        console.error('Filter or Table Body element not found.');
        return;
    }
 
    userFilter.addEventListener('input', function() {
        console.log('Filter input event triggered');
        const filterText = userFilter.value.toLowerCase();
        const rows = userTableBody.querySelectorAll('tr');
 
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const cellText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(' ');
            row.style.display = cellText.includes(filterText) ? '' : 'none';
        });
    });
});
 
 
 
 
 
// View User Details Function
$(document).ready(function() {
    $('.view-user').click(function(event) {
        event.preventDefault();
 
        const userDetails = {
            username: $(this).data('username'),
            email: $(this).data('email'),
            phone_number: $(this).data('phone_number'),
            photo_filename: $(this).data('photo'), // Default photo if undefined
            role: $(this).data('role')
        };
 
        console.log('User Details:', userDetails);  // Debugging line to check user details
 
        const $userListImage = $(this).closest('tr').find('img').clone();
 
        const userCardHTML = `
            <div class="col-md-6">
                <div class="card mb-4 user-card">
                    <div class="card-body">
                        <div class="user-avatar-section">
                            <div class="d-flex align-items-center flex-column">
                                ${$userListImage.prop('outerHTML')}
                                <div class="user-info text-center">
                                    <h4 class="mb-2">${userDetails.username}</h4>
                                </div>
                            </div>
                        </div>
                        <p class="mt-4 small text-uppercase text-muted">Details</p>
                        <div class="info-container">
                            <ul class="list-unstyled">
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Email:</span>
                                    <span>${userDetails.email}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Phone Number:</span>
                                    <span>${userDetails.phone_number}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Role:</span>
                                    <span>${userDetails.role}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
 
        const rowHTML = `
            <div class="row">
                ${userCardHTML}
                <div id="metrics-container" class="col-md-6">
                    <!-- Metrics card will be dynamically inserted here -->
                </div>
            </div>
        `;
 
        $('#viewsContent').html(rowHTML).show();
        $('html, body').animate({
            scrollTop: $('#viewsContent').offset().top
        }, 'slow');
 
        // Determine which endpoint to use based on user role
        const endpoint = userDetails.role === 'Teamleader' ? '/teamleader_performance_data' : '/modeller_performance_data';
        const roleKey = userDetails.role === 'Teamleader' ? 'TeamLeader' : 'ModellerFirstName';
 
        console.log('Fetching data from endpoint:', endpoint);  // Debugging line to check endpoint
        console.log('Request body key:', roleKey);  // Debugging line to check role key
 
        // Fetch performance data and render the chart based on username
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ [roleKey]: userDetails.username })  // Dynamically set key based on role
        })
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data);  // Debugging line
            if (data && data.projects && data.scores) {
                const ctx = document.createElement('canvas');
                ctx.id = 'performanceChart';
                $('#viewsContent').append(ctx);
 
                // Apply CSS styling to control size
                $('#performanceChart').css({
                    width: '300px',  // Set width using CSS
                    height: '100px'  // Set height using CSS
                });
 
                // Create an array of colors based on the scores
                const backgroundColors = data.scores.map(score => score < 90 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)');
 
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: data.projects,
                       
                        datasets: [{
                            label: 'Project Scores',
                            data: data.scores,
                            backgroundColor: backgroundColors, // Apply the conditional colors
                            borderColor: 'rgba(75, 192, 192, 1)',
                            barThickness: 50,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                       
                    }
                });
 
                // Additional performance metrics
  let metricsHTML = '';
        if (userDetails.role === 'Teamleader') {
            metricsHTML = `
                <div class="card mb-4 metrics-card">
                    <div class="card-body">
                        <h5>Teamleader Performance Metrics</h5>
                        <ul class="list-unstyled">
                            <li class="mb-2">
                                <span class="fw-medium me-1">Max Score:</span>
                                <span>${data.max_score || 'N/A'}
                                    (Project: ${data.max_score_project || 'N/A'},
                                    Modeller: ${data.max_score_modeller || 'N/A'})
                                </span>
                            </li>
                            <li class="mb-2">
                                <span class="fw-medium me-1">Min Score:</span>
                                <span>${data.min_score || 'N/A'}
                                    (Project: ${data.min_score_project || 'N/A'},
                                     Modeller: ${data.min_score_modeller || 'N/A'})
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            `;
        } else if (userDetails.role === 'Modeller') {
            metricsHTML = `
                <div class="card mb-4 metrics-card">
                    <div class="card-body">
                        <h5>Modeller Performance Metrics</h5>
                        <ul class="list-unstyled">
                            <li class="mb-2">
                                <span class="fw-medium me-1">Max Score:</span>
                                <span>${data.max_score || 'N/A'}
                                    (Project: ${data.max_score_project || 'N/A'})
                                </span>
                            </li>
                            <li class="mb-2">
                                <span class="fw-medium me-1">Min Score:</span>
                                <span>${data.min_score || 'N/A'}
                                    (Project: ${data.min_score_project || 'N/A'})
                                </span>
                            </li>
                         
                        </ul>
                    </div>
                </div>
            `;
        }
 
 
$('#metrics-container').html(metricsHTML);
 
 
$('#metrics-container').html(metricsHTML);
 
            } else {
                console.error('Invalid data format received:', data);
                $('#metrics-container').html('<p>Error fetching performance data.</p>');
            }
        })
        .catch(error => {
            console.error('Error fetching performance data:', error);
            $('#metrics-container').html('<p>Error fetching performance data.</p>');
        });
    });
});
 
 
 
 
 
 
 
 
 
// Account Settings AJAX
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("formAccountSettings");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        fetch('/accountsettings', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
            } else if (data.error) {
                alert(data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    });
 
    const resetBtn = document.querySelector("button[type='reset']");
    resetBtn.addEventListener("click", function() {
        console.log("Form reset!");
        alert("Form reset!");
    });
});
 
// Toggle Menu Visibility
document.addEventListener('DOMContentLoaded', function () {
    function toggleMenu() {
        const menuLinks = document.querySelectorAll('.menu-link');
        const contentSections = {
            userListLink: document.getElementById('userDetailsContent'),
            viewsLink: document.getElementById('viewsContent'),
            accountLink: document.getElementById('AccountContent'),
            accesslink: document.getElementById('roleAccessContent')
			
 
        };
 
        menuLinks.forEach(link => {
            link.addEventListener('click', function () {
                Object.values(contentSections).forEach(section => section.style.display = 'none');
                contentSections[link.id].style.display = 'block';
                setActiveMenuLink(link);
            });
        });
    }
 
    function setActiveMenuLink(activeLink) {
        document.querySelectorAll('.menu-link').forEach(link => link.classList.remove('active-menu-link'));
        activeLink.classList.add('active-menu-link');
    }
 
    toggleMenu();
 
    document.querySelectorAll('.view-user').forEach(button => {
        button.addEventListener('click', function () {
            document.getElementById('userDetailsContent').style.display = 'none';
            document.getElementById('viewsContent').style.display = 'block';
            setActiveMenuLink(document.getElementById('viewsLink'));
        });
    });
});
 
//
 
document.addEventListener('DOMContentLoaded', function () {
    function populateUserRoles() {
        fetch('/api/user_roles')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#user-role-table tbody');
                tableBody.innerHTML = ''; // Clear existing rows
 
                data.forEach(user => {
                    const row = document.createElement('tr');
                    const role_ids = Array.isArray(user.role_ids) ? user.role_ids : [];
                   
                    row.innerHTML = `
                        <td>${user.first_name}</td>
                        <td><input type="checkbox" name="role_${user.user_id}[]" value="1" ${role_ids.includes(1) ? 'checked' : ''}></td>
                        <td><input type="checkbox" name="role_${user.user_id}[]" value="2" ${role_ids.includes(2) ? 'checked' : ''}></td>
                        <td><input type="checkbox" name="role_${user.user_id}[]" value="3" ${role_ids.includes(3) ? 'checked' : ''}></td>
                        <td><input type="checkbox" name="role_${user.user_id}[]" value="4" ${role_ids.includes(4) ? 'checked' : ''}></td>
                        <td><input type="checkbox" name="role_${user.user_id}[]" value="5" ${role_ids.includes(5) ? 'checked' : ''}></td>
                    `;
                   
                    tableBody.appendChild(row);
 
                    // Add event listener to checkboxes
                    const checkboxes = row.querySelectorAll('input[type="checkbox"]');
                    checkboxes.forEach(checkbox => {
                        checkbox.addEventListener('change', function () {
                            updateUserRoles(user.user_id);
                        });
                    });
                });
            })
            .catch(error => console.error('Error fetching user roles:', error));
    }
 
    function updateUserRoles(user_id) {
        const checkboxes = document.querySelectorAll(`input[name="role_${user_id}[]"]`);
        const role_ids = Array.from(checkboxes)
                              .filter(checkbox => checkbox.checked)
                              .map(checkbox => parseInt(checkbox.value));
 
        // Send the updated roles to the backend
        fetch('/api/update_user_roles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user_id,
                role_ids: role_ids,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log('User roles updated successfully');
            } else {
                console.error('Error updating user roles');
            }
        })
        .catch(error => console.error('Error:', error));
    }
 
    // Handle the Save Changes button click
    document.querySelector('#role-access-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Define an array to keep track of update promises
    const updatePromises = [];

    // Loop through each row and update user roles
    document.querySelectorAll('#user-role-table tbody tr').forEach(row => {
        const user_id = row.querySelector('input[type="checkbox"]').name.split('_')[1];
        // Add each update promise to the array
        updatePromises.push(updateUserRoles(user_id));
    });

    // Wait for all updates to complete
    Promise.all(updatePromises)
        .then(() => {
            // Actions to perform after all updates are complete
            alert('User roles updated successfully!');
            // Optionally, you can redirect the user or update the UI here
            // window.location.href = 'somepage.html'; // Example redirect
        })
        .catch(error => {
            // Handle any errors that occurred during updates
            console.error('Error updating user roles:', error);
            alert('An error occurred while updating user roles. Please try again.');
        });
});



 
    populateUserRoles();
});

// JavaScript for Image Preview and Remove Functionality -->

function displayPhotoPreview(input) {
        const preview = document.getElementById('photoPreviewUpload');
        const removeIcon = document.getElementById('removePhotoIcon');

        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
                removeIcon.style.display = 'inline'; // Show X mark
            };

            reader.readAsDataURL(input.files[0]);
        } else {
            preview.style.display = 'none';
            removeIcon.style.display = 'none'; // Hide X mark if no file
        }
    }

    function removePhoto() {
        const photoInput = document.getElementById('photo');
        const preview = document.getElementById('photoPreviewUpload');
        const removeIcon = document.getElementById('removePhotoIcon');

        // Reset the file input
        photoInput.value = "";

        // Hide the image preview and X mark
        preview.src = "#";
        preview.style.display = 'none';
        removeIcon.style.display = 'none';
    }

    // Listen for form reset event to reset custom elements like image preview
    document.getElementById('formAccountSettings').addEventListener('reset', function () {
        const preview = document.getElementById('photoPreviewUpload');
        const removeIcon = document.getElementById('removePhotoIcon');
        
        // Hide the image preview and X mark on reset
        preview.src = "#";
        preview.style.display = 'none';
        removeIcon.style.display = 'none';
    });
	
	
//email validation
document.getElementById('email').addEventListener('input', function() {
    const email = this.value;
    const emailError = document.getElementById('emailError');
    const regex = /^[a-zA-Z0-9._%+-]+@vulcansbuild\.com$/;
    if (!regex.test(email)) {
        emailError.style.display = 'block';
    } else {
        emailError.style.display = 'none';
    }
});	

document.querySelectorAll('.delete-user').forEach(button => {
    button.addEventListener('click', function() {
        const userId = this.getAttribute('data-user_id');

        if (confirm('Are you sure you want to delete this user?')) {
            fetch(`/delete-user/${userId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    alert('User successfully deleted.'); // Show success alert
                    location.reload(); // Reload the table or the page to update the user list
                } else {
                    alert('Failed to delete user.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while trying to delete the user.');
            });
        }
    });
});
