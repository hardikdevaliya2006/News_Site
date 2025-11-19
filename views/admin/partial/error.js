<% if (error.length > 0) { %>
    <div class="alert alter-danger">
        <ul>
            <% error.forEach(err => { %>
                <li><%= err.msg %></li>
            <%}) %>
        </ul>
    </div>
<% } %>