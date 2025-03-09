//Task 2: Adding Support Tickets Dynamically
function createSupportTicket(customer, issue, priority) {
    // Get the container where tickets will be added
    const ticketContainer = document.getElementById('ticketContainer');

    // Create a new ticket card
    const ticketCard = document.createElement('div');
    ticketCard.className = 'ticket-card';

    // Add the customer's name as a header
    const custName = document.createElement('h2');
    custName.className = 'ticket-header';
    custName.textContent = customer;
    ticketCard.appendChild(custName);

    // Add a paragraph for the issue description
    const issueDesc = document.createElement('p');
    issueDesc.className = 'issue-description';
    issueDesc.textContent = issue;
    ticketCard.appendChild(issueDesc);

    // Add a label for the priority level
    const priorityLabel = document.createElement('p');
    priorityLabel.className = 'priority-label';
    priorityLabel.textContent = `Priority: ${priority}`;
    ticketCard.appendChild(priorityLabel);

    // Apply the appropriate style based on priority
    if (priority.toLowerCase() === 'high') {
        ticketCard.classList.add('high-priority');
    } else {
        ticketCard.classList.add('other-priority');
    }

    // Create the Resolve button and add a click event to remove the ticket
    const resolveBtn = document.createElement('button');
    resolveBtn.className = 'resolve-btn';
    resolveBtn.textContent = 'Resolve';
    resolveBtn.addEventListener('click', () => {
        ticketContainer.removeChild(ticketCard);
    });
    ticketCard.appendChild(resolveBtn);

    // Append the ticket card to the container
    ticketContainer.appendChild(ticketCard);
}

//Task 3: Converting NodeLists to Arrays for Bulk Updates
function highlightHighPriorityTickets() {
    // Select all support ticket cards on the page and update each ticket's styling
    document.querySelectorAll('.ticket-card').forEach(styleSingleCard);
}

// Applies different styles based on the ticket's priority level
function styleSingleCard(ticket) {
    // Retrieve the priority text from the ticket
    const priorityLabel = ticket.querySelector('.priority-label');
    const priorityValue = priorityLabel.textContent.replace('Priority: ', '').trim().toLowerCase();

    // Update styling based on the priority value
    if (priorityValue === 'high') {
        ticket.classList.remove('other-priority');
        ticket.classList.add('high-priority');
    } else {
        ticket.classList.remove('high-priority');
        ticket.classList.add('other-priority');
    }
}

    //Task 4 - Support Ticket Resolution with Event Bubbling
// Assume ticketContainer is defined globally or retrieved as needed
const ticketContainer = document.getElementById('ticketContainer');

// Attach event listener to the container to log a message when any ticket is clicked
ticketContainer.addEventListener('click', (event) => {
    // Use event delegation: check if a ticket card was clicked
    const ticketCardClicked = event.target.closest('.ticket-card');
    if (ticketCardClicked) {
        const custName = ticketCardClicked.querySelector('.ticket-header');
        console.log('Clicked On Support Ticket:', custName ? custName.textContent : 'Unknown');
    }
});

resolveBtn.addEventListener('click', (event) => {
    // Prevent the event from bubbling up to the ticketContainer
    event.stopPropagation();
    // Remove the ticket using removeChild from the container
    ticketContainer.removeChild(ticketCard);
});

//Task 5: Additional Challenge – Inline Editing of Support Tickets
ticketCard.addEventListener('dblclick', () => {
    // Prevent multiple edit inputs from appearing
    if (ticketCard.querySelector('.save-btn')) return;
    
    // Store original values from the static elements
    const originalName = custName.textContent;
    const originalIssue = issueDesc.textContent;
    const originalPriority = priorityLabel.textContent.replace('Priority: ', '');
    
    // Clear the current ticket content for editing
    ticketCard.innerHTML = '';
    
    // Create input fields pre-populated with existing values
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = originalName;
    
    const issueInput = document.createElement('input');
    issueInput.type = 'text';
    issueInput.value = originalIssue;
    
    const priorityInput = document.createElement('input');
    priorityInput.type = 'text';
    priorityInput.value = originalPriority;
    
    // Create a save button that updates the ticket with new values
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-btn';
    saveBtn.textContent = 'Save';
    
    // Append input fields and buttons to the ticket card, using <br> for spacing
    ticketCard.append(
        nameInput, document.createElement('br'),
        issueInput, document.createElement('br'),
        priorityInput, document.createElement('br'),
        saveBtn, document.createElement('br'),
        resolveBtn
    );
    
    // Update the ticket with the edited details when the save button is clicked
    saveBtn.addEventListener('click', () => {
        // Update the static elements with new values
        custName.textContent = nameInput.value;
        issueDesc.textContent = issueInput.value;
        priorityLabel.textContent = `Priority: ${priorityInput.value}`;
        
        // Restore the ticket layout after editing
        ticketCard.innerHTML = '';
        ticketCard.append(custName, issueDesc, priorityLabel, resolveBtn);
        
        // Reapply styles in case the priority was changed
        styleSingleCard(ticketCard);
    });
});
    
// Finally, add the completed ticket to the ticket container and apply initial styling
divTicketContainer.appendChild(ticketCard);
styleSingleCard(ticketCard);
return ticketCard;