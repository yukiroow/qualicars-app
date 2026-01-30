package com.qualinterns.dealership_app_api.repo;

import com.qualinterns.dealership_app_api.dto.AgentLoginRequest;
import com.qualinterns.dealership_app_api.model.Agent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Statement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

@Repository
public class UnsafeQuery {
    @Autowired
    private DataSource dataSource;

    public Optional<Agent> login(AgentLoginRequest loginRequest) throws SQLException {
        String sql = "SELECT * FROM Agent WHERE username = '" + loginRequest.getUsername() + "' AND password = '" + loginRequest.getPassword() + "'";
        try (Connection connection = dataSource.getConnection();
             Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            if (rs.next()) {
                return Optional.of(new Agent(rs.getShort("agent_id"), rs.getString("first_name"),
                        rs.getString("last_name"), rs.getString("username"),
                        rs.getString("password"), rs.getString("address"),
                        rs.getString("contact"), rs.getDate("date_joined").toLocalDate()));
            }
            return Optional.empty();
        }
    }
}