package com.example.ferremas.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name="Herramientas")
@Data
@NoArgsConstructor
@AllArgsConstructor


public class herramientas {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column (unique = true, length = 13, nullable = false)
    private String nro_serie;

    @Column (nullable = false)
    private String tipo;

    @Column (nullable = false)
    private String color;

    @Column (nullable = false)
    private String marca;

}
