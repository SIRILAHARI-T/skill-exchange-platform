package com.skillexchange;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

    List<Skill> findBySkillContainingIgnoreCaseAndLocationContainingIgnoreCase(
            String skill,
            String location
    );
}

