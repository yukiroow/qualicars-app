package com.qualinterns.dealership_app_api.repo;

import com.qualinterns.dealership_app_api.dto.AgentLoginRequest;
import com.qualinterns.dealership_app_api.model.Agent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Repository
public class AgentDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void init(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public Agent login(AgentLoginRequest agentLoginRequest) {
        String sql = "SELECT * FROM agent WHERE username ='" + agentLoginRequest.getUsername() + "'AND password ='" + agentLoginRequest.getPassword() + "'";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Agent.class));
    }

}