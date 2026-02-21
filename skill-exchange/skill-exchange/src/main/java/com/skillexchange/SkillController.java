package com.skillexchange;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/skills")
@CrossOrigin(origins = "http://localhost:3000")
public class SkillController {

    private final SkillRepository skillRepository;

    public SkillController(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    // Add a new skill
    @PostMapping
    public Skill addSkill(@RequestBody Skill skill) {
        return skillRepository.save(skill);
    }

    // Get all skills OR search
    @GetMapping
    public List<Skill> getSkills(
            @RequestParam(defaultValue = "") String skill,
            @RequestParam(defaultValue = "") String location
    ) {
        return skillRepository
                .findBySkillContainingIgnoreCaseAndLocationContainingIgnoreCase(
                        skill, location
                );
    }
}
