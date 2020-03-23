package com.example.demo.entity;

import javax.persistence.*;

@Entity
@Table(name = "Cases")
public class Case {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    public long id;
    public String name;

    public Case() {
    }

    public Case(String name) {
        this.name = name;
    }

    public Case(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}




