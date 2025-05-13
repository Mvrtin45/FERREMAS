package com.example.ferremas.controller;

import com.example.ferremas.model.herramientas;
import com.example.ferremas.service.herramientasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/ferremas")


public class ferremascontroller {

    @Autowired
    private herramientasService herramientasService;

    @PostMapping
    public herramientas crearHerramienta(@RequestBody herramientas herramientas){
        return herramientasService.crearHerramienta(herramientas);
    }

}
