package com.example.ferremas.service;

import com.example.ferremas.model.herramientas;
import com.example.ferremas.repository.herramientasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class herramientasService {

    @Autowired
    private herramientasRepository herramientasRepository;

    public herramientas crearHerramienta(herramientas herramientas) {
        return herramientasRepository.save(herramientas);
    }
}
